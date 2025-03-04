/*
This lambda function is used to advance the current daily puzzle displayed on the site by one each day.
It is scheduled to run every day at midnight UTC.
*/

const AWS = require('aws-sdk');
const admin = require('firebase-admin');

const ssm = new AWS.SSM();

let firebaseApp;

const initializeFirebase = async () => {
  if (firebaseApp) return;

  const params = {
    Name: '/bazaarplanner/prod/firebase_service_account',
    WithDecryption: true
  };

  const result = await ssm.getParameter(params).promise();
  const serviceAccount = JSON.parse(result.Parameter.Value);

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
};

exports.handler = async (event) => {
  try {
    await initializeFirebase();
    
    const db = admin.database();
    const currentRef = db.ref('puzzles/current');
    
    // Get the current puzzle ID
    const snapshot = await currentRef.once('value');
    const currentPuzzleId = snapshot.val();
    
    // Increment the puzzle ID
    const newPuzzleId = currentPuzzleId + 1;
    
    // Update the current puzzle ID
    await currentRef.set(newPuzzleId);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully advanced puzzle from ${currentPuzzleId} to ${newPuzzleId}`,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error advancing puzzle',
        error: error.message,
      }),
    };
  }
};
