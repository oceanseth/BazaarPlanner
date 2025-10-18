/*
This lambda function is used to advance the current daily puzzle displayed on the site by one each day.
It is scheduled to run every day at midnight UTC.
*/

const firebaseInitializer = require('../utils/firebaseInit');

exports.handler = async (event) => {
  try {
    await firebaseInitializer.initialize();
    
    const db = firebaseInitializer.firebaseApp.database();
    const currentRef = db.ref('puzzles/current');
    
    // Get the current puzzle ID
    const snapshot = await currentRef.once('value');
    const currentPuzzleId = snapshot.val();
    
    // Increment the puzzle ID
    const newPuzzleId = currentPuzzleId + 1;
    
    // Check if the new puzzle exists
    const newPuzzleRef = db.ref(`puzzles/${newPuzzleId}`);
    const newPuzzleSnapshot = await newPuzzleRef.once('value');
    
    if (!newPuzzleSnapshot.exists()) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Cannot advance: puzzle ${newPuzzleId} does not exist`,
        }),
      };
    }
    
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
