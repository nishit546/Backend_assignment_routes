const Note = require("../models/note.model");

exports.createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null
      });
    }

    const note = await Note.create({ title, content, category, isPinned });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

exports.createBulkNotes = async (req, res) => {
  try {
    const notes = req.body;
    
    if (!Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "An array of notes is required",
        data: null
      });
    }

    const createdNotes = await Note.insertMany(notes);

    res.status(201).json({
      success: true,
      message: "Bulk notes created successfully",
      data: createdNotes
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};