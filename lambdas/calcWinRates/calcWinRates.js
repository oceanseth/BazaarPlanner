/*
This lambda function is used to calculate all the win rates for runs that have not yet been calculated.
It is scheduled to run every day at midnight UTC.
*/
import { Board } from './js/Board.js';

const firebaseInitializer = require('../utils/firebaseInit');

exports.handler = async (event) => {
  try {
    await firebaseInitializer.initialize();
    
    const db = firebaseInitializer.firebaseApp.database();
    const users = await db.ref('users').shallow().once('value');
   

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Ran calcWinRates for ${users.length} users. testing tags: ${Board.uniqueTypeTags.join(',')}`,
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
