import mongoose from "mongoose";
import slugify from "slugify";

const itinerarySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  meals: {
    type: [String],
    default: [],
  },
});

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Package title is required"],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  destination: {
    type: String,
    required: [true, "Destination is required"],
    trim: true,
  },
  duration: {
    type: String, // e.g. "5 Days / 4 Nights"
    required: [true, "Duration is required"],
  },
  category: {
    type: String, // e.g. Honeymoon, Adventure, Luxury, Family, Solo
    required: [true, "Category is required"],
    trim: true,
  },
  overview: {
    type: String,
    required: [true, "Overview is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  discountedPrice: {
    type: Number,
  },
  inclusions: {
    type: [String],
    default: [],
  },
  exclusions: {
    type: [String],
    default: [],
  },
  itinerary: [itinerarySchema],
  images: {
    type: [String],
    default: [],
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required"],
  },
  hotelDetails: {
    type: String,
    default: "",
  },
  transport: {
    type: String,
    default: "",
  },
  groupSize: {
    type: String,
    default: "Any",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  ratings: {
    type: Number,
    default: 5,
  },
  reviews: [reviewSchema],
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
packageSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Package = mongoose.model("Package", packageSchema);
export default Package;
