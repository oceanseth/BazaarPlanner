import admin from 'firebase-admin';
import { getApp } from 'firebase-admin/app';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const serviceAccount = require('/bazaarplanner_firebase_servicekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bazaarplanner-default-rtdb.firebaseio.com",
  projectId: 'bazaarplanner'
});

const db = admin.database();

async function fixUsernames() {
  try {
    // Get all username entries
    const snapshot = await db.ref('usernames').once('value');
    const usernames = snapshot.val();
    
    // Keep track of processed usernames
    const updates = {};
    const duplicates = new Set();

    // First pass: identify duplicates
    Object.keys(usernames || {}).forEach(username => {
      const lowercaseUsername = username.toLowerCase();
      if (username !== lowercaseUsername) {
        if (duplicates.has(lowercaseUsername)) {
          console.log(`Duplicate found: ${username} -> ${lowercaseUsername}`);
        }
        duplicates.add(lowercaseUsername);
      }
    });

    // Second pass: prepare updates
    Object.entries(usernames || {}).forEach(([username, data]) => {
      const lowercaseUsername = username.toLowerCase();
      if (username !== lowercaseUsername) {
        updates[`usernames/${username}`] = null; // Delete old entry
        updates[`usernames/${lowercaseUsername}`] = data; // Create new entry
        console.log(`Converting: ${username} -> ${lowercaseUsername}`);
      }
    });

    // Execute all updates in a single transaction
    if (Object.keys(updates).length > 0) {
      await db.ref().update(updates);
      console.log('Username conversion completed successfully');
    } else {
      console.log('No usernames needed conversion');
    }
    
  } catch (error) {
    console.error('Error fixing usernames:', error);
  } finally {
    // Terminate the admin app
    await getApp().delete();
  }
}

// Run the script
fixUsernames();
