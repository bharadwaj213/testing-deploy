import express from "express";
import {
  test,
  getAllFormTitlesIDs,
  createNewForm,
  deleteFormID,
  getFormData,
  updateForm,
  createNewFormGroup,
  getFormIsAcceptingResponses,
  setFormIsAcceptingResponses,
  getSummaryDashboardData,
} from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/getAllFormTitlesIDs", getAllFormTitlesIDs);

router.get("/test", test);
router.delete("/deleteForm/:id", deleteFormID);
router.get("/getFormData/:id", getFormData);
router.put("/updateForm", updateForm);
router.get("/createNewFormGroup/:id", createNewFormGroup);
router.get("/getFormIsAcceptingResponses/:id", getFormIsAcceptingResponses);
router.post("/setIsAcceptingResponses", setFormIsAcceptingResponses);
router.get("/getSummaryDashboardData/:id", getSummaryDashboardData);
router.get("/createNewForm", createNewForm);
export default router;

/* iimport express from "express";
import { getFormData } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getFormData/:id", getFormData); */
