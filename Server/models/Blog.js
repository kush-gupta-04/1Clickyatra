const mongoose = require("mongoose");
const slug = require("slugify");

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
blogSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
