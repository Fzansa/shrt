const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {

    let { url } = req.body;

    if (!url) return res.status(400).json({ error: "url is required" });
    const shortID = shortid();
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
    }
    await URL.insertMany({
        shortId: shortID,
        redirectURL: url,
        visitHistory: [],
    });

    return res.status(200).json({
        success: true,
        shortId: shortID
    });
};

async function handleGetAnalytics(req, res) {

    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ totalClicks: result.visitHistory.length, analatycs: result.visitHistory });

}

async function handleFindingOneUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    });
    const redirectURL = entry?.redirectURL?.startsWith("http")
        ? entry.redirectURL
        : `https://${entry?.redirectURL}`;
    res.redirect(redirectURL);
}

async function handleFindOne(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({
        shortId
    });

    res.status(200).json({
        entry
    })

}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics, handleFindingOneUrl, handleFindOne };