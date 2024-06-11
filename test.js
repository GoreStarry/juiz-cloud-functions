const path = require("path");
require("dotenv").config({
	path: path.resolve(__dirname, `.env`),
});

const houseCrawler = require("./find_house/houseCrawler");

houseCrawler();
