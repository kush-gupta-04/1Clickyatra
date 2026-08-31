import Booking from "../models/Booking.js";
import Package from "../models/Package.js";
import { asyncHandler } from "../middleware/error.js";

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = asyncHandler(async (req, res) => {
  const { packageId, persons, travelDate, contactInfo } = req.body;

  if (!packageId || !persons || !travelDate || !contactInfo) {
    res.status(400);
    throw new Error("Please fill all booking fields");
  }

  const travelPackage = await Package.findById(packageId);
  if (!travelPackage) {
    res.status(404);
    throw new Error("Package not found");
  }

  const booking = await Booking.create({
    user: req.user._id,
    package: packageId,
    persons: Number(persons),
    travelDate,
    contactInfo,
  });

  res.status(201).json({
    success: true,
    data: booking,
  });
});

// @desc    Get logged in user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "package",
      select: "title slug destination price discountedPrice duration thumbnail",
    })
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
    .populate({
      path: "package",
      select: "title slug price destination duration thumbnail",
    })
    .populate({
      path: "user",
      select: "name email phone",
    })
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

// @desc    Update booking status or payment status (Admin only)
// @route   PUT /api/bookings/:id
// @access  Private/Admin
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  // Update status or paymentStatus if sent in body
  if (req.body.status) booking.status = req.body.status;
  if (req.body.paymentStatus) booking.paymentStatus = req.body.paymentStatus;

  const updatedBooking = await booking.save();

  res.status(200).json({
    success: true,
    data: updatedBooking,
  });
});
