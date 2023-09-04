const express = require("express");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;

// connection to DataBase
connectDB();

const app = express();

// Authorisation CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Middleware qui permet de traiter les données de la Request

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));

// Lancer le server
app.listen(port, () => console.log("Le server à démarré au port " + port));
