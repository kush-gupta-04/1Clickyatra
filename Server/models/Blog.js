import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  author: {
    type: String,
    default: "Admin",
  },
  seo: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: { type: String, default: "" },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate slug before saving
blogSchema.pre("save", function () {
  if (!this.isModified("title")) return;
  this.slug = slugify(this.title, { lower: true, strict: true });
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
