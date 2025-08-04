const express = require("express");
const router = express.Router();
const projectController = require("../Controllers/project.controller");
const upload = require("../Middlewares/upload");

router.post("/", upload.array("images", 5), projectController.createProject);

router.get("/", projectController.getAllProjects);

module.exports = router;
