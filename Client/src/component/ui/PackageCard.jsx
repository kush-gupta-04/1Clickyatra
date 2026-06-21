import { Link, useNavigate } from "react-router-dom";
import { Heart, Star, Calendar, MapPin, Users } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist } from "../../store/slices/authSlice.js";
import API from "../../api/axios.js";
import { useState } from "react";

const PackageCard = ({ pkg }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wishing, setWishing] = useState(false);

  const isWishlisted = user?.wishlist?.some(
    (id) => id === pkg._id || id._id === pkg._id,
  );

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setWishing(true);
    try {
      const res = await API.post("/auth/wishlist/toggle", {
        packageId: pkg._id,
      });
      if (res.data.success) {
        dispatch(setWishlist(res.data.wishlist));
      }
    } catch (err) {
      console.error("Error toggling wishlist", err);
    } finally {
      setWishing(false);
    }
  };

  const getThumbnailSrc = (url) => {
    if (!url) return "";
    return url.startsWith("/uploads") ? `http://localhost:5001${url}` : url;
  };
  return (
    <div className="group relative bg-white border border-slate-200/80 hover:border-slate-300 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-soft flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-[4/3] w-full bg-slate-100">
        <img
          src={getThumbnailSrc(pkg.thumbnail)}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          disabled={wishing}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full border border-slate-200/50 hover:bg-white text-slate-500 hover:text-red-500 hover:scale-105 active:scale-95 transition-all duration-150 z-10 cursor-pointer shadow-sm"
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""} ${wishing ? "animate-pulse" : ""}`}
          />
        </button>

        {/* Category Tag */}
        <span className="absolute bottom-3 left-3 text-[10px] font-bold tracking-wider uppercase bg-primary text-white px-2.5 py-0.5 rounded shadow-sm">
          {pkg.category}
        </span>

        {/* Discount Tag */}
        {pkg.discountedPrice && (
          <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase bg-brand-accent text-white px-2.5 py-0.5 rounded shadow-sm">
            Save ${pkg.price - pkg.discountedPrice}
          </span>
        )}
      </div>

      {/* Info Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Location & Star Ratings */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="truncate max-w-[155px] font-medium">
              {pkg.destination}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-slate-700 font-semibold bg-slate-100 px-2 py-0.5 rounded">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 stroke-none" />
            <span>{pkg.ratings?.toFixed(1) || "5.0"}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-base font-bold text-slate-800 group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-3">
          <Link to={`/packages/${pkg.slug}`}>{pkg.title}</Link>
        </h3>

        {/* Attributes Grid */}
        <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-500 border-t border-slate-100 pt-3 mb-4">
          <div className="flex items-center space-x-1.5 font-medium">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center space-x-1.5 font-medium">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate">Max: {pkg.groupSize} Guests</span>
          </div>
        </div>

        {/* Pricing & Call To Action */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
              Price per person
            </p>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-lg font-extrabold text-slate-800">
                ${pkg.discountedPrice || pkg.price}
              </span>
              {pkg.discountedPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${pkg.price}
                </span>
              )}
            </div>
          </div>

          <Link
            to={`/packages/${pkg.slug}`}
            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors duration-150"
          >
            Explore Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
