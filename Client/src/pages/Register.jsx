import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authFailure, authStart, authSuccess } from "../store/slices/authSlice";
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
  Compass,
} from "lucide-react";
import API from "../api/axios.js";
import GoogleAuthButton from "../component/ui/GoogleAuthButton.jsx";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

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
    setErrorMsg("");

    if (!name || !email || !password) {
      setErrorMsg("Please enter all required fields");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setErrorMsg("Please agree to the Terms & Conditions");
      return;
    }

    dispatch(authStart());
    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        phone,
        password,
      });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Registration failed. Try a different email.",
        );
      }

      const registeredUser = response.data.data;
      dispatch(
        authSuccess({
          user: registeredUser,
          token: registeredUser.token,
        }),
      );
      navigate(registeredUser.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Registration failed. Try a different email.";
      dispatch(authFailure(message));
      setErrorMsg(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-stretch">
      {/* Left side: Scenic Travel Image */}

      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200"
          alt="Beautiful Scenic Coastline Travel"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/95 via-brand-dark/40 to-transparent"></div>
        <div className="relative z-10 px-12 text-left text-white max-w-lg space-y-6">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Compass className="h-8 w-8 text-primary-light" />
            <span className="font-serif text-2xl font-extrabold tracking-tight">
              1Click<span className="text-primary-light">yatra</span>
            </span>
          </Link>
          <blockquote className="font-serif text-3xl font-bold leading-tight">
            “To travel is to live.”
          </blockquote>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            Register your profile today to save custom holiday wishlist boards,
            request callback reservations, and secure premium tour passes.
          </p>
        </div>
      </div>

      {/* Right side: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-30 bg-white">
        <div className="w-full max-w-md space-y-7">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Create traveler profile
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Start building your custom itineraries instantly.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold rounded-md text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-md py-2.5 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Retype password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start py-1">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4.5 w-4.5 text-primary border-slate-300 rounded focus:ring-primary focus:ring-opacity-25 mt-0.5"
              />
              <label
                htmlFor="agree-terms"
                className="ml-2.5 text-xs text-slate-500 font-semibold select-none leading-relaxed cursor-pointer"
              >
                I agree to the 1ClickTravel{" "}
                <a
                  href="/terms"
                  className="text-primary hover:underline font-bold"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-primary hover:underline font-bold"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-md transition-colors text-xs uppercase tracking-wider shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{loading ? "Creating Profile..." : "Sign Up"}</span>
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase">
              OR
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <GoogleAuthButton
            text="signup_with"
            onError={(message) => setErrorMsg(message)}
          />

          <div className="text-center text-xs text-slate-500 font-medium">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-primary hover:underline font-bold"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
