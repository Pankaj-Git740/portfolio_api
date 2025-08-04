const express = require("express");
const router = express.Router();
const aboutController = require("../Controllers/about.controller");

router.post("/", aboutController.createOrUpdateAbout);

router.get("/", aboutController.getAbout);

module.exports = router;
