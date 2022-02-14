const axios = require("axios");
const cheerio = require("cheerio");
// const playwright = require("playwright");

const getHtmlPlaywright = require("../getHtmlPlaywright");

const url =
  "https://www.sinyi.com.tw/rent/list/Taipei-city/100-103-104-106-110-zip/25000-45000-price/28-up-area/house-use/9-tools/1-tags/index.html";

const extractLinks = ($) => {
  return $(".search_result_item>a") // Select pagination links
    .map((_, a) => {
      const title = $(a).find(".item_title").attr("alt");

      // console.log(title);
      return {
        title: title
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
          .trim(),
        url: "https://www.sinyi.com.tw/rent/" + $(a).attr("href"),
      };
    }) // Extract the href (url) from each link
    .get(); // Convert cheerio object to array
};

module.exports = async function crawlSinyi() {
  const { page, browser } = await getHtmlPlaywright(url, ".ddhouse", {
    isUseEnhanceControl: true,
  });
  await page.locator(".button_keyword").click(); // Click triggers navigation.
  await page.waitForSelector("#search_result_loading", { state: "hidden" });
  await page.waitForTimeout(1000);
  const html = await page.content();
  const $ = cheerio.load(html); // Initialize cheerio
  const houseList = extractLinks($);
  await browser.close();

  // console.log(houseList);
  return houseList;
};
