const axios = require("axios");
const cheerio = require("cheerio");
// const playwright = require("playwright");

const getHtmlPlaywright = require("../getHtmlPlaywright");

const url =
  "https://rent.housefun.com.tw/region/%E6%96%B0%E5%8C%97%E5%B8%82_%E5%9C%9F%E5%9F%8E%E5%8D%80,%E6%96%B0%E5%8C%97%E5%B8%82_%E4%B8%AD%E5%92%8C%E5%8D%80,%E6%96%B0%E5%8C%97%E5%B8%82_%E6%96%B0%E5%BA%97%E5%8D%80/?cid=0001,0001,0001&aid=28,27,23&purpid=1&rp_h=26000&rp_l=18000";

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

module.exports = async function crawlHousefun() {
  try {
    const { page, browser } = await getHtmlPlaywright(url, ".DataList", {
      isUseEnhanceControl: true,
    });
    await page.locator('a:has-text("新上架")').click(); // Click triggers navigation.
    await page.locator('label:has-text("天然瓦斯")').click(); // Click triggers navigation.
    await page.locator('label:has-text("電梯大樓")').click(); // Click triggers navigation.
    await page.locator('label:has-text("20-30坪")').click(); // Click triggers navigation.
    await page.locator('label:has-text("30-40坪")').click(); // Click triggers navigation.
    await page.fill("#CaseFromFloor", "3");
    await page.waitForTimeout(800);
    await page.waitForSelector(".ajax-loading", { state: "hidden" });
    await page.waitForTimeout(1500);
    const html = await page.content();
    const $ = cheerio.load(html); // Initialize cheerio
    const houseList = extractLinks($);

    await browser.close();
    return houseList;
  } catch (error) {
    console.log(error);
    return [];
  }

  // console.log(houseList);
};

// axios.get(url).then(async ({ data }) => {
//   const $ = cheerio.load(data); // Initialize cheerio
//   const links = await extractLinks($);

//   console.log(links);
//   // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
// });
