const express = require("express");
const app = express();
const musicianRouter = require("../routes/musicians");
const bandRouter = require("../routes/bands");

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/musicians", musicianRouter);
app.use("/bands", bandRouter);

module.exports = app;
