import express from "express";
import {
  saveUserFormResponse,
  getGroupLink,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/saveUserFormResponse", saveUserFormResponse);
router.get("/groupLink/:formID/:formGroupID", getGroupLink);

export default router;
