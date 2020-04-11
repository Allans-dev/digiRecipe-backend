require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const mongoUri = process.env.MONGODB_URI;

const cors = require('cors');
const port = process.env.PORT || 6000;

app.use(cors());
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});

app.use(limiter);
app.use(bodyParser.json());

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err=> {
  console.log('error connecting to mongo', err);
}))

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Backend app listening on port ${port}!`));