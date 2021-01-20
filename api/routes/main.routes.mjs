"use strict";

import express from "express";
import MainController from "../controllers/main.controller.mjs";

const router = express.Router();

router.post("/items", MainController.getItems);

export default router;