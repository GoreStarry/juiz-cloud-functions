const { chromium } = require("playwright-core");
const bundledChromium = require("chrome-aws-lambda");

module.exports = async function getHtmlPlaywright(
  url,
  waitForSelector,
  { isUseEnhanceControl } = {}
) {
  const browser = await Promise.resolve(bundledChromium.executablePath).then(
    (executablePath) => {
      if (!executablePath) {
        // local execution
        return chromium.launch({});
      }
      return chromium.launch({ executablePath });
    }
  );
  // const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await goTo(page, url, waitForSelector);

  let html;
  if (!isUseEnhanceControl) {
    html = await page.content();
    await browser.close();
  }

  return { page, browser, html };
};

async function goTo(page, url, waitForSelector) {
  try {
    await page.goto(url);
    await page.waitForSelector(waitForSelector);
  } catch (error) {
    console.log(error);
    await goTo(page, url, waitForSelector);
  }
}
