const AWS = require('aws-sdk');
const admin = require('firebase-admin');

class FirebaseInitializer {
  constructor() {
    this.ssm = new AWS.SSM();
    this.firebaseApp = null;
  }

  async initialize() {
    if (this.firebaseApp) return this.firebaseApp;

    const params = {
      Name: '/bazaarplanner/prod/firebase_service_account',
      WithDecryption: true
    };

    const result = await this.ssm.getParameter(params).promise();
    const serviceAccount = JSON.parse(result.Parameter.Value);

    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://bazaarplanner-default-rtdb.firebaseio.com'
    });

    return this.firebaseApp;
  }
}

module.exports = new FirebaseInitializer();