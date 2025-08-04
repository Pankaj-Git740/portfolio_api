const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/upload");
const skillController = require("../Controllers/skills.controller");

router.post("/", upload.single("image"), skillController.createSkill);

router.get("/", skillController.getSkills);

module.exports = router;
