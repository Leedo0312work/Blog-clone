const express = require("express");
const router = express.Router();

//Route to course
const courseController = require("../app/controllers/CourseController");

router.get("/create", courseController.create);
router.post("/store", courseController.store);
router.get("/:slug", courseController.show);

module.exports = router;
