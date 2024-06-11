import houseCrawler from "../find_house/houseCrawler";

async function postPodcastRating(req, res) {
	try {
		await houseCrawler();
		return res.json({ result: "success" });
	} catch (error) {
		console.log(error);
	}
}

export default postPodcastRating;
