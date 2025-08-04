const express = require("express");
const router = express.Router();
const experienceController = require("../Controllers/experience.controller");

router.post("/", experienceController.createExperience);

router.get("/", experienceController.getAllExperiences);

router.delete("/:id", experienceController.deleteExperience);

module.exports = router;
