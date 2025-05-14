const { handler } = require('./updateTopDonors');

// Simulate the Lambda event and context
const event = {};
const context = {};

// Run the handler
handler(event, context)
  .then(response => {
    console.log('Success:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });