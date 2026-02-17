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
const userId = 'vU6yIcjhYPfcZm63uRX7wS3xwKH3';

async function testRunsLoad() {
  try {
    console.log(`Loading runs for user: ${userId}`);
    
    // Get all run IDs (without loading full data)
    const runsSnapshot = await db.ref(`/users/${userId}/runs`).once('value');
    const runsData = runsSnapshot.val();
    
    if (!runsData) {
      console.log('No runs found for this user.');
      return;
    }
    
    const runIds = Object.keys(runsData);
    console.log(`Found ${runIds.length} runs`);
    
    // Fetch only the 't' (timestamp) field for each run
    const runPromises = runIds.map(async (runId) => {
      const timestampSnapshot = await db.ref(`/users/${userId}/runs/${runId}/t`).once('value');
      const timestamp = timestampSnapshot.val();
      return {
        id: runId,
        t: timestamp ? parseInt(timestamp) : null
      };
    });
    
    const runsWithTimestamps = await Promise.all(runPromises);
    
    // Filter out runs without timestamps and sort by timestamp (newest first)
    const validRuns = runsWithTimestamps.filter(run => run.t !== null);
    validRuns.sort((a, b) => b.t - a.t);
    
    console.log(`\nFound ${validRuns.length} runs with valid timestamps:`);
    console.log('='.repeat(80));
    
    validRuns.forEach((run, index) => {
      const date = new Date(run.t);
      console.log(`${(index + 1).toString().padStart(4)}. Run ID: ${run.id.padEnd(30)} Timestamp: ${run.t.toString().padStart(13)} Date: ${date.toLocaleString()}`);
    });
    
    console.log('='.repeat(80));
    console.log(`\nTotal runs: ${validRuns.length}`);
    console.log(`Oldest run: ${new Date(validRuns[validRuns.length - 1]?.t || 0).toLocaleString()}`);
    console.log(`Newest run: ${new Date(validRuns[0]?.t || 0).toLocaleString()}`);
    
    // Check for runs without timestamps
    const runsWithoutTimestamps = runsWithTimestamps.filter(run => run.t === null);
    if (runsWithoutTimestamps.length > 0) {
      console.log(`\n⚠️  Warning: ${runsWithoutTimestamps.length} runs without timestamps:`);
      runsWithoutTimestamps.forEach(run => {
        console.log(`   - ${run.id}`);
      });
    }
    
  } catch (error) {
    console.error('Error loading runs:', error);
  } finally {
    // Terminate the admin app
    await getApp().delete();
  }
}

// Run the script
testRunsLoad();
