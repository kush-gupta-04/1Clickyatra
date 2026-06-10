import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authStart,
  authSuccess,
  authFailure,
} from "../store/slices/authSlice.js";
import {
  Mail,
  Lock,
  LogIn,
  ArrowRight,
  Eye,
  EyeOff,
  Compass,
} from "lucide-react";
import API from "../api/axios.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  // Auto-populate email if saved
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter all fields");
      return;
    }

    dispatch(authStart());
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data.success) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        dispatch(
          authSuccess({
            user: res.data.data,
            token: res.data.data.token,
          }),
        );
        if (res.data.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Login failed. Invalid email or password.";
      dispatch(authFailure(message));
      setErrorMsg(message);
    }
  };

  const handleGoogleSignIn = () => {
    // Simulated Google authentication for UI fidelity
    dispatch(authStart());
    setTimeout(() => {
      // Simulate successful login of a user
      dispatch(
        authSuccess({
          user: {
            id: "google-user-id",
            name: "Jane Smith",
            email: "jane.smith@gmail.com",
            role: "user",
            wishlist: [],
          },
          token: "simulated-google-token",
        }),
      );
      navigate("/dashboard");
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-stretch">
      {/* Left side: Scenic Travel Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200"
          alt="Beautiful Scenic Travel Destination"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/95 via-brand-dark/40 to-transparent"></div>
        <div className="relative z-10 px-12 text-left text-white max-w-lg space-y-6">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Compass className="h-8 w-8 text-primary-light" />
            <span className="font-serif text-2xl font-extrabold tracking-tight">
              1Click<span className="text-primary-light">Travel</span>
            </span>
          </Link>
          <blockquote className="font-serif text-3xl font-bold leading-tight">
            “Travel is the only thing you buy that makes you richer.”
          </blockquote>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            Join thousands of travelers choosing 1ClickTravel to plan,
            customize, and book vacations across over 50 countries seamlessly.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2  flex items-center justify-center px-6 py-30 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Access your personalized itineraries and dashboard settings.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold rounded-md text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-md py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-primary hover:text-primary-dark hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-md py-3 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4.5 w-4.5 text-primary border-slate-300 rounded focus:ring-primary focus:ring-opacity-25"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-xs text-slate-600 font-semibold select-none cursor-pointer"
              >
                Remember my email
              </label>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-md transition-colors text-xs uppercase tracking-wider shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{loading ? "Signing In..." : "Continue"}</span>
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase">
              OR
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-md transition-colors text-xs uppercase tracking-wider flex items-center justify-center space-x-3 cursor-pointer shadow-sm"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.7 12.3c0-.8-.1-1.7-.2-2.5H12v4.8h6.6c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.6-5.2 3.6-9.1z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3.1c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5H1.2v3.2C3.2 21.4 7.3 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.2 14.2c-.2-.7-.4-1.4-.4-2.2s.2-1.5.4-2.2V6.6H1.2C.4 8.2 0 10 0 12s.4 3.8 1.2 5.4l4-3.2z"
              />
              <path
                fill="#EA4335"
                d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.3 0 3.2 2.6 1.2 6.6l4 3.2c1-2.9 3.7-5 6.8-5z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="text-center text-xs text-slate-500 font-medium">
            <span>Don't have an account? </span>
            <Link
              to="/register"
              className="text-primary hover:underline font-bold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
