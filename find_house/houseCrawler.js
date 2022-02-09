const sendSlackMessage = require("./sendSlackMessage");
const crawl591 = require("./website/591");

module.exports = function houseCrawler() {
  crawl591();
  sendSlackMessage();
};
