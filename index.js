const postUnitedStatesNewHomeSales = require("./slack/postUnitedStatesNewHomeSales.js");

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.handleCloudFunctionsRequest = async (event, context) => {
  const pubsubMessage = Buffer.from(event.data, "base64").toString();
  console.log(pubsubMessage);

  switch (pubsubMessage) {
    case "UnitedStatesNewHomeSales":
      postUnitedStatesNewHomeSales();
      break;

    default:
      console.log("break");
      break;
  }
};
