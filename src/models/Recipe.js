const mongoose = require("mongoose");

// const recipeBodySchema = new mongoose.Schema({
//   timestamp: Number, //number from 1970
//   recipe: {
//     name: String,
//     group: String,
//     ingredients: String,
//     method: String || null,
//     notes: String || null,
//   },
// });

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    default: "",
  },
  recipeBody: [
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
