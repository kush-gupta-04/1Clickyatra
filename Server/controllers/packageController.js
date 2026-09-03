import Package from "../models/Package.js";
import { asyncHandler } from "../middleware/error.js";
import { uploadImage, uploadImages } from "../utils/fileUpload.js";

// @desc    Get all packages with filtering, searching, sorting and pagination
// @route   GET /api/packages
// @access  Public
export const getPackages = asyncHandler(async (req, res) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude from filtering
  const removeFields = ["select", "sort", "page", "limit", "search"];
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`,
  );

  // Find resource
  let parsedQuery = JSON.parse(queryStr);

  // Apply search keyword filter
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, "i");
    parsedQuery.$or = [
      { title: searchRegex },
      { destination: searchRegex },
      { category: searchRegex },
    ];
  }

  // Price filter handling
  if (req.query.minPrice || req.query.maxPrice) {
    parsedQuery.price = {};
    if (req.query.minPrice) parsedQuery.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) parsedQuery.price.$lte = Number(req.query.maxPrice);
  }

  // Duration filter (e.g. number of days or search term)
  if (req.query.duration) {
    parsedQuery.duration = new RegExp(req.query.duration, "i");
  }

  // Categories (e.g. Honeymoon, Luxury)
  if (req.query.category) {
    parsedQuery.category = req.query.category;
  }

  // Featured check
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

  // Executing query
  const packages = await query;

  // Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
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
// @access  Public
export const getPackageBySlug = asyncHandler(async (req, res) => {
  const travelPackage = await Package.findOne({ slug: req.params.slug });

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
  // Parse JSON fields from multi-part form body if sent as strings
  const body = { ...req.body };

  if (typeof body.inclusions === "string")
    body.inclusions = JSON.parse(body.inclusions);
  if (typeof body.exclusions === "string")
    body.exclusions = JSON.parse(body.exclusions);
  if (typeof body.itinerary === "string")
    body.itinerary = JSON.parse(body.itinerary);
  if (typeof body.seo === "string") body.seo = JSON.parse(body.seo);

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
  let travelPackage = await Package.findById(req.params.id);

  if (!travelPackage) {
    res.status(404);
    throw new Error("Package not found");
  }

  const body = { ...req.body };

  // Parse JSON fields if they are stringified
  if (typeof body.inclusions === "string")
    body.inclusions = JSON.parse(body.inclusions);
  if (typeof body.exclusions === "string")
    body.exclusions = JSON.parse(body.exclusions);
  if (typeof body.itinerary === "string")
    body.itinerary = JSON.parse(body.itinerary);
  if (typeof body.seo === "string") body.seo = JSON.parse(body.seo);

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
      // If client wants to append images instead of overwrite:
      if (req.body.appendImages === "true") {
        body.images = [...travelPackage.images, ...newImages];
      } else {
        body.images = newImages;
      }
    }
  }

  travelPackage = await Package.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });

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

  // Recalculate average ratings
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
