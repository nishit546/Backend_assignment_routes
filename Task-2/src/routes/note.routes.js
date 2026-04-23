const express = require("express");
const router = express.Router();

const controller = require("../controllers/note.controller");

router.post("/", controller.createNote);

// BULK FIRST
router.post("/bulk", controller.createBulkNotes);
router.get("/", controller.getAllNotes);
router.get("/:id", controller.getNoteById);
module.exports = router;
