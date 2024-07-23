const { DynamoDBClient, QueryCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');

// Initialize DynamoDB client
const dynamodb = new DynamoDBClient();

exports.handler = async (event) => {
    try {
        console.log('event:', event);

        // Get the roomId from the query string parameters
        const roomId = event.queryStringParameters.roomId;

        // Define the DynamoDB query parameters
        const params = {
            TableName: 'ReviewTable',   
            KeyConditionExpression: 'roomId = :roomId',
            ExpressionAttributeValues: {
                ':roomId': { S: roomId }
            }
        };

        // Query the DynamoDB table
        const command = new QueryCommand(params);
        const result = await dynamodb.send(command);
        
        console.log('result:', result);

        // Unmarshall the DynamoDB items
        const items = result.Items.map(item => unmarshall(item));
    
        // Return the fetched items
        return {
            statusCode: 200,
            body: JSON.stringify(items)
        };
    } catch (error) {
        console.error('Error:', error);

        // Return an error response if something goes wrong
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
