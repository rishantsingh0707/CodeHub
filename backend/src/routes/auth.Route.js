import express from "express";
import passport from "passport";
import { googleCallback,registerUser,loginUser } from "../controller/auth.controller.js";

const router = express.Router();

// start Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], }));

// Google callback
router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);

// User registration via normal signup
router.post("/signup",registerUser)

// User login via normal login
router.post("/login",loginUser)

export default router;
