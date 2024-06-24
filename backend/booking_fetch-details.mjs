import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);
const dynamoDBTableName = "booking-details";

export async function handler(event) {
  console.log("Request--event", event);
  let response;
  if (event.httpMethod === "POST") {
    const requestBody = JSON.parse(event.body);
    response = await fetchBookingDetails(requestBody.bookingRef);
  }
  return response;
}

async function fetchBookingDetails(bookingRef) {
  const params = {
    TableName: dynamoDBTableName,
    KeyConditionExpression: "bookingRef = :bookingRef",
    ExpressionAttributeValues: {
      ":bookingRef": bookingRef,
    },
  };

  try {
    const command = new QueryCommand(params);
    const response = await dynamoDB.send(command);

    let body;
    if (response.Items.length === 0) {
      body = {
        Operation: "Fetch booking details",
        Message: "No booking details present",
        List: response.Items,
      };
    } else {
      body = {
        Operation: "Fetch booking details",
        Message: "Booking details fetched successfully",
        Users: response.Items,
      };
    }
    return buildResponse(200, body);
  } catch (error) {
    const body = {
      Operation: "Fetch booking details",
      Message: "Error in fetching booking details",
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
