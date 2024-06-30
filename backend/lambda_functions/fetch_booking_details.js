const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

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
};
