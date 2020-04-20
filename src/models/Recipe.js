const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipe: [
    {
      name: String,
      group: String,
      ingredients: String,
      method: String || null,
      notes: String || null,
    },
  ],
});

mongoose.model("Recipe", recipeSchema);
