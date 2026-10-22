import Blog from "../models/Blog.js";
import { asyncHandler } from "../middleware/error.js";
import { uploadImage } from "../utils/fileUpload.js";

// @desc    Get all blogs with filtering & search
// @route   GET /api/blogs
// @access  Public
export const getBlogs = asyncHandler(async (req, res) => {
  const { search, category, tag } = req.query;
  const queryObj = {};

  if (search) {
    // Escape user input to prevent ReDoS
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    queryObj.$or = [
      { title: new RegExp(escaped, "i") },
      { content: new RegExp(escaped, "i") },
    ];
  }

  if (category) {
    queryObj.category = category;
  }

  if (tag) {
    queryObj.tags = tag;
  }

  const blogs = await Blog.find(queryObj).sort("-createdAt");

  res.status(200).json({
    success: true,
    count: blogs.length,
    data: blogs,
  });
});

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });

  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = asyncHandler(async (req, res) => {
  const body = { ...req.body };

  // Safely parse JSON/Arrays if sent as string from multipart form
  try {
    if (typeof body.tags === "string") body.tags = JSON.parse(body.tags);
    if (typeof body.seo === "string") body.seo = JSON.parse(body.seo);
  } catch {
    res.status(400);
    throw new Error("Invalid JSON in form fields (tags, seo)");
  }

  // Handle file upload
  if (req.file) {
    body.thumbnail = await uploadImage(req.file, "blog_thumbnails");
  }

  const blog = await Blog.create(body);

  res.status(201).json({
    success: true,
    data: blog,
  });
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }

  const body = { ...req.body };

  // Safely parse JSON/Arrays if sent as string from multipart form
  try {
    if (typeof body.tags === "string") body.tags = JSON.parse(body.tags);
    if (typeof body.seo === "string") body.seo = JSON.parse(body.seo);
  } catch {
    res.status(400);
    throw new Error("Invalid JSON in form fields (tags, seo)");
  }

  if (req.file) {
    body.thumbnail = await uploadImage(req.file, "blog_thumbnails");
  }

  // Use .set() + .save() so the pre-save slug hook fires on title change
  blog.set(body);
  const updatedBlog = await blog.save();

  res.status(200).json({
    success: true,
    data: updatedBlog,
  });
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: "Blog post deleted successfully",
  });
});
