const Note = require("../models/note.model");
const mongoose = require("mongoose");
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
   const { notes } = req.body;

if (!notes || !Array.isArray(notes) || notes.length === 0) {
  return res.status(400).json({
    success: false,
    message: "notes array is required and cannot be empty",
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

// GET /api/notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      count: notes.length,
      data: notes
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    // ❌ Invalid ObjectId check (VERY IMPORTANT)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null
      });
    }

    const note = await Note.findById(id);

    // ❌ Not found
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    // ✅ Success
    res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

exports.replaceNote = async (req, res) => {
  try {
    const { id } = req.params;

    // ❌ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null
      });
    }

    // ❌ Validate required fields (FULL replace means all required fields must be present)
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null
      });
    }

    // ✅ Full replace
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, category, isPinned },
      {
        new: true,
        overwrite: true,      // 🔥 THIS MAKES IT FULL REPLACE
        runValidators: true
      }
    );

    // ❌ Not found
    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    // ✅ Success
    res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: updatedNote
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

// PATCH /api/notes/:id — Partial update
exports.partialUpdateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null
      });
    }

    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
        data: null
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

// DELETE /api/notes/:id — Delete single
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null
      });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: deletedNote
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

// DELETE /api/notes/bulk — Delete bulk
exports.deleteBulkNotes = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "ids array is required and cannot be empty",
        data: null
      });
    }

    const result = await Note.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} note(s) deleted successfully`,
      data: { deletedCount: result.deletedCount }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};