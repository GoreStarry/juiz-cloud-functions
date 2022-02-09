const { WebClient } = require("@slack/web-api");

console.log("Getting started with Node Slack SDK");
const { SLACK_TOKEN } = process.env;
const web = new WebClient(SLACK_TOKEN);

module.exports = function sendSlackMessage(name, url) {
  const res = await web.chat
    .postMessage({
      channel: "C032C57CFU4",
      text: `${name} ${url}`,
    })
    .catch((err) => {
      console.log(err);
    });

  // `res` contains information about the posted message
  console.log("Message sent: ", res.ts);
};
