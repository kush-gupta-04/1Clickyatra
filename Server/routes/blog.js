import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect, adminOnly } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

router.post("/", protect, adminOnly, upload.single("thumbnail"), createBlog);
router.put("/:id", protect, adminOnly, upload.single("thumbnail"), updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

export default router;
