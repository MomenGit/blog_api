import express, { Router } from "express";

const indexRouter: Router = express.Router();
/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  res.json({ message: "Hello World" });
});

export default indexRouter;
