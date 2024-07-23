const AWS = require("aws-sdk");
const https = require("https");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // console.log("Received event:", JSON.stringify(event, null, 2));

  const intentName = event.sessionState.intent.name;

  switch (intentName) {
    case "BookingInfo":
      return BookingInfo(event);
    case "CustomerConcern":
      return CustomerConcern(event);
    default:
      return close("Failed", "Intent not supported");
  }
};

async function BookingInfo(event) {
  const intentName = event.sessionState.intent.name;
  const slots = event.sessionState.intent.slots;
  const sessionAttributes = event.sessionState.sessionAttributes || {};
  const inputTranscript = event.inputTranscript.toLowerCase();

  let bookingReferenceCode =
    slots.BookingReferenceCode &&
    slots.BookingReferenceCode.value.originalValue;

  console.log(
    "Session Attributes:",
    JSON.stringify(sessionAttributes, null, 2)
  );
  console.log("Slots:", JSON.stringify(slots, null, 2));

  if (sessionAttributes.askReenter && sessionAttributes.askReenter === "true") {
    sessionAttributes.askReenter = "false";

    if (inputTranscript === "yes") {
      return {
        sessionState: {
          sessionAttributes: sessionAttributes,
          intent: {
            name: intentName,
            slots: {
              BookingReferenceCode: {
                value: {
                  originalValue: "",
                  interpretedValue: "",
                  resolvedValues: [],
                },
              },
            },
            state: "InProgress",
          },
          dialogAction: {
            type: "ElicitSlot",
            slotToElicit: "BookingReferenceCode",
            message: {
              contentType: "PlainText",
              content: "Please provide your booking reference code.",
            },
          },
          messages: [
            {
              contentType: "PlainText",
              content: "Please provide your booking reference code.",
            },
          ],
        },
      };
    } else if (inputTranscript === "no") {
      return {
        sessionState: {
          sessionAttributes: {},
          intent: {
            name: intentName,
            slots: slots,
            state: "Fulfilled",
          },
          dialogAction: {
            type: "Close",
            fulfillmentState: "Fulfilled",
            message: {
              contentType: "PlainText",
              content:
                "Thank you for using our service. If you need further assistance, please let us know.",
            },
          },
          messages: [
            {
              contentType: "PlainText",
              content:
                "Thank you for using our service. If you need further assistance, please let us know.",
            },
          ],
        },
      };
    }
  }

  if (!bookingReferenceCode) {
    return {
      sessionState: {
        sessionAttributes: sessionAttributes,
        intent: {
          name: intentName,
          slots: slots,
          state: "InProgress",
        },
        dialogAction: {
          type: "ElicitSlot",
          slotToElicit: "BookingReferenceCode",
          message: {
            contentType: "PlainText",
            content: "Please provide your booking reference code.",
          },
        },
        messages: [
          {
            contentType: "PlainText",
            content: "Please provide your booking reference code.",
          },
        ],
      },
    };
  }

  const params = {
    TableName: "Bookings",
    Key: { bookingRef: bookingReferenceCode },
  };

  try {
    console.log(
      "Fetching booking details for reference code:",
      bookingReferenceCode
    );
    const data = await dynamo.get(params).promise();
    const bookingDetails = data.Item;
    console.log("Booking details:", JSON.stringify(bookingDetails, null, 2));

    if (bookingDetails) {
      console.log("Booking found.");
      return {
        sessionState: {
          sessionAttributes: sessionAttributes,
          intent: {
            name: intentName,
            slots: slots,
            state: "Fulfilled",
            confirmationState: "Confirmed",
          },
          dialogAction: {
            type: "Close",
            fulfillmentState: "Fulfilled",
            message: {
              contentType: "PlainText",
              content: `Your room number is ${bookingDetails.roomNo} and your stay duration is ${bookingDetails.stayDuration} days.`,
            },
          },
        },
        messages: [
          {
            contentType: "PlainText",
            content: `Your room number is ${bookingDetails.roomNo} and your stay duration is ${bookingDetails.stayDuration} days.`,
          },
        ],
      };
    } else {
      console.log("Booking not found.");
      sessionAttributes.askReenter = "true";
      return {
        sessionState: {
          sessionAttributes: sessionAttributes,
          intent: {
            name: intentName,
            slots: slots,
            state: "InProgress",
            confirmationState: "None",
          },
          dialogAction: {
            type: "ConfirmIntent",
            message: {
              contentType: "PlainText",
              content: `I couldn't find a booking with the reference code ${bookingReferenceCode}. Would you like to enter a booking reference code again?`,
            },
          },
        },
        messages: [
          {
            contentType: "PlainText",
            content: `I couldn't find a booking with the reference code ${bookingReferenceCode}. Would you like to enter a booking reference code again?`,
          },
        ],
      };
    }
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return {
      sessionState: {
        sessionAttributes: sessionAttributes,
        intent: {
          name: intentName,
          slots: slots,
          state: "Fulfilled",
          confirmationState: "Confirmed",
        },
        dialogAction: {
          type: "Close",
          fulfillmentState: "Failed",
          message: {
            contentType: "PlainText",
            content:
              "There was an error fetching your booking details. Please try again later.",
          },
        },
        messages: [
          {
            contentType: "PlainText",
            content:
              "There was an error fetching your booking details. Please try again later.",
          },
        ],
      },
    };
  }
}

