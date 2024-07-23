const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const dynamoDBTableName = "Feedback";

exports.handler = async (event) => {
  let response;
  if (event.httpMethod === "POST") {
    const requestBody = JSON.parse(event.body);
    response = await fetchFeedback(requestBody.room);
  }
  return response;
};

async function fetchFeedback(room) {
  const params = {
    TableName: dynamoDBTableName,
    FilterExpression: "room = :room",
    ExpressionAttributeValues: {
      ":room": room,
    },
  };

  try {
    const response = await dynamo.scan(params).promise();
    console.log("dynamo response: ", response);

    const body = {
      data: response.Items,
    };
    return buildResponse(200, body);
  } catch (error) {
    const body = {
      Message: "Error in fetching feedbacks",
      Error: error.message,
    };
    return buildResponse(500, body);
  }
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(body),
  };
}
