const {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");

const express = require("express");
const cors = require("cors");

const serverless = require("serverless-http");
const uuid4 = require("uuid4");

const app = express();

const QUERIES_TABLE = process.env.QUERIES_TABLE;
const MESSAGES_TABLE = process.env.MESSAGES_TABLE;
const client = new DynamoDBClient();

app.use(express.json());
app.use(cors());

/**
 * Method to transform DynamoDB Object into simple structure object
 * @param {*} items
 * @returns
 */
const transformDynamoResponse = (items) => {
  return items.map((item) => {
    const normalObject = {};
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        normalObject[key] = item[key][Object.keys(item[key])[0]];
      }
    }
    return normalObject;
  });
};

/**
 * This endpoint fetches queries related agents based on given agentId
 */
app.get("/agent-queries/:agentId", async (req, res) => {
  const agentId = req.params.agentId;
  const params = {
    TableName: QUERIES_TABLE,
    FilterExpression: "agentId = :agentId",
    ExpressionAttributeValues: {
      ":agentId": { N: `${agentId}` },
    },
  };

  try {
    const data = await client.send(new ScanCommand(params));
    res.status(200).json(transformDynamoResponse(data?.Items || []));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch agent queries" });
  }
});

/**
 * This endpoint fetches queries related customers based on given customerId
 */
app.get("/customer-queries/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  const params = {
    TableName: QUERIES_TABLE,
    FilterExpression: "customerId = :customerId",
    ExpressionAttributeValues: {
      ":customerId": { N: `${customerId}` },
    },
  };

  try {
    const data = await client.send(new ScanCommand(params));
    res.status(200).json(transformDynamoResponse(data?.Items || []));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    });
  }
});

/**
 * Webhook endpoint for handling customer query which assign random agent to customer query
 */
app.post("/handle-customer-query", async (req, res) => {
  const buffer = req.body;
  const jsonString = Buffer.from(buffer, "base64").toString("utf8");
  const body = JSON.parse(jsonString);

  //TODO randomly select agent and assign
  const params = {
    TableName: QUERIES_TABLE,
    Item: {
      id: { S: uuid4() },
      customerId: { N: `${body.customerId}` },
      agentId: { N: `562339209483406398` },
      bookingId: { S: body.bookingId },
      description: { S: body.message },
      date: { S: new Date().toISOString() },
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

/**
 * This endpoint fetches messages for given customerID and agentId
 */
app.get("/messages/:customerId/:agentId", async (req, res) => {
  const customerId = req.params.customerId;
  const agentId = req.params.agentId;

  console.log("customerId", customerId);
  console.log("agentId", agentId);

  const params = {
    TableName: MESSAGES_TABLE,
    FilterExpression: "customerId = :customerId AND agentId = :agentId",
    ExpressionAttributeValues: {
      ":customerId": { N: `${customerId}` },
      ":agentId": { N: `${agentId}` },
    },
  };

  try {
    const data = await client.send(new ScanCommand(params));
    res.status(200).json(transformDynamoResponse(data?.Items || []));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    });
  }
});

/**
 * Endpoint to create and insert message into DynamoDB
 */
app.post("/create-message", async (req, res) => {
  const body = req.body;
  const params = {
    TableName: MESSAGES_TABLE,
    Item: {
      id: { S: uuid4() },
      customerId: { N: `${body.customerId}` },
      agentId: { N: `${body.agentId}` },
      message: { S: body.message },
      date: { S: new Date().toISOString() },
    },
  };
  try {
    await client.send(new PutItemCommand(params));
    res.status(200).json({ message: "Successfully inserted message" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch customer queries" });
  }
});

/**
 * Default route to show 404 page
 */
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

/**
 * Serverless application running express app
 */
exports.handler = serverless(app);
