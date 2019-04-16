const {
  postUnitedStatesNewHomeSales,
} = require("./slack/postUnitedStatesNewHomeSales.js");

/**
 * Background Cloud Function to be triggered by Pub/Sub.
 * This function is exported by index.js, and executed when
 * the trigger topic receives a message.
 *
 * @param {object} data The event payload.
 * @param {object} context The event metadata.
 */
exports.handleCloudFunctionsRequest = ({ data }, context) => {
  const pubSubMessage = data && Buffer.from(data, "base64").toString();

  switch (pubSubMessage) {
    case "UnitedStatesNewHomeSales":
      postUnitedStatesNewHomeSales();
      break;

    default:
      console.log("unknown payload, break");
      break;
  }
  console.log("done");
};
