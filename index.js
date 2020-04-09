require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
const port = process.env.PORT || 6000;

app.use(cors());
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});

app.use(limiter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Backend app listening on port ${port}!`));