const express = require("express");
const https = require("https");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
	const url = "https://api.adviceslip.com/advice";
	https.get(url, function (response) {
		response.on("data", function (data) {
			const adviceObj = JSON.parse(data);
			const adviceId = adviceObj.slip.id;
			const advice = adviceObj.slip.advice;

			console.log(adviceId);
			console.log(advice);
			res.render("index", {
				advice: advice,
				adviceId: adviceId,
			});
		});
	});
});

app.listen(3000, function () {
	console.log("Server listening on port 3000");
});

module.exports = app;
