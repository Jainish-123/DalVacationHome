import { DynamoDB } from "aws-sdk";
const dynamoDb = new DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const agentId = event.pathParameters.agentId;

  if (!agentId) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "AgentId is required" }),
    };
  }

  const params = {
    TableName: "queries",
    KeyConditionExpression: "agentId = :agentId",
    ExpressionAttributeValues: {
      ":agentId": agentId,
    },
  };

  try {
    const data = await dynamoDb.query(params).promise();
    const agentQueries = data.Items;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(agentQueries),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Error retrieving agent queries",
        error: error.message,
      }),
    };
  }
};
