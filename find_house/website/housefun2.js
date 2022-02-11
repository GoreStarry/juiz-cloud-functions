const axios = require("axios");
const cheerio = require("cheerio");
// const playwright = require("playwright");

const getHtmlPlaywright = require("../getHtmlPlaywright");

const url =
  "https://rent.housefun.com.tw/region/%E5%8F%B0%E5%8C%97%E5%B8%82_%E5%A4%A7%E5%AE%89%E5%8D%80,%E5%8F%B0%E5%8C%97%E5%B8%82_%E4%B8%AD%E6%AD%A3%E5%8D%80,%E5%8F%B0%E5%8C%97%E5%B8%82_%E4%BF%A1%E7%BE%A9%E5%8D%80/?cid=0000,0000,0000&aid=5,1,7&purpid=1&rp_h=40000&rp_l=28000";

const extractLinks = ($) => {
  return $("h3>a.ga_click_trace") // Select pagination links
    .map((_, a) => {
      const title = $(a).text();

      // console.log(title);
      return {
        title: title
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
          .trim(),
        url: "https://rent.housefun.com.tw" + $(a).attr("href"),
      };
    }) // Extract the href (url) from each link
    .get(); // Convert cheerio object to array
};

module.exports = async function crawlHousefun2() {
  const { page, browser } = await getHtmlPlaywright(url, ".DataList", {
    isUseEnhanceControl: true,
  });
  await page.locator('a:has-text("新上架")').click(); // Click triggers navigation.
  await page.waitForTimeout(800);
  await page.waitForSelector(".ajax-loading", { state: "hidden" });
  await page.waitForTimeout(1500);
  const html = await page.content();
  const $ = cheerio.load(html); // Initialize cheerio
  const houseList = extractLinks($);

  await browser.close();

  // console.log(houseList);
  return houseList;
};

// axios.get(url).then(async ({ data }) => {
//   const $ = cheerio.load(data); // Initialize cheerio
//   const links = await extractLinks($);

//   console.log(links);
//   // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
// });
