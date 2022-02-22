const axios = require("axios");

function crawlDD() {
  return axios
    .get(
      encodeURI(
        "https://api.dd-room.com/api/v1/search?category=house&space=whole&bldg=elevator&city=%E6%96%B0%E5%8C%97%E5%B8%82&area=%E4%B8%AD%E5%92%8C%E5%8D%80,%E5%9C%9F%E5%9F%8E%E5%8D%80,%E6%96%B0%E5%BA%97%E5%8D%80&min_rent=18000&max_rent=26000&ping=19,32&floor=3,15&furnish=%E5%A4%A9%E7%84%B6%E7%93%A6%E6%96%AF&order=latest&sort=desc&page=1"
      )
    )
    .then(
      ({
        data: {
          data: {
            search: { items },
          },
        },
      }) => {
        return items.map(({ title, object_id }) => ({
          title,
          url: "https://www.dd-room.com/object/" + object_id,
        }));
      }
    )
    .catch((err) => {
      console.log(err);
    });
}

module.exports = crawlDD;
