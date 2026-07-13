import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true,
  },
  image: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
