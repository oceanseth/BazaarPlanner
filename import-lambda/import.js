'use strict';
const https = require('https');
const cheerio = require('cheerio');
const axios = require('axios');

function extractObjectWithBDay(html) {
  // 1. Load HTML with cheerio
  const $ = cheerio.load(html);

  // 2. Get the script tag content
  const scriptContent = $('#ng-state').html();

  // If the script isn't found or is empty, return null
  if (!scriptContent) {
    console.warn('No <script id="ng-state"> found or empty.');
    return {error: "No <script id=\"ng-state\"> found or empty."};
  }

  // 3. Parse the JSON
  let parsedData;
  try {
    parsedData = JSON.parse(scriptContent);
  } catch (err) {
    console.error('Error parsing JSON from <script id="ng-state">:', err);
    return {error: "Error parsing JSON from <script id=\"ng-state\">: "+err};
  }

  // 4. Iterate top-level keys
  // parsedData might look like { "entryOne": {...}, "entryTwo": {...} }
  for (const [key, value] of Object.entries(parsedData)) {
    // 5. Check if this object has b.day
    // i.e. value.b && value.b.day
    if (value && value.b && value.b.day) {
      // 6. Return this object
      delete value.b.encounters;
      return value.b;
    }
  }

  // If none of the objects had b.day, return null
  return {error: "No b.day found"};
}

function respond(data, statusCode = 200) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,OPTIONS'
    },
    body: JSON.stringify(data),
  };
}
async function fetchHtml(url) {
  const response = await axios.get(url, {
    responseType: 'stream',
    timeout: 25000  // 25 second timeout
  });

  return new Promise((resolve, reject) => {
    let data = '';
    let foundStart = false;
    let scriptContent = '';
    
    response.data.on('data', (chunk) => {
      const chunkStr = chunk.toString();
      data += chunkStr;
      
      // Look for script start if we haven't found it yet
      if (!foundStart) {
        const startIdx = data.indexOf('<script id="ng-state">');
        if (startIdx !== -1) {
          foundStart = true;
          scriptContent = data.slice(startIdx);
        }
      }
      
      // If we've found the start, look for the end
      if (foundStart) {
        const endIdx = data.indexOf('</script>');
        if (endIdx !== -1) {
          scriptContent = data.slice(0, endIdx + 9); // include the closing tag
          response.data.destroy(); // terminate the connection
          resolve(scriptContent);
        }
      }
    });

    response.data.on('error', reject);
    response.data.on('end', () => {
      // If we get here without finding what we want, return what we have
      resolve(data);
    });
  });
}

module.exports.handler = async (event) => {
  try {
    const qsParams = event.queryStringParameters || {};
    const runId = qsParams.runId;
  
    if (!runId) {
      return respond({ error: 'No runId provided.' }, 400);
    }
  
/* Previously, I had to get the run object by scraping the page, but sebastientromp gave me a direct endpoint to get the run object.
   Leaving this commented out for now, in case his endpoint goes down, we can revert to scraping the page.
//    const html = await fetchHtml("https://bazaartracker.gg/runs/"+runId);
//  return respond(extractObjectWithBDay(html));
//  return respond(extractObjectWithBDay(html));
*/
const response = await axios.get("https://ykvg5nr5u7hpf7raike7tx44ja0yajkm.lambda-url.us-west-2.on.aws/"+runId, {
  responseType: 'text'
});
return {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  },
  body: response.data
};





  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify( error )
    };
  }
};
