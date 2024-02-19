const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians

app.get("/musicians", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

app.get("/musicians/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const musician = await Musician.findByPk(id);
    if (musician === null) return res.send(`No musician at ${id}.`);
    res.json(musician);
  } catch (e) {
    next(e);
  }
});

module.exports = app;
