import User from "../models/User.js";
import Package from "../models/Package.js";
import generateToken from "../utils/generateToken.js";
import { asyncHandler } from "../middleware/error.js";
import { uploadImage } from "../utils/fileUpload.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create User (role defaults to 'user', unless there are no users, then first user can be admin)
  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role,
  });

  if (user) {
    const token = generateToken(res, user._id);
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        wishlist: user.wishlist,
        token,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // Find user and select password
  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.comparePassword(password))) {
    const token = generateToken(res, user._id);
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        wishlist: user.wishlist,
        token,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ success: true, message: "Logged out successfully" });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  if (user) {
    res.json({
      success: true,
      data: user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;

    // Handle avatar upload if provided
    if (req.file) {
      const avatarUrl = await uploadImage(req.file, "user_avatars");
      user.avatar = avatarUrl;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    // Populate wishlist for response
    await updatedUser.populate("wishlist");

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        wishlist: updatedUser.wishlist,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Toggle package wishlist
// @route   POST /api/auth/wishlist/toggle
// @access  Private
export const toggleWishlist = asyncHandler(async (req, res) => {
  const { packageId } = req.body;

  if (!packageId) {
    res.status(400);
    throw new Error("Package ID is required");
  }

  const travelPackage = await Package.findById(packageId);
  if (!travelPackage) {
    res.status(404);
    throw new Error("Package not found");
  }

  const user = await User.findById(req.user._id);
  const index = user.wishlist.indexOf(packageId);

  if (index > -1) {
    // Remove from wishlist
    user.wishlist.splice(index, 1);
    await user.save();
    res.json({
      success: true,
      message: "Removed from wishlist",
      wishlist: user.wishlist,
    });
  } else {
    // Add to wishlist
    user.wishlist.push(packageId);
    await user.save();
    res.json({
      success: true,
      message: "Added to wishlist",
      wishlist: user.wishlist,
    });
  }
});
