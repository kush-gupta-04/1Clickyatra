import Package from "../models/Package.js";
import { asyncHandler } from "../middleware/error.js";
import { uploadImage, uploadImages } from "../utils/fileUpload.js";

// Helper: safely parse stringified JSON fields from multipart form bodies
const parseBodyFields = (body, res) => {
  try {
    if (typeof body.inclusions === "string")
      body.inclusions = JSON.parse(body.inclusions);
    if (typeof body.exclusions === "string")
      body.exclusions = JSON.parse(body.exclusions);
    if (typeof body.itinerary === "string")
      body.itinerary = JSON.parse(body.itinerary);
    if (typeof body.seo === "string") body.seo = JSON.parse(body.seo);
  } catch {
    res.status(400);
    throw new Error(
      "Invalid JSON in form fields (inclusions, exclusions, itinerary, seo)",
    );
  }
  if (body.discountedPrice === "") body.discountedPrice = null;
  return body;
};

// @desc    Get all packages with filtering, searching, sorting and pagination
// @route   GET /api/packages
// @access  Public
export const getPackages = asyncHandler(async (req, res) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude from filtering
  const removeFields = [
    "select",
    "sort",
    "page",
    "limit",
    "search",
    "minPrice",
    "maxPrice",
    "duration",
    "category",
    "featured",
  ];
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`,
  );

  let parsedQuery = JSON.parse(queryStr);

  // Apply search keyword filter — escape input to prevent ReDoS
  if (req.query.search) {
    const escaped = req.query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegex = new RegExp(escaped, "i");
    parsedQuery.$or = [
      { title: searchRegex },
      { destination: searchRegex },
      { category: searchRegex },
    ];
  }

  // Price filter
  if (req.query.minPrice || req.query.maxPrice) {
    parsedQuery.price = {};
    if (req.query.minPrice) parsedQuery.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) parsedQuery.price.$lte = Number(req.query.maxPrice);
  }

  // Duration filter
  if (req.query.duration) {
    const escapedDuration = req.query.duration.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );
    parsedQuery.duration = new RegExp(escapedDuration, "i");
  }

  // Category filter
  if (req.query.category) {
    parsedQuery.category = req.query.category;
  }

  // Featured filter
  if (req.query.featured) {
    parsedQuery.featured = req.query.featured === "true";
  }

  // Status check - non-admins can only see published packages
  if (!req.user || req.user.role !== "admin") {
    parsedQuery.status = "published";
  }

  query = Package.find(parsedQuery);

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Package.countDocuments(parsedQuery);

  query = query.skip(startIndex).limit(limit);

  const packages = await query;

  // Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  res.status(200).json({
    success: true,
    count: packages.length,
    total,
    pagination,
    data: packages,
  });
});

// @desc    Get single package by slug
// @route   GET /api/packages/:slug
// @access  Public (admins can preview drafts)
export const getPackageBySlug = asyncHandler(async (req, res) => {
  // Admins can preview draft packages; public users can only see published ones
  const statusFilter =
    req.user?.role === "admin" ? {} : { status: "published" };

  const travelPackage = await Package.findOne({
    slug: req.params.slug,
    ...statusFilter,
  });

  if (!travelPackage) {
    res.status(404);
    throw new Error("Package not found");
  }

  res.status(200).json({
    success: true,
    data: travelPackage,
  });
});

// @desc    Get all packages for admin management (with pagination)
// @route   GET /api/packages/admin
// @access  Private/Admin
export const getAdminPackages = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;

  const total = await Package.countDocuments();
  const packages = await Package.find()
    .sort("-createdAt")
    .skip(startIndex)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: packages.length,
    total,
    page,
    data: packages,
  });
});

// @desc    Get a package by ID for admin editing
// @route   GET /api/packages/admin/:id
// @access  Private/Admin
export const getAdminPackageById = asyncHandler(async (req, res) => {
  const travelPackage = await Package.findById(req.params.id);

  if (!travelPackage) {
    res.status(404);
    throw new Error("Package not found");
  }

  res.status(200).json({
    success: true,
    data: travelPackage,
  });
});

// @desc    Create a new package
// @route   POST /api/packages
// @access  Private/Admin
export const createPackage = asyncHandler(async (req, res) => {
  const body = parseBodyFields({ ...req.body }, res);

  // Handle image uploads
  let thumbnail = "";
  let images = [];

  if (req.files) {
    if (req.files.thumbnail && req.files.thumbnail[0]) {
      thumbnail = await uploadImage(
        req.files.thumbnail[0],
        "package_thumbnails",
      );
    }
    if (req.files.images) {
      images = await uploadImages(req.files.images, "package_gallery");
    }
  }

  body.thumbnail = thumbnail || body.thumbnail;
  body.images = images.length > 0 ? images : body.images || [];

  const travelPackage = await Package.create(body);

  res.status(201).json({
    success: true,
    data: travelPackage,
  });
});

// @desc    Update package details
// @route   PUT /api/packages/:id
// @access  Private/Admin
export const updatePackage = asyncHandler(async (req, res) => {
  const travelPackage = await Package.findById(req.params.id);

  if (!travelPackage) {
    res.status(404);
    throw new Error("Package not found");
  }

  const body = parseBodyFields({ ...req.body }, res);

  // Handle file uploads
  if (req.files) {
    if (req.files.thumbnail && req.files.thumbnail[0]) {
      body.thumbnail = await uploadImage(
        req.files.thumbnail[0],
        "package_thumbnails",
      );
    }
    if (req.files.images) {
      const newImages = await uploadImages(req.files.images, "package_gallery");
      // Append images if client requests it, otherwise overwrite
      body.images =
        req.body.appendImages === "true"
          ? [...travelPackage.images, ...newImages]
          : newImages;
    }
  }

  travelPackage.set(body);
  await travelPackage.save();

  res.status(200).json({
    success: true,
    data: travelPackage,
  });
});

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
export const deletePackage = asyncHandler(async (req, res) => {
  const travelPackage = await Package.findById(req.params.id);

  if (!travelPackage) {
    res.status(404);
    throw new Error("Package not found");
  }

  await travelPackage.deleteOne();

  res.status(200).json({
    success: true,
    message: "Package deleted successfully",
  });
});

// @desc    Submit a review for a package
// @route   POST /api/packages/:id/reviews
// @access  Private
export const addPackageReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const travelPackage = await Package.findById(req.params.id);
  if (!travelPackage) {
    res.status(404);
    throw new Error("Package not found");
  }

  // Check if user already reviewed
  const alreadyReviewed = travelPackage.reviews.find(
    (r) => r.user.toString() === req.user._id.toString(),
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Package already reviewed by you");
  }

  const review = {
    user: req.user._id,
    userName: req.user.name,
    rating: Number(rating),
    comment,
  };

  travelPackage.reviews.push(review);

  // Recalculate average rating
  travelPackage.ratings =
    travelPackage.reviews.reduce((acc, item) => item.rating + acc, 0) /
    travelPackage.reviews.length;

  await travelPackage.save();

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    data: travelPackage,
  });
});
