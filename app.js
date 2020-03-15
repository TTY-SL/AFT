const express = require("express");
const bodyParser = require("body-parser");
const router = require("./appRouter");
const { initWS } = require("./websocket.js");

const app = express();

app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, accept, authorization");
  next();
});
app.use(router);

const server = app.listen(process.env.PORT || 3000, () => console.log("http://localhost:" + (process.env.PORT || 3000)));
initWS(server);
