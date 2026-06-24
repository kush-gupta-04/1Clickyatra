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
      </div>
    </div>
  );
};
