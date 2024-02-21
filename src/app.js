const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");
const { check, validationResult } = require("express-validator");

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.post(
  "/musicians",
  [
    check("musician.name").not().isEmpty().trim(),
    check("musician.instrument").not().isEmpty().trim(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      } else {
        const { musician } = req.body;
        await Musician.create(musician);
        const musicians = await Musician.findAll();
        res.json(musicians);
      }
    } catch (e) {
      next(e);
    }
  }
);

app.put(
  "/musicians/:id",
  [
    check("musician.name").not().isEmpty().trim(),
    check("musician.instrument").not().isEmpty().trim(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      } else {
        const { musician } = req.body;
        const { id } = req.params;
        const oldMusician = await Musician.findByPk(id);
        if (oldMusician === null) return res.send(`No musician at ${id}.`);
        await oldMusician.update(musician);
        const musicians = await Musician.findAll();
        res.json(musicians);
      }
    } catch (e) {
      next(e);
    }
  }
);

app.delete("/musicians/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldMusician = await Musician.findByPk(id);
    if (oldMusician === null) return res.send(`No musician at ${id}.`);
    await oldMusician.destroy();
    const musicians = await Musician.findAll();
    res.json(musicians);
  } catch (e) {
    next(e);
  }
});

module.exports = app;
