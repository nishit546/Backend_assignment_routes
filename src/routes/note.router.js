const express = require("express");
const createNote = require("../controllers/app.controller");
const router = express.Router();


router.post("/", createNote);

module.exports = router;