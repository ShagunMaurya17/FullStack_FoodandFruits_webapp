const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

// body parser for json
const express = require("express");
const app = express();

// cross origin
app.use(express.json());
const cors = require("cors");
// eslint-disable-next-line object-curly-spacing
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// firebase credential
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// api endpoint
app.get("/", (req, res) => {
  return res.send("hello world");
});

const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

const productRoute = require("./routes/products");
app.use("/api/products/", productRoute);

exports.app = functions.https.onRequest(app);
