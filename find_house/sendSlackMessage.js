const { WebClient } = require("@slack/web-api");

console.log("Getting started with Node Slack SDK");
const { SLACK_TOKEN } = process.env;
const web = new WebClient(
  "xoxb-597700362547-609318930693-i70hFuIprNDRAb4KVz7MivfP"
);

/**
 * Define the chunk method in the prototype of an array
 * that returns an array with arrays of the given size.
 *
 * @param chunkSize {Integer} Size of every group
 */
Object.defineProperty(Array.prototype, "chunk", {
  value: function (chunkSize) {
    var that = this;
    return Array(Math.ceil(that.length / chunkSize))
      .fill()
      .map(function (_, i) {
        return that.slice(i * chunkSize, i * chunkSize + chunkSize);
      });
  },
});

// Split in group of 3 items

// Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
// console.log(result);

module.exports = async function sendSlackMessage(list) {
  const res = await web.chat
    .postMessage({
      channel: "C032C57CFU4",
      // text: `${name} ${url}`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "New request",
          },
        },
        ...list.chunk(10).map((listData) => {
          return {
            type: "section",
            fields: listData.map(({ title, url }) => {
              return {
                type: "mrkdwn",
                text: `${title}  <${url}>`,
                // type: "plain_text",
                // text: `${title}: ${url}`,
              };
            }),
          };
        }),
      ],
    })
    .catch((err) => {
      console.log(err);
    });

  // `res` contains information about the posted message
  console.log("Message sent: ", res.ts);
};
