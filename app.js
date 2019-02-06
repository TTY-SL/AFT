const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/api/test_web_hooks", function(req, res) {
  console.log("Post request => ", req.body);
  res.sendStatus(200);
});

router.get("/api/:id", function(req, res) {
  console.log("Test connection=> ", req.params);
  res.sendStatus(200);
});
app.use(router);
app.listen(3000, () => console.log("http://localhost:3000"));
