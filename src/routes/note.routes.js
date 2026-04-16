const express = require("express");
const {createNote,createNotesBulk} = require("../controllers/app.controller");

const router = express.Router();

router.post("/", createNote);
router.post("/bulk",createNotesBulk);
module.exports = router;