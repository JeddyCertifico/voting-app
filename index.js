var express = require("express");
var app = express();

const http = require("http");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/result", function (req, res) {
  res.render("pages/index");
});

app.get("/vote", function (req, res) {
  res.render("pages/vote");
});

const languages = ["javascript", "php", "python", "java"];

io.sockets.on("connection", (socket) => {
  languages.forEach((language) => {
    socket.on(`vote_${language}`, (vote) => {
      io.sockets.emit(`vote_${language}`, vote);
    });
  });
});

app.use("/views", express.static("views"));
app.use("/public", express.static("public"));

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
