const { WebClient } = require("@slack/web-api");

console.log("Getting started with Node Slack SDK");

const { SLACK_TOKEN, CONVERSATION_ID } = process.env;

const web = new WebClient(SLACK_TOKEN);

exports.postUnitedStatesNewHomeSales = async () => {
  // See: https://api.slack.com/methods/chat.postMessage
  const today = new Date();
  const image_title = `${today.getFullYear()}/${today.getMonth() +
    1} united states new home sales`;
  const res = await web.chat
    .postMessage({
      channel: CONVERSATION_ID,
      blocks: [
        {
          type: "image",
          title: {
            type: "plain_text",
            text: image_title,
            emoji: true,
          },
          image_url:
            "https://d3fy651gv2fhd3.cloudfront.net/charts/united-states-new-home-sales.png?s=unitedstanewhomsal",
          alt_text: image_title,
        },
      ],
    })
    .catch(err => {
      console.log(err);
    });

  // `res` contains information about the posted message
  console.log("Message sent: ", res.ts);
};
