require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const user = require("./routes/user");
const dreamCompany = require("./routes/dreamCompany");
const behavioralQuestion = require("./routes/behavioralQuestion");

app.use("/api/v1/", user);
app.use("/api/v1/dreamCompanies", dreamCompany);
app.use("/api/v1/behavioralQuestions", behavioralQuestion);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world!" });
});

exports.app = app;
