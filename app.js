const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const router = express.Router();
const broadcast = (uri, message) => {
  wss.clients.forEach(client => {
    const data = {
      uri: `${new Date().toISOString()} ${uri}`,
      data: `${new Date().toISOString()} "Request => " ${JSON.stringify(message)}`,
    };
    client.send(JSON.stringify(data));
  });
};
const { Server } = require("ws");
app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post("/api/test_web_hooks", function(req, res) {
  console.log("Post request => ", req.body);
  broadcast("/api/test_web_hooks", req.body);
  res.sendStatus(200);
});

router.post("/simevents", function(req, res) {
  console.log("Post request => ", req.body);
  broadcast("/simevents", req.body);
  res.sendStatus(200);
});

router.get("/api/:id", function(req, res) {
  console.log("Test connection=> ", req.params);
  broadcast("/api/:id", req.params);
  res.sendStatus(200);
});
router.get("/", function(req, res) {
  res.status(200).send("Hellow");
});
router.get("/websocket", function(req, res) {
  res.sendFile("/index.html", { root: __dirname });
});
app.use(router);
const server = app.listen(process.env.PORT || 3000, () => console.log("http://localhost:" + (process.env.PORT || 3000)));

const wss = new Server({ server });

wss.on("connection", ws => {
  console.log("Client connected");
  ws.on("close", () => console.log("Client disconnected"));
  ws.on("message", val => console.log(val));
});
