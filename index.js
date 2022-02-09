const {
  postUnitedStatesNewHomeSales,
} = require("./slack/postUnitedStatesNewHomeSales.js");

const houseCrawler = require("./find_house/houseCrawler");
/**
 * Background Cloud Function to be triggered by Pub/Sub.
 * This function is exported by index.js, and executed when
 * the trigger topic receives a message.
 *
 * @param {object} data The event payload.
 * @param {object} context The event metadata.
 */
exports.handleCloudFunctionsRequest = async ({ data }, context) => {
  const pubSubMessage = data && Buffer.from(data, "base64").toString();
  console.log(pubSubMessage);
  switch (pubSubMessage) {
    case "UnitedStatesNewHomeSales":
      postUnitedStatesNewHomeSales();
      break;

    case "FindHouse":
      console.log("in FindHouse");
      await houseCrawler();
      break;

    default:
      console.log("unknown payload, break");
      break;
  }
  console.log("done");
};
