const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post("/api/test_web_hooks", function(req, res) {
  console.log("Post request => ", req.body);
  res.sendStatus(200);
});

router.post("/simevents", function(req, res) {
  console.log("Post request => ", req.body);
  res.sendStatus(200);
});

router.get("/api/:id", function(req, res) {
  console.log("Test connection=> ", req.params);
  res.sendStatus(200);
});
router.get("/", function(req, res) {
  res.status(200).send("Hellow");
});
app.use(router);
app.listen(process.env.PORT || 3000, () =>
  console.log("http://localhost:" + (process.env.PORT || 3000))
);
