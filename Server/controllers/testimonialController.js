import Testimonial from "../models/Testimonial.js";
import { asyncHandler } from "../middleware/error.js";
import { uploadImage } from "../utils/fileUpload.js";

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({}).sort("-createdAt");

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials,
  });
});

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
export const createTestimonial = asyncHandler(async (req, res) => {
  const { customerName, message, rating } = req.body;

  if (!customerName || !message || !rating) {
    res.status(400);
    throw new Error("Please fill in all testimonial fields");
  }

  let imageUrl = "";
  if (req.file) {
    imageUrl = await uploadImage(req.file, "testimonials");
  }

  const testimonial = await Testimonial.create({
    customerName,
    message,
    rating: Number(rating),
    image: imageUrl || req.body.image || "",
  });

  res.status(201).json({
    success: true,
    data: testimonial,
  });
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  await testimonial.deleteOne();

  res.status(200).json({
    success: true,
    message: "Testimonial deleted successfully",
  });
});
