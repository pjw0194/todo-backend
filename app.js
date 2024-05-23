const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
require("dotenv").config();

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter);

const mongoURI = MONGODB_URI_PROD;

mongoose
	.connect(mongoURI)
	.then(() => console.log("mongoose connected"))
	.catch((err) => console.log("db connection failed..", err));

app.listen(process.env.PORT || 5000, () =>
	console.log("server is listening on port 5000")
);
