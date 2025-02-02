const { handler } = require('./import');

const tests = [
  {
    name: 'Valid runId',
    event: {
      queryStringParameters: {
        runId: '89e59109-744e-4cf2-96c0-b16a745a3162'
      }
    }
  },
  {
    name: 'Missing runId',
    event: {
      queryStringParameters: {}
    }
  }
];

async function runTests() {
  for (const test of tests) {
    console.log('\n=== Running test:', test.name, '===');
    try {
      const result = await handler(test.event);
      console.log('Status Code:', result.statusCode);
      console.log('Response:', JSON.parse(result.body));
    } catch (error) {
      console.error('Test failed:', error);
    }
  }
}

runTests();