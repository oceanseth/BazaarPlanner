// Import the Lambda handler
const { handler } = require('./import');

// Simulate a Lambda event
const testEvent = {
  queryStringParameters: {
    runId: '89e59109-744e-4cf2-96c0-b16a745a3162'
  }
};

// Run the test
async function runTest() {
  try {
    const result = await handler(testEvent);
    console.log('Status Code:', result.statusCode);
    console.log('Response:', JSON.parse(result.body));
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Execute the test
runTest(); 