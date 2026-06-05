import React from "react";
import { useNavigate, Link } from "react-router-dom";
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

const Register = () => {
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
    </div>
  );
};

export default Register;
