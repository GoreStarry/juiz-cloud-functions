const axios = require("axios");

function crawlDD() {
  return axios
    .get(
      encodeURI(
        "https://api.dd-room.com/api/v1/search?category=house&space=whole&city=臺北市&area=中山區,中正區,信義區,大同區,大安區&min_rent=25000&max_rent=40000&ping=25,40&order=latest&sort=desc&page=1"
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
