import React from "react";
import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Compass,
  ShieldCheck,
  Award,
  Star,
  ArrowRight,
  ChevronDown,
  Check,
} from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");

  const destinations = [
    {
      name: "Maldives",
      image:
        "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&q=80&w=400",
      count: 12,
    },
    {
      name: "Switzerland",
      image:
        "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=400",
      count: 8,
    },
    {
      name: "Indonesia",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400",
      count: 15,
    },
    {
      name: "Tanzania",
      image:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=400",
      count: 6,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    let queryParams = [];
    if (searchQuery) queryParams.push(`search=${searchQuery}`);
    if (categoryFilter) queryParams.push(`category=${categoryFilter}`);
    if (durationFilter) queryParams.push(`duration=${durationFilter}`);

    navigate(
      `/packages${queryParams.length > 0 ? `?${queryParams.join("&")}` : ""}`,
    );
  };

  return (
    <div className="relative w-full bg-white text-slate-800">
      {/* 1. Clean Modern Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center bg-slate-900 overflow-hidden pt-16">
        {/* Scenic Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1920"
            alt="Scenic Travel Hero Background"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center pt-8">
          <span className="text-primary-light text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 bg-primary/10 px-4.5 py-1.5 rounded-full border border-primary/20">
            Smart Vacation Planner • 1ClickTravel
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl">
            Book Your Next <br className="hidden sm:inline" />
            <span className="text-primary-light">Dream Escape</span> In One
            Click
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mb-12 font-medium leading-relaxed">
            Discover curated vacation packages combining high-quality resort
            stays, local experiences, and fully customizable itineraries.
          </p>

          {/* Airbnb-style Search Widget */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-4xl p-3 bg-white rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-4 gap-3 border border-slate-100"
          >
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md py-3 pl-10 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Category Select */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md py-3 px-4 text-xs font-semibold text-slate-600 focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="">Category (All)</option>
                <option value="Luxury">Luxury</option>
                <option value="Adventure">Adventure</option>
                <option value="Family">Family</option>
                <option value="Wildlife">Wildlife</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-4 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Duration Select */}
            <div className="relative">
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md py-3 px-4 text-xs font-semibold text-slate-600 focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="">Duration (All)</option>
                <option value="5 Days">5 Days</option>
                <option value="6 Days">6 Days</option>
                <option value="7 Days">7 Days</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-4 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 font-bold rounded-md transition-colors flex items-center justify-center space-x-2 text-xs uppercase tracking-wider cursor-pointer shadow-sm"
            >
              <span>Search Tours</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 2. Popular Destinations */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary text-xs uppercase tracking-widest font-bold">
              Dream Escapes
            </span>
            <h2 className="font-serif text-3xl font-extrabold mt-1 text-slate-800">
              Popular Destinations
            </h2>
            {
              <div className="w-12 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
            }
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/packages?search=${dest.name}`)}
                className="group relative rounded-lg overflow-hidden h-64 cursor-pointer border border-slate-200/60 hover:border-slate-300 transition-all duration-200 shadow-sm"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"></div>
                <div className="absolute bottom-5 left-5">
                  <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-primary-light mt-0.5 font-semibold">
                    {dest.count} Vacation Tours
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
