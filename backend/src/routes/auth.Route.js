import express from "express";
import passport from "passport";
import { googleCallback } from "../controller/auth.controller.js";

const router = express.Router();

// start Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

export default router;
