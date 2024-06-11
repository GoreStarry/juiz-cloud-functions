const cheerio = require("cheerio");
// const playwright = require("playwright");

const getHtmlPlaywright = require("../getHtmlPlaywright");

// const url =
//   "https://rent.591.com.tw/?kind=1&multiRoom=2,3,4&section=4,3,2,5,1,7&searchtype=1&option=naturalgas&showMore=1&multiNotice=not_cover&order=posttime&orderType=desc&area=25,&rentprice=25000,41000";
const url =
	"https://rent.591.com.tw/?section=12&searchtype=1&multiPrice=20000_30000&multiRoom=2,3&multiArea=30_40,40_50&showMore=1&shape=1,3,4,2";

const extractLinks = ($) => {
	return $(".vue-list-rent-item>a") // Select pagination links
		.map((_, a) => {
			const title = $(a).find(".obsever-lazyimg").attr("alt");
			const imageUrl = $(a).find(".obsever-lazyimg").attr("src");

			console.log(title);
			return {
				title: title,
				// .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
				// .trim(),
				url: $(a).attr("href"),
			};
		}) // Extract the href (url) from each link
		.get(); // Convert cheerio object to array
};

module.exports = async function crawl591() {
	try {
		const { html } = await getHtmlPlaywright(url, ".vue-list-rent-item");
		// console.log(html);
		const $ = cheerio.load(html); // Initialize cheerio
		const houseList = extractLinks($);
		return houseList;
	} catch (error) {
		console.log(error);
		return [];
	}
};

// axios.get(url).then(async ({ data }) => {
//   const $ = cheerio.load(data); // Initialize cheerio
//   const links = await extractLinks($);

//   console.log(links);
//   // ['https://scrapeme.live/shop/page/2/', 'https://scrapeme.live/shop/page/3/', ... ]
// });
