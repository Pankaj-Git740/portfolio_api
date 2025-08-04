const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/upload");
const servicesController = require("../Controllers/services.controller");

router.post("/", upload.single("image"), servicesController.createService);
router.get("/", servicesController.getAllServices);
router.delete("/:id", servicesController.deleteService);

module.exports = router;
