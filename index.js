const postUnitedStatesNewHomeSales = require("./slack/postUnitedStatesNewHomeSales.js");

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.handleCloudFunctions = async (event, context) => {
  const pubsubMessage = event.data;
  console.log(Buffer.from(pubsubMessage, "base64").toString());

  switch (pubsubMessage) {
    case "UnitedStatesNewHomeSales":
      postUnitedStatesNewHomeSales();
      break;

    default:
      console.log("break");
      break;
  }
};
