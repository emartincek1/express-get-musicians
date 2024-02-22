const { Router } = require("express");
const bandRouter = Router();
const { Musician, Band } = require("../models/index");

bandRouter.get("/", async (req, res, next) => {
  try {
    const bands = await Band.findAll({ include: Musician });
    res.json(bands);
  } catch (err) {
    next(err);
  }
});

bandRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const band = await Band.findByPk(id, { include: Musician });
    if (band === null) return res.send(`No band at ${id}.`);
    res.json(band);
  } catch (err) {
    next(err);
  }
});

module.exports = bandRouter;
