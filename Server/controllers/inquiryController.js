import Inquiry from "../models/Inquiry.js";
import Package from "../models/Package.js";
import { asyncHandler } from "../middleware/error.js";

// @desc    Submit a new inquiry
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = asyncHandler(async (req, res) => {
  const { packageId, name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // Validate package if present
  if (packageId) {
    const travelPackage = await Package.findById(packageId);
    if (!travelPackage) {
      res.status(404);
      throw new Error("Package not found");
    }
  }

  const inquiry = await Inquiry.create({
    package: packageId || null,
    name,
    email,
    phone,
    message,
  });

  res.status(201).json({
    success: true,
    data: inquiry,
  });
});

// @desc    Get all inquiries (Admin only)
// @route   GET /api/inquiries
// @access  Private/Admin
export const getInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find({})
    .populate({
      path: "package",
      select: "title slug destination duration thumbnail",
    })
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: inquiries.length,
    data: inquiries,
  });
});

// @desc    Update inquiry status (Admin only)
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
export const updateInquiryStatus = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    res.status(404);
    throw new Error("Inquiry not found");
  }

  if (req.body.status) {
    inquiry.status = req.body.status;
  }

  const updatedInquiry = await inquiry.save();

  res.status(200).json({
    success: true,
    data: updatedInquiry,
  });
});
