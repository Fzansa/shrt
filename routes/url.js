const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleFindingOneUrl,
  handleFindOne,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", handleFindingOneUrl);

router.get("/getone/:shortId", handleFindOne)
router.get('/', (req, res) => {
  res.send("<h1>Hi Its working</h1>")
})

module.exports = router;
