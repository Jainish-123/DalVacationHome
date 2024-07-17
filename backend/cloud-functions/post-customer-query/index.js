const { PubSub } = require("@google-cloud/pubsub");
const functions = require("@google-cloud/functions-framework");

functions.http("post_customer_queries", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  const projectId = process.env.GOOGLE_CLOUD_PROJECT;
  const pubsub = new PubSub({ projectId });

  const topicName = "customer-queries";

  const message = JSON.stringify(req.body);

  // Construct the message as a Buffer
  const dataBuffer = Buffer.from(message);

  try {
    // Publish the message to the specified topic
    await pubsub.topic(topicName).publish(dataBuffer);
    res.status(200).send(`Message published.`);
  } catch (error) {
    console.error(`Error publishing message: ${error}`);
    res.status(500).send("Error publishing message");
  }
});
