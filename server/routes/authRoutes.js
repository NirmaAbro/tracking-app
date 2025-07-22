import express from "express";
import { RegisterUser, LoginUser } from "../controllers/authController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/verify", authenticate, (req, res) => {
  res.json({ id: req.user.id, role: req.user.role });
});

export default router;
