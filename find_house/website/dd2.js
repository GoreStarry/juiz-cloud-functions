const axios = require("axios");

function crawlDD() {
  return axios
    .get(
      encodeURI(
        "https://api.dd-room.com/api/v1/search?category=house&space=whole&city=%E8%87%BA%E5%8C%97%E5%B8%82&area=%E4%B8%AD%E5%B1%B1%E5%8D%80,%E4%B8%AD%E6%AD%A3%E5%8D%80,%E4%BF%A1%E7%BE%A9%E5%8D%80,%E5%A4%A7%E5%90%8C%E5%8D%80,%E5%A4%A7%E5%AE%89%E5%8D%80,%E6%9D%BE%E5%B1%B1%E5%8D%80&min_rent=25000&max_rent=41000&ping=25,40&order=latest&sort=desc&page=1"
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
      // console.log(err);
      return [];
    });
}

module.exports = crawlDD;
