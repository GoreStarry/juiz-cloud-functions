const axios = require("axios");

axios.defaults.baseURL = "https://parseapi.back4app.com/graphql";

axios.defaults.headers.common["X-Parse-Application-Id"] =
  "NCPSdPVK8lQr0iLeeZScuMeHLja9VDJ2KykF9kaj";
axios.defaults.headers.common["X-Parse-REST-API-Key"] =
  "DA95aXsXeI7TNBcHiE0VU9hPrn0M2dl87zWQOM95";

axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 400;
};

module.exports = function axiosQL(query) {
  return axios.post("", { query });
};
