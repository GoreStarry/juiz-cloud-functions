const { WebClient } = require("@slack/web-api");

console.log("Getting started with Node Slack SDK");

const { SLACK_TOKEN, CONVERSATION_ID } = process.env;

const web = new WebClient(SLACK_TOKEN);

(async () => {
  // See: https://api.slack.com/methods/chat.postMessage
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
          alt_text: "image1",
        },
      ],
    })
    .catch(err => {
      console.log(err);
    });

  // `res` contains information about the posted message
  console.log("Message sent: ", res.ts);
})();
