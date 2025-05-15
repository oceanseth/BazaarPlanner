const firebaseInitializer = require('../utils/firebaseInit');

exports.handler = async (event) => {
  try {
    await firebaseInitializer.initialize();
    
    const db = firebaseInitializer.firebaseApp.database();
    const batchSize = 100;
    let lastKey = null;
    let topDonors = [];
    
    while (true) {
      // Get just the keys using shallow query
      let query = db.ref('users')
        .orderByKey()
        .limitToFirst(batchSize);
      
      if (lastKey) {
        query = query.startAfter(lastKey);
      }
      
      const snapshot = await query.once('value', snapshot => snapshot, { shallow: true });
      
      // If no more users, break the loop
      if (!snapshot.exists()) {
        break;
      }
      
      // Process each user key from the snapshot
      const userKeys = snapshot.val();
      if (!userKeys) {
        break;
      }
      
      // For each key, fetch only displayName and donationAmount
      for (const userId of Object.keys(userKeys)) {
        const userDataSnapshot = await db.ref(`users/${userId}`).child('displayName').once('value');
        const donationSnapshot = await db.ref(`users/${userId}`).child('donationAmount').once('value');
        
        const displayName = userDataSnapshot.val();
        const donationAmount = parseFloat(donationSnapshot.val());
        
        if (donationAmount) {
          // Only process if the donation amount is larger than the smallest in our list
          // or if we haven't reached 10 donors yet
          if (topDonors.length < 10 || donationAmount > topDonors[topDonors.length - 1].amount) {
            const newDonor = {
              userId,
              name: displayName || 'Anonymous',
              amount: donationAmount
            };
            
            // Find the correct position to insert the new donor
            let insertIndex = topDonors.findIndex(donor => donor.amount < donationAmount);
            if (insertIndex === -1) {
              // If no smaller amount found, append to the end
              insertIndex = topDonors.length;
            }
            
            // Insert the new donor at the correct position
            topDonors.splice(insertIndex, 0, newDonor);
            
            // Keep only top 10
            if (topDonors.length > 10) {
              topDonors.pop();
            }
          }
        }
      }
      
      // Get the last key for next iteration
      lastKey = Object.keys(userKeys).pop();
    }
    // Sort one final time to ensure correct order
    topDonors.sort((a, b) => b.amount - a.amount);
    // Write final top 10 to database
    await db.ref('topDonors').set(topDonors);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Top donors updated successfully' })
    };
    
  } catch (error) {
    console.error('Error updating top donors:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update top donors' })
    };
  }
};
