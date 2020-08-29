let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let stream = require("./ws/stream");
let path = require("path");
let favicon = require("serve-favicon");
const port = process.env.PORT || 3000;

app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.get("/indexold.html", (req, res) => {
	res.sendFile(__dirname + "/indexold.html");
});

app.get("/indexnew.html", (req, res) => {
	res.sendFile(__dirname + "/indexnew.html");
})

io.of("/stream").on("connection", stream);

server.listen(port);
