const AWS = require("aws-sdk");
const uuid = require("uuid");
const crypto = require("crypto");

const sqs = new AWS.SQS();
const QUEUE_URL = "your_queue_url_here";

exports.handler = async (event, context) => {
  try {
    if (!event.body) {
      throw new Error("Missing 'body' in the event");
    }

    const bookingDetails = JSON.parse(event.body);

    const requiredFields = ["email", "room_id"];
    for (const field of requiredFields) {
      if (!bookingDetails[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Generate a unique booking_id
    const bookingId = uuid.v4();

    // Construct the booking details with generated booking_id
    const bookingDetailsWithId = {
      booking_id: bookingId,
      email: bookingDetails.email,
      room_id: bookingDetails.room_id,
    };

    const messageGroupId = bookingDetails.room_id;
    const messageDeduplicationId = crypto
      .createHash("md5")
      .update(JSON.stringify(bookingDetailsWithId))
      .digest("hex");

    const params = {
      QueueUrl: QUEUE_URL,
      MessageBody: JSON.stringify(bookingDetailsWithId),
      MessageGroupId: messageGroupId,
      MessageDeduplicationId: messageDeduplicationId,
    };

    const response = await sqs.sendMessage(params).promise();

    // Add CORS headers to the response
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST",
    };

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({
        message: "Booking details added to the queue",
        messageId: response.MessageId,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        error: "An error occurred",
        details: error.toString(),
      }),
    };
  }
};
