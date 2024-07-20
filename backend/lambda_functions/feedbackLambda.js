const AWS = require("aws-sdk");
const { LanguageServiceClient } = require("@google-cloud/language");
const fs = require("fs");

const keyFilePath = "serverlessgroup-9-47695d71d684.json";
const credentials = JSON.parse(fs.readFileSync(keyFilePath, "utf8"));

const languageClient = new LanguageServiceClient({
  credentials: credentials,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    let body;
    if (event.body) {
      body =
        typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    } else {
      body = event;
    }

    const customerId = body.customerId;
    const feedback = body.feedback;
    const room_id = body.room_id;
    const bookingId = body.bookingId;

    const document = {
      content: feedback,
      type: "PLAIN_TEXT",
    };

    const [result] = await languageClient.analyzeSentiment({ document });
    const sentiment = result.documentSentiment;

    console.log(
      `Sentiment score: ${sentiment.score}, Magnitude: ${sentiment.magnitude}`
    );

    let sentimentLabel;
    if (sentiment.score >= 0.7) {
      sentimentLabel = "very positive";
    } else if (sentiment.score >= 0.3) {
      sentimentLabel = "positive";
    } else if (sentiment.score > 0) {
      sentimentLabel = "slightly positive";
    } else if (sentiment.score === 0) {
      sentimentLabel = "neutral";
    } else if (sentiment.score > -0.3) {
      sentimentLabel = "slightly negative";
    } else if (sentiment.score > -0.7) {
      sentimentLabel = "negative";
    } else {
      sentimentLabel = "very negative";
    }

    await dynamoDB
      .put({
        TableName: "feedback",
        Item: {
          id: Date.now().toString(),
          customerId: customerId,
          bookingId: bookingId,
          feedback: feedback,
          room_id: room_id,
          sentiment: sentimentLabel,
          score: sentiment.score,
          magnitude: sentiment.magnitude,
        },
      })
      .promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "Feedback processed successfully!" }),
    };
  } catch (error) {
    console.error("Error processing feedback:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "Error processing feedback" }),
    };
  }
};
