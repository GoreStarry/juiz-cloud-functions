const { WebClient } = require("@slack/web-api");

console.log("Getting started with Node Slack SDK");

const { SLACK_TOKEN } = process.env;

const web = new WebClient(SLACK_TOKEN);

/**
 * Define the chunk method in the prototype of an array
 * that returns an array with arrays of the given size.
 *
 * @param chunkSize {Integer} Size of every group
 */
Object.defineProperty(Array.prototype, "chunk", {
	value: function (chunkSize) {
		return Array(Math.ceil(this.length / chunkSize))
			.fill()
			.map((_, i) => this.slice(i * chunkSize, i * chunkSize + chunkSize));
	},
});

// Split in group of 3 items

// Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
// console.log(result);

module.exports = async function sendSlackMessage(list) {
	var d = new Date();

	var datestring =
		d.toLocaleDateString("zh-tw", { timeZone: "Asia/Taipei" }) +
		"-" +
		d.toLocaleTimeString("zh-tw", { timeZone: "Asia/Taipei" });

	return web.chat
		.postMessage({
			// channel: "C032C57CFU4",
			channel: "C017ESNMPDY",
			// text: `${name} ${url}`,
			blocks:
				list.length === 0
					? [
							{
								type: "header",
								text: {
									type: "plain_text",
									text: `尚無新房${datestring}`,
								},
							},
						]
					: [
							{
								type: "header",
								text: {
									type: "plain_text",
									text: `${datestring}`,
								},
							},
							...list.chunk(10).map((listData) => {
								return {
									type: "section",
									fields: listData.map(({ title, url }) => {
										return {
											type: "mrkdwn",
											text: `${title}  <https:${url}>`,
											// type: "plain_text",
											// text: `${title}: ${url}`,
										};
									}),
								};
							}),
						],
		})
		.catch((err) => {
			console.log(err);
		});

	// `res` contains information about the posted message
	// console.log("Message sent: ", res.ts);
};
