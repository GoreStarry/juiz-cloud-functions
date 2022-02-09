// const sendSlackMessage = require("./sendSlackMessage");
const crawl591 = require("./website/591");

module.exports = async function houseCrawler() {
  await crawl591();
  // sendSlackMessage();
};
