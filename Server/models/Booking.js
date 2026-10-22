import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    persons: {
      type: Number,
      required: [true, "Number of persons is required"],
      min: [1, "Must book for at least 1 person"],
    },
    travelDate: {
      type: Date,
      required: [true, "Travel date is required"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    contactInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      message: { type: String, default: "" },
    },
  },
  // timestamps: true handles createdAt + updatedAt automatically
  { timestamps: true },
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
