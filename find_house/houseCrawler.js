// const sendSlackMessage = require("./sendSlackMessage");
const crawl591 = require("./website/591");
const crawlDD = require("./website/dd2");
const crawlSinyi = require("./website/sinyi");
const crawlHousefun = require("./website/housefun");
const crawlYungching = require("./website/yungching");
const crawlCthouse = require("./website/cthouse");

const getHouse = require("./getHouse");
const recordHouse = require("./recordHouse");
const sendSlackMessage = require("./sendSlackMessage");

module.exports = async function houseCrawler() {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  const [recordedHouse, list591, listDD, listHousefun] = await Promise.all([
    getHouse({ isoDate: yesterday.toISOString() }),
    crawl591(),
    crawlDD(),
    crawlHousefun(),
  ]);

  const [listYungching, listSinyi, listCthouse] = await Promise.all([
    crawlYungching(),
    crawlSinyi(),
    crawlCthouse(),
  ]);

  const newData = [
    ...list591,
    ...listDD,
    ...listHousefun,

    ...listYungching,
    ...listSinyi,
    ...listCthouse,
  ].filter(({ url }) => {
    return !recordedHouse.find(({ url: urlRecord }) => urlRecord === url);
  });

  console.log(newData);

  await sendSlackMessage(newData);

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
  ).catch((error) => {
    console.log(error);
  });

  console.log("all done");
  return;
};
