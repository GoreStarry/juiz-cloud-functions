const cheerio = require("cheerio");

const getHtmlPlaywright = require("../getHtmlPlaywright");

const url =
  "https://rent.cthouse.com.tw/area/%E8%87%BA%E5%8C%97%E5%B8%82-city/%E4%B8%AD%E6%AD%A3%E5%8D%80-%E5%A4%A7%E5%90%8C%E5%8D%80-%E4%B8%AD%E5%B1%B1%E5%8D%80-%E5%A4%A7%E5%AE%89%E5%8D%80-%E4%BF%A1%E7%BE%A9%E5%8D%80-town/2-3-room/25000-45000-price/%E6%95%B4%E5%B1%A4%E4%BD%8F%E5%AE%B6-use/20-40-area/";

const extractLinks = ($) => {
  return $("a.intro__name") // Select pagination links
    .map((_, a) => {
      const title = $(a).text();

      // console.log(title);
      return {
        title: title
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
          .trim(),
        url: $(a).attr("href"),
      };
    }) // Extract the href (url) from each link
    .get(); // Convert cheerio object to array
};

module.exports = async function crawlDD() {
  const { html } = await getHtmlPlaywright(url, ".objlist__ItemWrap");
  const $ = cheerio.load(html); // Initialize cheerio
  const houseList = extractLinks($);

  // console.log(houseList);
  return houseList;
};
