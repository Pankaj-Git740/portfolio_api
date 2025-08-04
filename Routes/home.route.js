const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/upload");
const homeController = require("../Controllers/home.controller");

router.post("/", upload.single("image"), homeController.createOrUpdateHome);


router.get("/", homeController.getHome);

module.exports = router;
