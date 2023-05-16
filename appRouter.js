const express = require("express");

const {
  broadcast
} = require("./websocket");

const router = express.Router();

router.post("/api/test_web_hooks", function (req, res) {
  console.log("Post request => ", req.body);
  broadcast("/api/test_web_hooks", req.body);
  res.sendStatus(200);
});

router.use("/api/scef_as", function (req, res) {
  console.log("Post request => ", req.body);
  broadcast("/api/scef_as" + req.url, req.body);
  res.sendStatus(200);
});

router.post("/simevents", function (req, res) {
  console.log("Post request => ", req.body);
  broadcast("/simevents", req.body);
  res.sendStatus(200);
});

router.get("/api/:id", function (req, res) {
  console.log("Test connection=> ", req.params);
  broadcast("/api/:id", req.params);
  res.sendStatus(200);
});
router.get("/", function (req, res) {
  res.status(200).send("Hellow, open url /websocket");
});
router.get("/websocket", function (req, res) {
  res.sendFile("/index.html", {
    root: __dirname
  });
});

module.exports = router;
