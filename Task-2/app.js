const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api/notes", require("./routes/note.routes"));

module.exports = app;