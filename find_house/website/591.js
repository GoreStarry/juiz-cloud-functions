const axios = require("axios");
const cheerio = require("cheerio");
const playwright = require("playwright");
const url =
  "https://rent.591.com.tw/?kind=1&multiRoom=2,3&section=3,2,5,1,7&searchtype=1&multiPrice=30000_40000,20000_30000&option=naturalgas&showMore=1&multiNotice=not_cover&order=posttime&orderType=desc&area=25,";

const getHtmlPlaywright = async (url) => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  await page.waitForSelector(".vue-list-rent-item");
  const html = await page.content();
  await browser.close();

  return html;
};

const extractLinks = ($) => {
  return [
    ...new Set(
      $(".switch-list-content a") // Select pagination links
        .map((_, a) => {
          return $(a).attr("href");
        }) // Extract the href (url) from each link
        .toArray() // Convert cheerio object to array
    ),
  ];
};

function crawl591(params) {
  getHtmlPlaywright(url).then((html) => {
    console.log(html);
    const $ = cheerio.load(html); // Initialize cheerio
    const links = extractLinks($);

    console.log(links);
  });
}

module.exports = crawl591;

// axios.get(url).then(async ({ data }) => {
//   const $ = cheerio.load(data); // Initialize cheerio
//   const links = await extractLinks($);

//   console.log(links);
//   // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
// });
