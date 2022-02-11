const axios = require("axios");

module.exports = function crawlSinyi() {
  return axios
    .post("https://www.sinyi.com.tw/rent/ajaxSearchHouse.php", {
      params:
        "Taipei-city/100-103-104-106-110-zip/25000-40000-price/20-up-area/house-use",
      page: "1",
      limit: "20",
      returnParams:
        "NO,name,description,address,areaLand,areaBuilding,areaBuildingMain,areaBalcony,price,priceFirst,discount,type,use,room,hall,bathroom,openroom,roomplus,hallplus,bathroomplus,openroomplus,age,floor,inc,imgCount,imgDefault,bigImg,staffpick,decoar,pingratesup,community,lift,parking,customize,keyword,zipcode,tags,tagsSpecial",
    })
    .then(
      ({
        data: {
          OPT: { List },
        },
      }) => {
        // console.log(List);
        const data = List.map(({ name, url }) => {
          return { title: name, url: `https://www.sinyi.com.tw/rent/${url}` };
        });
        // console.log(data);
        return data;
      }
    );
};
