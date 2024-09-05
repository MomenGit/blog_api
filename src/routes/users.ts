import express, { Router } from "express";
const usersRouter: Router = express.Router();

/* GET users listing. */
usersRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

export default usersRouter;
