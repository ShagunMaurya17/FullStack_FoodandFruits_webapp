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

exports.app = functions.https.onRequest(app);
