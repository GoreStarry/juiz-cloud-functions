const axios = require("axios");

axios.defaults.baseURL = "https://parseapi.back4app.com/graphql";

axios.defaults.headers.common["X-Parse-Application-Id"] =
  "mXpKZLhw0pmet9p85QkJMq9yRbFqH0p8DLmvHhD6";
axios.defaults.headers.common["X-Parse-REST-API-Key"] =
  "7RsNQNv9G1vt2V1TZFdVHCuJUUgTySOPHMVW7hkx";

axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 400;
};

module.exports = function axiosQL(query) {
  return axios.post("", { query });
};
