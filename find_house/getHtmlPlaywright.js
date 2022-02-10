const { chromium } = require("playwright-core");
const bundledChromium = require("chrome-aws-lambda");

module.exports = async function getHtmlPlaywright(url, waitForSelector) {
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
  await page.goto(url);
  await page.waitForSelector(waitForSelector);
  const html = await page.content();
  await browser.close();

  return html;
};
