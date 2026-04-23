const express = require("express");
const router = express.Router();

const controller = require("../controllers/note.controller");

// BULK FIRST
router.post("/bulk", controller.createBulkNotes);

module.exports = router;
