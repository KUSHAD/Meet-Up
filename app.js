const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const stream = require("./src/ws/stream");
const path = require("path");
const favicon = require("serve-favicon");
const Datastore = require("nedb");
const port = process.env.PORT || 5000;
const dataBase = new Datastore("datas/my-meetings.db");
dataBase.loadDatabase();

app.use(favicon(path.join("src", "favicon.ico")));
app.use("/assets", express.static(path.join("src", "assets")));

app.use(express.static("src"));

app.use(
	express.json({
		limit: "2mb",
	})
);

app.get('/api', (req, res) => {
	dataBase.find({}, (err, data) => {
		if (err) {
			res.end();
			return;
		} else {
			res.json(data);
		}
	});
});


server.listen(port);


app.post("/api", (request, respone) => {
	dataBase.insert(request.body);
});

app.post("/pi", (req, res) => {
	dataBase.remove(req.body, err => {
		if (err) {
			res.end();
			return;
		}
	})
});

io.of("/stream").on("connection", stream);
