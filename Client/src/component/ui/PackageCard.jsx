import React from "react";

const PackageCard = ({ pkg }) => {
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
    </div>
  );
};

export default PackageCard;
