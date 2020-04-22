const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

const Recipe = mongoose.model("Recipe");

// router.use(requireAuth);

router.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find({ userId: req.user._id });
  res.send(recipes);
});

router.post("/recipes", async (req, res) => {
  const { name, recipe } = req.body;

  if (!recipe) {
    return res.status(422).send({ error: "You must provide a recipe" });
  }
  try {
    const model = new Recipe({ name, recipe, userId: req.userId });
    await model.save();
    res.send("Successfully saved recipe");
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

module.exports = router;
