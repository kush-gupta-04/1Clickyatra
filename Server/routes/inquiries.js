import express from "express";
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
} from "../controllers/inquiryController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createInquiry);
router.get("/", protect, adminOnly, getInquiries);
router.put("/:id", protect, adminOnly, updateInquiryStatus);

export default router;
