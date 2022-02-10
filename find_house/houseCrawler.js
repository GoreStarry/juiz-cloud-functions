// const sendSlackMessage = require("./sendSlackMessage");
const crawl591 = require("./website/591");
const crawlDD = require("./website/dd");
const crawlHousefun = require("./website/housefun");
const crawlHousefun2 = require("./website/housefun2");
const getHouse = require("./getHouse");
const recordHouse = require("./recordHouse");
const sendSlackMessage = require("./sendSlackMessage");

module.exports = async function houseCrawler() {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  // const recordedHouse = getHouse({
  //   isoDate: yesterday.toISOString(),
  // });
  const [recordedHouse, list591, listDD, listHousefun, listHousefun2] =
    await Promise.all([
      getHouse({ isoDate: yesterday.toISOString() }),
      crawl591(),
      crawlDD(),
      crawlHousefun(),
      crawlHousefun2(),
    ]);

  console.log(recordedHouse);
  console.log(recordedHouse.length);

  const newData = [
    ...list591,
    ...listDD,
    ...listHousefun,
    ...listHousefun2,
  ].filter(({ url }) => {
    return !recordedHouse.find(({ url: urlRecord }) => urlRecord === url);
  });

  console.log(newData);

  sendSlackMessage(newData);

  await Promise.all(
    newData.map(
      ({ title, url }, index) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            recordHouse({ name: title, url })
              .then((res) => {
                console.log(`recorded: ${title}`);
                resolve(res);
              })
              .catch((error) => {
                reject(error);
              });
          }, index * 500);
        })
    )
  );

  console.log("all done");

  // houseCrawler();

  // console.log(recordedHouse);
  // const list591 = await crawl591();
  // sendSlackMessage();
};
