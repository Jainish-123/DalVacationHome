const {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");

const express = require("express");
const serverless = require("serverless-http");
const uuid4 = require("uuid4");

const app = express();

const QUERIES_TABLE = process.env.QUERIES_TABLE;
const client = new DynamoDBClient();

app.use(express.json());

// Fetch queries by agentId
app.get("/agent-queries/:agentId", async (req, res) => {
  const agentId = req.params.agentId;
  const params = {
    TableName: QUERIES_TABLE,
    FilterExpression: "agentId = :agentId",
    ExpressionAttributeValues: {
      ":agentId": { s: agentId },
    },
  };

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const data = await client.send(new ScanCommand(params));
    res.json(data.Items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch agent queries" });
  }
});

// Fetch queries by customerId
app.get("/customer-queries/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  const params = {
    TableName: QUERIES_TABLE,
    FilterExpression: "customerId = :customerId",
    ExpressionAttributeValues: {
      ":customerId": { S: customerId },
    },
  };

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const data = await client.send(new ScanCommand(params));
    res.status(200).json(data.Items);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    });
  }
});

app.post("/handle-customer-query", async (req, res) => {
  const buffer = req.body;
  const jsonString = Buffer.from(buffer, "base64").toString("utf8");
  const body = JSON.parse(jsonString);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  //TODO randomly select agent and assign
  const params = {
    TableName: QUERIES_TABLE,
    Item: {
      id: { S: uuid4() },
      customerId: { S: body.customerId },
      agentId: { S: "123" }, // Assuming agentId is static for now
      bookingId: { S: body.bookingId }, // Corrected to 'S'
      description: { S: body.message }, // Corrected to 'S'
      date: { S: new Date().toISOString() }, // Use ISO string for date
    },
  };
  try {
    await client.send(new PutItemCommand(params));
    res.status(200).json({ message: "Successfully inserted customer query" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch customer queries" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