async function CustomerConcern(event) {
  const intentName = event.sessionState.intent.name;
  const slots = event.sessionState.intent.slots;
  const sessionAttributes = event.sessionState.sessionAttributes || {};

  const email = slots.Email && slots.Email.value.originalValue;
  const BookingId = slots.BookingId && slots.BookingId.value.originalValue;
  const message = slots.Message && slots.Message.value.originalValue;

  if (email.includes(" ")) {
    email = email.replace(" ", "@");
    console.log("Parsed Email after replacement:", email);
  }

  console.log(
    "Session Attributes:",
    JSON.stringify(sessionAttributes, null, 2)
  );
  console.log("Slots:", JSON.stringify(slots, null, 2));

  if (!email || !BookingId || !message) {
    return elicitMissingSlot(event, intentName, slots, sessionAttributes);
  }

  const postData = JSON.stringify({
    customerId: 1,
    customerEmail: email,
    bookingId: BookingId,
    message: message,
  });

  const options = {
    hostname: "us-central1-serverless-426912.cloudfunctions.net",
    path: "/post-customer-query",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": postData.length,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          console.log("API response:", data);
          resolve(
            close(
              event,
              sessionAttributes,
              "Fulfilled",
              "Your concern is forwarded to property agent. Go to Customer Concern section."
            )
          );
        } else {
          console.error("API request failed with status:", res.statusCode);
          resolve(
            close(
              event,
              sessionAttributes,
              "Failed",
              "There was an error forwarding your concern. Please try again later."
            )
          );
        }
      });
    });

    req.on("error", (e) => {
      console.error("API request error:", e);
      resolve(
        close(
          event,
          sessionAttributes,
          "Failed",
          "There was an error forwarding your concern. Please try again later."
        )
      );
    });

    req.write(postData);
    req.end();
  });
}

function elicitMissingSlot(event, intentName, slots, sessionAttributes) {
  let missingSlotName = "";
  let missingSlotMessage = "Please provide the required information: ";

  if (!slots.Message.value.originalValue) {
    missingSlotName = "Message";
    missingSlotMessage += "and your message concerning the issue. ";
  }
  if (!slots.BookingId.value.originalValue) {
    missingSlotName = "BookingId";
    missingSlotMessage += "your booking reference code, ";
  }
  if (!slots.Email.value.originalValue) {
    missingSlotName = "Email";
    missingSlotMessage += "Your email, ";
  }

  missingSlotMessage = missingSlotMessage.trim().replace(/,\s*$/, "");

  return {
    sessionState: {
      sessionAttributes: sessionAttributes,
      intent: {
        name: intentName,
        slots: slots,
        state: "InProgress",
      },
      dialogAction: {
        type: "ElicitSlot",
        slotToElicit: missingSlotName,
        message: {
          contentType: "PlainText",
          content: missingSlotMessage,
        },
      },
      messages: [
        {
          contentType: "PlainText",
          content: missingSlotMessage,
        },
      ],
    },
  };
}

function close(event, sessionAttributes, fulfillmentState, message) {
  return {
    sessionState: {
      sessionAttributes: sessionAttributes,
      intent: {
        name: "CustomerConcern",
        slots: event.sessionState.intent.slots,
        state: "Fulfilled",
        confirmationState: "Confirmed",
      },
      dialogAction: {
        type: "Close",
        fulfillmentState: fulfillmentState,
        message: {
          contentType: "PlainText",
          content: message,
        },
      },
    },
    messages: [
      {
        contentType: "PlainText",
        content: message,
      },
    ],
  };
}
