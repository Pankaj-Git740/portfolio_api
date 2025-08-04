const aboutRouter = require("./about.route");
const eduRouter = require("./edu.route");
const experienceRouter = require("./experience.route");
const homeRouter = require("./home.route");
const projectRouter = require("./project.route");
const serviceRouter = require("./services.route");
const skillRouter = require("./skills.route");
const userRouter = require("./user.route");

const router = require("express").Router();

router.use("/about", aboutRouter);
router.use("/edu", eduRouter);
router.use("/experience", experienceRouter);
router.use("/home", homeRouter);
router.use("/project", projectRouter);
router.use("/service", serviceRouter);
router.use("/skill", skillRouter);
router.use("/user", userRouter);

module.exports = router;
