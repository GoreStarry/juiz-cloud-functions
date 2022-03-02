const cheerio = require("cheerio");
// const playwright = require("playwright");

const getHtmlPlaywright = require("../getHtmlPlaywright");

const url = "http://rent.yungching.com.tw/";

const extractLinks = ($) => {
  return $(".house_block_content a") // Select pagination links
    .map((_, a) => {
      const title = $(a).attr("title");

      // console.log(title);
      return {
        title: title,
        // .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
        // .trim(),
        url: url + $(a).attr("href"),
      };
    }) // Extract the href (url) from each link
    .get(); // Convert cheerio object to array
};

async function crawlYungching() {
  // console.log(html);

  try {
    const { page, browser } = await getHtmlPlaywright(url, ".house_block", {
      isUseEnhanceControl: true,
    });
    await page.fill("#PriceMin", "18000");
    await page.fill("#PriceMax", "26000");
    await page.locator('span[title="新北市"]').click(); // Click triggers navigation.
    await page.waitForTimeout(2000);
    await page.locator('span[title="土城區"]').click(); // Click triggers navigation.
    // await page.waitForTimeout(1000);
    // await page.locator('span[title="20000~40000"]').click(); // Click triggers navigation.
    await page.waitForTimeout(1000);
    await page.locator("#spnUpdateTimeOrder").click(); // Click triggers navigation.
    await page.waitForTimeout(1000);
    await page.locator('span[title="整層住家"]').click(); // Click triggers navigation.
    await page.waitForTimeout(5000);
    await page.waitForSelector("#imgLoading", { state: "hidden" });
    await page.waitForTimeout(5000);

    // console.log("in");
    // wait for 1 second
    await page.waitForSelector('.house_block:has-text("土城區")');
    const html土城 = await page.content();
    const $土城 = cheerio.load(html土城); // Initialize cheerio
    const houseList土城 = extractLinks($土城);
    // console.log(houseList土城);

    await page.locator('span[title="中和區"]').click(); // Click triggers navigation.
    await page.waitForSelector('.house_block:has-text("中和區")');
    const html中和 = await page.content();
    const $中和 = cheerio.load(html中和); // Initialize cheerio
    const houseList中和 = extractLinks($中和);
    // console.log(houseList中和);

    await page.locator('span[title="新店區"]').click(); // Click triggers navigation.
    await page.waitForSelector('.house_block:has-text("新店區")');
    const html新店 = await page.content();
    const $新店 = cheerio.load(html新店); // Initialize cheerio
    const houseList新店 = extractLinks($新店);
    // console.log(houseList中和);

    await browser.close();

    return [...houseList土城, ...houseList中和, ...houseList新店];
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = crawlYungching;
