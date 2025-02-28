const axios = require('axios');
const firebaseAdmin = require('firebase-admin');
const AWS = require('aws-sdk');

// We'll cache our secrets and Admin initialization across invocations
let isFirebaseInitialized = false;
let serviceAccount = null;
let TWITCH_CLIENT_SECRET = null;

const ssm = new AWS.SSM();
async function getSSMParameter(name) {
  const result = await ssm.getParameter({
    Name: name,
    WithDecryption: true,
  }).promise();

  return result.Parameter.Value; // your decrypted secret
}



// (B) Twitch Config (store these as ENV variables or in Secrets Manager)
const TWITCH_CLIENT_ID = "p8hu53p18vur8yj9jakv2bg0kkacrf";
const TWITCH_REDIRECT_URI = "https://www.bazaarplanner.com/twitchAuth"; 

/**
 * AWS Lambda Handler
 */
exports.handler = async (event) => {
  try {
    // Add debug logging
    console.log('Starting lambda execution');
    
    if(!serviceAccount || !twitchClientSecret) {
      console.log('Fetching SSM parameters...');
      try {
        serviceAccount = JSON.parse(await getSSMParameter("/bazaarplanner/prod/firebase_service_account"));
        console.log('Got firebase service account');
        TWITCH_CLIENT_SECRET = await getSSMParameter("/bazaarplanner/prod/twitch_client_secret");
        console.log('Got twitch client secret');
      } catch (ssmError) {
        console.error('SSM Error:', ssmError);
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            error: 'Failed to load required secrets',
            details: ssmError.message,
            code: ssmError.code  // This will help identify if it's a permissions issue
          })
        };
      }
    }

    if(!isFirebaseInitialized) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: "https://bazaarplanner-default-rtdb.firebaseio.com"
      });
      isFirebaseInitialized = true;
    }

    // 1. Parse the incoming request
    //    If using API Gateway with 'Lambda Proxy Integration', the query params might be:
    //    event.queryStringParameters.code
    const code = event.queryStringParameters?.code;
    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing code parameter in query string' }),
      };
    }

    // 2. Exchange the code for an access token from Twitch
    //    Twitch docs: https://dev.twitch.tv/docs/authentication/getting-tokens-oauth
    const tokenResponse = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: TWITCH_REDIRECT_URI,
      },
    });

    const { access_token, refresh_token } = tokenResponse.data;
    if (!access_token) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Could not retrieve Twitch access token' }),
      };
    }

    // 3. Use the Twitch access token to get the user's profile info
    //    e.g., https://dev.twitch.tv/docs/api/reference/#get-users
    const userResponse = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        'Client-Id': TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${access_token}`,
      },
    });

    const userData = userResponse.data && userResponse.data.data && userResponse.data.data[0];
    if (!userData) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Could not retrieve Twitch user data' }),
      };
    } 


    const firebaseUid = `twitch:${userData.id}`;
    const firebaseCustomToken = await firebaseAdmin.auth().createCustomToken(firebaseUid, {
      twitchLogin: userData.login,
      twitchDisplayName: userData.display_name,
      twitchEmail: userData.email || null,
    });

    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
          <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
        </head>
        <body>
          <p>Completing login, please wait...</p>
          <script>
            const firebaseConfig = {
              apiKey: "AIzaSyCrDTf9_S8PURED8DZBDbbEsJuMA1poduw",
              authDomain: "www.bazaarplanner.com",
              databaseURL: "https://bazaarplanner-default-rtdb.firebaseio.com",
              projectId: "bazaarplanner",
              storageBucket: "bazaarplanner.firebasestorage.app",
              messagingSenderId: "785099543393",
              appId: "1:785099543393:web:64f446c9ff8b0a34086b20",
              measurementId: "G-PPXK7672LC"
            };

            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);

            // Sign in with the custom token
            firebase.auth().signInWithCustomToken("${firebaseCustomToken}")
              .then(() => {
                // Redirect back to main page after successful sign in
                window.location.href = "https://www.bazaarplanner.com";
              })
              .catch((error) => {
                console.error('Error signing in:', error);
                window.location.href = "https://www.bazaarplanner.com?error=" + 
                  encodeURIComponent("Authentication failed: " + error.message);
              });
          </script>
        </body>
      </html>
    `;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: htmlResponse,
    };

  } catch (error) {
    console.error('OAuth Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
