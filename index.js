require("dotenv").config();
require("./src/models/User");
require("./src/models/Recipe");
const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const requireAuth = require("./src/middlewares/requireAuth");
const authRoutes = require("./src/routes/authRoutes");
const recipeRoutes = require("./src/routes/recipeRoutes");

const app = express();
const mongoUri = process.env.MONGODB_URI;

const cors = require("cors");
const port = process.env.PORT || 6000;

app.use(cors());
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(bodyParser.json());

app.use(authRoutes);
app.use(recipeRoutes);

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongo instance");
  } catch (error) {
    console.log("error connecting to mongo", error);
    process.exit(1);
  }
};

connectDb();

app.get("/", requireAuth, (req, res) =>
  res.send(`user email: ${req.user.email}, ${req.user._id}`)
);

app.listen(port, () => console.log(`Backend app listening on port ${port}!`));
