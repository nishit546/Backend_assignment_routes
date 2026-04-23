const express = require("express");
const router = express.Router();

const controller = require("../controllers/note.controller");

router.post("/", controller.createNote);

// BULK FIRST
router.post("/bulk", controller.createBulkNotes);
router.get("/", controller.getAllNotes);
router.get("/category/:category", controller.getNotesByCategory);
router.get("/status/:isPinned", controller.getNotesByStatus);
router.get("/filter", controller.filterNotes);
router.get("/filter/pinned", controller.filterPinnedNotes);
router.get("/filter/category", controller.filterByCategory);
router.get("/filter/date-range", controller.filterByDateRange);
router.get("/paginate", controller.paginateNotes);
router.get("/paginate/category/:category", controller.paginateByCategory);
router.get("/sort", controller.sortNotes);
router.get("/sort/pinned", controller.sortPinnedNotes);
router.get("/:id", controller.getNoteById);
router.get("/:id/summary", controller.getNoteSummary);
router.put("/:id", controller.replaceNote);
router.patch("/:id", controller.partialUpdateNote);
router.delete("/bulk", controller.deleteBulkNotes);
router.delete("/:id", controller.deleteNote);

module.exports = router;
