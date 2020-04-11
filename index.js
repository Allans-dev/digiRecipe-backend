require("dotenv").config();
require('./src/models/User');
const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const requireAuth = require('./src/middlewares/requireAuth');
const authRoutes = require('./src/routes/authRoutes');

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

app.use(authRoutes);

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

app.get("/", requireAuth, (req, res) => res.send(`user email: ${req.user.email}`));

app.listen(port, () => console.log(`Backend app listening on port ${port}!`));