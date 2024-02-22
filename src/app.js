const express = require("express");
const app = express();
const musicianRouter = require("../routes/musicians");

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/musicians", musicianRouter);

module.exports = app;
