const axios = require("axios");

axios.defaults.baseURL = "https://parseapi.back4app.com/graphql";

axios.defaults.headers.common["X-Parse-Application-Id"] =
  "YeUpbTHa5UOXTCt2LJtGfBltPIoMWINQBRVYbMkh";
axios.defaults.headers.common["X-Parse-REST-API-Key"] =
  "72Vr5CI6FWwwDkwhjsmi4jdgqCpXWgVQabDmMy1Y";

axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 400;
};

module.exports = function axiosQL(query) {
  return axios.post("", { query });
};
