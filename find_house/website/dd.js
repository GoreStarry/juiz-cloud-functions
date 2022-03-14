const axios = require("axios");
const cheerio = require("cheerio");
// const playwright = require("playwright");

const getHtmlPlaywright = require("../getHtmlPlaywright");

const url =
  "https://www.dd-room.com/search?category=house&space=whole&city=%E8%87%BA%E5%8C%97%E5%B8%82&min_rent=25000&max_rent=41000&order=latest&page=1";

const extractLinks = ($) => {
  return $(".w-full a.line-clamp-1") // Select pagination links
    .map((_, a) => {
      const title = $(a).text();

      // console.log(title);
      return {
        title: title
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
          .trim(),
        url: "https://www.dd-room.com" + $(a).attr("href"),
      };
    }) // Extract the href (url) from each link
    .get(); // Convert cheerio object to array
};

module.exports = async function crawlDD() {
  try {
    const { html } = await getHtmlPlaywright(url, ".container");
    const $ = cheerio.load(html); // Initialize cheerio
    const houseList = extractLinks($);

    // console.log(houseList);
    return houseList;
  } catch (error) {
    return [];
  }
};

// axios.get(url).then(async ({ data }) => {
//   const $ = cheerio.load(data); // Initialize cheerio
//   const links = await extractLinks($);

//   console.log(links);
//   // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
// });
