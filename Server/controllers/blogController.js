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
    queryObj.$or = [
      { title: new RegExp(search, "i") },
      { content: new RegExp(search, "i") },
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

  // Parse JSON/Arrays if sent as string
  if (typeof body.tags === "string") {
    body.tags = JSON.parse(body.tags);
  }
  if (typeof body.seo === "string") {
    body.seo = JSON.parse(body.seo);
  }

  // Handle file upload
  let thumbnail = "";
  if (req.file) {
    thumbnail = await uploadImage(req.file, "blog_thumbnails");
  }
  body.thumbnail = thumbnail || body.thumbnail;

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
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog post not found");
  }

  const body = { ...req.body };

  if (typeof body.tags === "string") {
    body.tags = JSON.parse(body.tags);
  }
  if (typeof body.seo === "string") {
    body.seo = JSON.parse(body.seo);
  }

  if (req.file) {
    body.thumbnail = await uploadImage(req.file, "blog_thumbnails");
  }

  blog = await Blog.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: blog,
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
