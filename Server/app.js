import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import cookieParser from "cookie-parser";
// import rateLimit from "express-rate-limit";
// import path from "path";
// import { fileURLToPath } from "url";

import { errorHandler } from "./middleware/error.js";

// Import Routes
import authRoutes from "./routes/auth.js";
import inquiryRoutes from "./routes/inquiries.js";
// import packageRoutes from "./routes/packages.js";
// import bookingRoutes from "./routes/bookings.js";
// import blogRoutes from "./routes/blogs.js";
// import inquiryRoutes from "./routes/inquiries.js";
// import testimonialRoutes from "./routes/testimonials.js";
// import adminRoutes from "./routes/admin.js";

const app = express();

// // Security Headers
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false, // Allows loading local images in frontend
//   }),
// );

// // CORS configuration
// const corsOptions = {
//   origin: process.env.CLIENT_URL || "http://localhost:5173",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };
// app.use(cors(corsOptions));

// // Body parsers & cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 mins
//   max: 200, // limit each IP to 200 requests per windowMs
//   message: "Too many requests from this IP, please try again later",
// });
// app.use("/api", limiter);

// // Serve uploads folder statically for local file uploads
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);
// app.use("/api/packages", packageRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/inquiries", inquiryRoutes);
// app.use("/api/testimonials", testimonialRoutes);
// app.use("/api/admin", adminRoutes);

// // Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.status(200).json({ status: "OK", message: "Server is healthy" });
// });

app.use(errorHandler);

export default app;
