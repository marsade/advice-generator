const express = require("express");
const https = require("https");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
	res.render("index");
	const url = "https://api.adviceslip.com/advice";
	https.get(url, function (response) {
		response.on("data", function (data) {
			const advice = JSON.parse(data);
			console.log(advice);
		});
	});
});

app.listen(3000, function () {
	console.log("Server listening on port 3000");
});
