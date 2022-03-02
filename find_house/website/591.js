const cheerio = require("cheerio");
// const playwright = require("playwright");

const getHtmlPlaywright = require("../getHtmlPlaywright");

const url =
  "https://rent.591.com.tw/?kind=1&multiRoom=2,3&option=naturalgas&showMore=1&order=posttime&orderType=desc&area=25,&rentprice=18000,26000&region=3&section=38,39,34&searchtype=1&other=cartplace,balcony_1&multiFloor=2_6,6_12,12_";

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
  try {
    const { html } = await getHtmlPlaywright(url, ".vue-list-rent-item");
    const $ = cheerio.load(html); // Initialize cheerio
    const houseList = extractLinks($);

    // console.log(houseList);
    return houseList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// axios.get(url).then(async ({ data }) => {
//   const $ = cheerio.load(data); // Initialize cheerio
//   const links = await extractLinks($);

//   console.log(links);
//   // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
// });
