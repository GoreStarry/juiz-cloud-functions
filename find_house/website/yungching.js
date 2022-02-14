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
  const { page, browser } = await getHtmlPlaywright(url, ".house_block", {
    isUseEnhanceControl: true,
  });
  // console.log(html);

  await page.fill("#PriceMin", "25000");
  await page.fill("#PriceMax", "45000");
  await page.locator('span[title="台北市"]').click(); // Click triggers navigation.
  await page.waitForTimeout(1000);
  await page.locator('span[title="中山區"]').click(); // Click triggers navigation.
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
  await page.waitForSelector('.house_block:has-text("中山區")');
  const html中山 = await page.content();
  const $中山 = cheerio.load(html中山); // Initialize cheerio
  const houseList中山 = extractLinks($中山);
  // console.log(houseList中山);

  await page.locator('span[title="信義區"]').click(); // Click triggers navigation.
  await page.waitForSelector('.house_block:has-text("信義區")');
  const html信義 = await page.content();
  const $信義 = cheerio.load(html信義); // Initialize cheerio
  const houseList信義 = extractLinks($信義);
  // console.log(houseList信義);

  await page.locator('span[title="大安區"]').click(); // Click triggers navigation.
  await page.waitForSelector('.house_block:has-text("大安區")');
  const html大安 = await page.content();
  const $大安 = cheerio.load(html大安); // Initialize cheerio
  const houseList大安 = extractLinks($大安);
  // console.log(houseList大安);

  await page.locator('span[title="中正區"]').click(); // Click triggers navigation.
  await page.waitForSelector('.house_block:has-text("中正區")');
  const html中正 = await page.content();
  const $中正 = cheerio.load(html中正); // Initialize cheerio
  const houseList中正 = extractLinks($中正);
  // console.log(houseList中正);

  await page.locator('span[title="大同區"]').click(); // Click triggers navigation.
  await page.waitForSelector('.house_block:has-text("大同區")');
  const html大同 = await page.content();
  const $大同 = cheerio.load(html大同); // Initialize cheerio
  const houseList大同 = extractLinks($大同);
  // console.log(houseList大同);

  await browser.close();

  return [
    ...houseList中山,
    ...houseList信義,
    ...houseList大安,
    ...houseList中正,
    ...houseList大同,
  ];
}

module.exports = crawlYungching;
