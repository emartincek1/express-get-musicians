const { Router } = require("express");
const musicianRouter = Router();
const { Musician } = require("../models/index");
const { check, validationResult } = require("express-validator");

musicianRouter.get("/", async (req, res, next) => {
  try {
    const musicians = await Musician.findAll();
    res.json(musicians);
  } catch (err) {
    next(err);
  }
});

musicianRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const musician = await Musician.findByPk(id);
    if (musician === null) return res.send(`No musician at ${id}.`);
    res.json(musician);
  } catch (e) {
    next(e);
  }
});

musicianRouter.post(
  "/",
  [
    check("musician.name").not().isEmpty().trim().isLength({ min: 2, max: 20 }),
    check("musician.instrument")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 2, max: 20 }),
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

musicianRouter.put(
  "/:id",
  [
    check("musician.name").not().isEmpty().trim().isLength({ min: 2, max: 20 }),
    check("musician.instrument")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 2, max: 20 }),
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

musicianRouter.delete("/:id", async (req, res, next) => {
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

module.exports = musicianRouter;
