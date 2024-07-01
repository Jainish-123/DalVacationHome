const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const express = require("express");
const serverless = require("serverless-http");

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
      ":agentId": agentId,
    },
  };

  try {
    const data = await client.scan(params).promise();
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
      ":customerId": customerId,
    },
  };

  try {
    const data = await client.scan(params).promise();
    res.json(data.Items);
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
