const { Server } = require("ws");
let wss = undefined;
const broadcast = (uri, message) => {
  if (!wss) return;

  const data = {
    uri: `${new Date().toISOString()} ${uri}`,
    data: `${new Date().toISOString()} "Request => " ${JSON.stringify(message)}`,
  };
  const d = JSON.stringify(data);
  wss.clients.forEach(client => {
    client.send(d);
  });
};
const initWS = server => {
  wss = new Server({ server });
  wss.on("connection", ws => {
    console.log("Client connected");
    ws.on("close", () => console.log("Client disconnected"));
    ws.on("message", data => {
      const d = JSON.parse(data);
      if (d.type === "ping") {
        ws.send(JSON.stringify({ type: "pong" }));
      }
    });
  });
};

module.exports = { broadcast, initWS };
