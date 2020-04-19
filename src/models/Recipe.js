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
      method: String,
      notes: String,
    },
  ],
});

mongoose.model("Recipe", recipeSchema);
