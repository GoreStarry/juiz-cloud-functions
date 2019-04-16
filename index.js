const { WebClient } = require("@slack/web-api");

console.log("Getting started with Node Slack SDK");

const { SLACK_TOKEN, CONVERSATION_ID } = process.env;

const web = new WebClient(SLACK_TOKEN);

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.postUnitedStatesNewHomeSales = async (event, context) => {
  const pubsubMessage = event.data;
  console.log(Buffer.from(pubsubMessage, "base64").toString());

  const today = new Date();

  const res = await web.chat
    .postMessage({
      channel: CONVERSATION_ID,
      blocks: [
        {
          type: "image",
          title: {
            type: "plain_text",
            text: "image1",
            emoji: true,
          },
          image_url:
            "https://d3fy651gv2fhd3.cloudfront.net/charts/united-states-new-home-sales.png?s=unitedstanewhomsal",
          alt_text: `${today.getFullYear()}/${today.getMonth() +
            1} united states new home sales`,
        },
      ],
    })
    .catch(err => {
      console.log(err);
    });
  console.log("Message sent: ", res.ts);
};
