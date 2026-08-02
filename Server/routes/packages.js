import express from "express";
import {
  getPackages,
  getPackageBySlug,
  createPackage,
  updatePackage,
  deletePackage,
  addPackageReview,
} from "../controllers/packageController.js";
import { protect, adminOnly } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", getPackages);
router.get("/:slug", getPackageBySlug);

// User review submit
router.post("/:id/reviews", protect, addPackageReview);

// Admin-only CRUD operations
router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 12 },
  ]),
  createPackage,
);

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 12 },
  ]),
  updatePackage,
);

router.delete("/:id", protect, adminOnly, deletePackage);

export default router;
