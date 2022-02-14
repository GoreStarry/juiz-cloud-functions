const cheerio = require("cheerio");
// const playwright = require("playwright");

const getHtmlPlaywright = require("../getHtmlPlaywright");

const url =
  "https://rent.591.com.tw/?kind=1&multiRoom=2,3,4&section=3,2,5,1,7&searchtype=1&option=naturalgas&showMore=1&multiNotice=not_cover&order=posttime&orderType=desc&area=28,&rentprice=25000,45000";

const extractLinks = ($) => {
  return $(".vue-list-rent-item>a") // Select pagination links
    .map((_, a) => {
      const title = $(a).find(".obsever-lazyimg").attr("alt");
      const imageUrl = $(a).find(".obsever-lazyimg").attr("src");

      // console.log(title);
      return {
        title: title,
        // .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
        // .trim(),
        url: $(a).attr("href"),
      };
    }) // Extract the href (url) from each link
    .get(); // Convert cheerio object to array
};

module.exports = async function crawl591() {
  const { html } = await getHtmlPlaywright(url, ".vue-list-rent-item");
  const $ = cheerio.load(html); // Initialize cheerio
  const houseList = extractLinks($);

  // console.log(houseList);
  return houseList;
};

// axios.get(url).then(async ({ data }) => {
//   const $ = cheerio.load(data); // Initialize cheerio
//   const links = await extractLinks($);

//   console.log(links);
//   // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
// });
