## Testing Import Lambda Locally

1. Install the Serverless Framework globally:
    npm install -g serverless

2. Navigate to the import-lambda directory:
    cd import-lambda

3. Install lambda dependencies:
    npm install

4. Test the lambda locally:
    node test.js

### Deploying to AWS

1. Configure AWS credentials:
    aws configure
    You'll need to enter your AWS Access Key ID and Secret Access Key.

2. Deploy the lambda:
    cd import-lambda
    serverless deploy

After deployment, Serverless will output the endpoint URL for the API.
This is used in the cloud formation configuration for the import lambda function.
Now the /import?runId=xxx endpoint can be used to trigger the lambda.