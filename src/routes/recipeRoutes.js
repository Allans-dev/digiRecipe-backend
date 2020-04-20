const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

// router.use(requireAuth);

router.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find({ userId: req.user._id });
  res.send(recipes);
});

router.post("/recipes", async (req, res) => {
  const { email, recipe } = req.body;

  if (!recipe) {
    return res.status(422).send({ error: "You must provide a recipe" });
  }
  try {
    const recipe = new Recipe({ email, recipe, userId: req.user._id });
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    res.send(422).send({ error: err.message });
  }
});

module.exports = router;
