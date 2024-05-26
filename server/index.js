const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connect } = require("./db");
const { UserRoutes } = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

const connectionDB = "mongodb://127.0.0.1:27017/auth";

connect(connectionDB);

app.get("/hello-world", (_, res) => {
  return res.json({ message: "Hello world" });
});

UserRoutes(app);

app.listen(9000, () => {
  console.log("server started on port 9000");
});
