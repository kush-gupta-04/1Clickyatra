import React from "react";

const PackageDetails = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 text-slate-850">
      <Helmet>
        <title>{pkg.seo?.title || `${pkg.title} | 1ClickTravel`}</title>
        <meta
          name="description"
          content={pkg.seo?.description || pkg.overview}
        />
        <meta name="keywords" content={pkg.seo?.keywords} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Explore Tours", path: "/packages" },
            { name: pkg.title },
          ]}
        />

        {/* 1. Header Details */}
        <div className="mt-5 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-8 mb-10">
          <div className="space-y-2">
            <span className="text-primary text-xs uppercase tracking-widest font-bold bg-sky-50 border border-sky-100 rounded px-2.5 py-1 inline-block">
              {pkg.category} Package
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
              {pkg.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-500 font-semibold">
              <span className="flex items-center">
                <MapPin className="h-4 w-4 text-primary mr-1" />{" "}
                {pkg.destination}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 text-primary mr-1" />{" "}
                {pkg.duration}
              </span>
              <span className="flex items-center">
                <Users className="h-4 w-4 text-primary mr-1" /> {pkg.groupSize}{" "}
                Guests Max
              </span>
              {pkg.reviews?.length > 0 && (
                <span className="flex items-center text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 stroke-none mr-1" />
                  {pkg.ratings?.toFixed(1)} ({pkg.reviews.length} reviews)
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 md:mt-0 text-left md:text-right flex flex-col items-start md:items-end">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Starting from
            </p>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-800">
                ${pkg.discountedPrice || pkg.price}
              </span>
              {pkg.discountedPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${pkg.price}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold">
              Per Person (All Inclusive)
            </p>
          </div>
        </div>

        {/* 2. Gallery Carousels & Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative overflow-hidden rounded-lg border border-slate-200 aspect-[16/9] w-full bg-slate-100 shadow-sm">
              <img
                src={getImgUrl(selectedImage)}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gallery Thumbnails List */}
            {pkg.images && pkg.images.length > 0 && (
              <div className="flex space-x-3 overflow-x-auto pb-1.5">
                <button
                  onClick={() => setSelectedImage(pkg.thumbnail)}
                  className={`relative flex-shrink-0 h-16 w-24 rounded overflow-hidden border-2 cursor-pointer ${
                    selectedImage === pkg.thumbnail
                      ? "border-primary"
                      : "border-slate-200"
                  }`}
                >
                  <img
                    src={getImgUrl(pkg.thumbnail)}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
                {pkg.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative flex-shrink-0 h-16 w-24 rounded overflow-hidden border-2 cursor-pointer ${
                      selectedImage === img
                        ? "border-primary"
                        : "border-slate-200"
                    }`}
                  >
                    <img
                      src={getImgUrl(img)}
                      alt={`gallery-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Booking Box */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
                Book This Tour
              </h3>

              {bookingSuccess ? (
                <div className="bg-sky-50/50 border border-sky-100 p-5 rounded-md text-center space-y-3.5">
                  <Check className="h-10 w-10 text-primary mx-auto" />
                  <h4 className="font-serif font-bold text-slate-850">
                    Booking Inquiry Sent!
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    We received your package request. Our travel consultant desk
                    will review and contact you shortly.
                  </p>
                  <button
                    onClick={() => setBookingSuccess(false)}
                    className="text-xs text-primary font-bold hover:underline cursor-pointer"
                  >
                    Send another booking request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-md py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={bookingPersons}
                      onChange={(e) => setBookingPersons(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-md py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      placeholder="e.g. dietary constraints, bedding options..."
                      value={bookingMessage}
                      onChange={(e) => setBookingMessage(e.target.value)}
                      rows={2.5}
                      className="w-full bg-white border border-slate-200 rounded-md py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary resize-none"
                    ></textarea>
                  </div>

                  {bookingError && (
                    <p className="text-xs text-rose-500 font-semibold">
                      {bookingError}
                    </p>
                  )}

                  {isAuthenticated ? (
                    <button
                      type="submit"
                      disabled={bookingMutation.isPending}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-md transition-colors text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {bookingMutation.isPending
                          ? "Submitting..."
                          : "Request Callback"}
                      </span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-md transition-colors text-xs uppercase tracking-wider flex items-center justify-center shadow-sm"
                      >
                        Sign In to Book Tour
                      </Link>
                      <p className="text-[9px] text-slate-400 text-center font-semibold">
                        Sign in required to record booking
                      </p>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-3 text-slate-400 text-[10px] uppercase tracking-wider font-semibold">
                      or
                    </span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>

                  {/* WhatsApp Quick Booking */}
                  <button
                    type="button"
                    onClick={handleWhatsAppBooking}
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 rounded-md transition-colors text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <Phone className="h-4 w-4 fill-white stroke-none" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
