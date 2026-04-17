const express = require("express");
const {createNote,createNotesBulk,getAllNotes, getNotesById, updateNote, updateNotePartial, deleteNote} = require("../controllers/app.controller");

const router = express.Router();

router.post("/", createNote);
router.post("/bulk",createNotesBulk);
router.get("/",getAllNotes);
router.get("/:id",getNotesById);
router.put("/:id",updateNote);
router.patch('/:id', updateNotePartial);
router.delete('/api/notes/:id', deleteNote);

module.exports = router;
