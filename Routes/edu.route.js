const express = require("express");
const router = express.Router();
const educationController = require("../Controllers/edu.controller");

router.post("/", educationController.createOrUpdateEducation);

router.get("/", educationController.getAllEducation);

router.delete("/:id", educationController.deleteEducation);

module.exports = router;
