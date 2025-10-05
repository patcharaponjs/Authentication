import express from "express";

import { register, login, refresh } from "../controllers/authController.js";


const router = express.Router();
router.post("/", async (req, res) => {
  res.sendStatus(404);
});
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
export default router;