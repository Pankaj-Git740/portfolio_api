const express = require("express");
const {
  dummy,
  create,
  login,
  findMany,
} = require("../Controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/create", create);

userRouter.post("/login", login);

userRouter.get("/users", findMany);

module.exports = userRouter;
