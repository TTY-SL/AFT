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

router.get("/api/:id", function(req, res) {
  console.log("Test connection=> ", req.params);
  res.sendStatus(200);
});
router.get("/", function(req, res) {
  console.log("Test connection=> ", req.params);
  res.sendStatus(200);
  res.send("Hello");
});
app.use(router);
app.listen(8080, () => console.log("http://localhost:8080"));
