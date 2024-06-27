import { DynamoDB } from "aws-sdk";
const dynamoDb = new DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const customerId = event.pathParameters.customerId;

  if (!customerId) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "CustomerId is required" }),
    };
  }

  const params = {
    TableName: "queries",
    KeyConditionExpression: "customerId = :customerId",
    ExpressionAttributeValues: {
      ":customerId": customerId,
    },
  };

  try {
    const data = await dynamoDb.query(params).promise();
    const customerQueries = data.Items;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(customerQueries),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Error retrieving customer queries",
        error: error.message,
      }),
    };
  }
};
