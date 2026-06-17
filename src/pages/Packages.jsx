import React from "react";

import Breadcrumbs from "../component/ui/Breadcrumbs";

const Packages = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb path */}
        <Breadcrumbs items={[{ name: "Explore Tours" }]} />

        {/* Page Header */}
        <div className="mb-10 mt-3 text-left">
          <span className="text-primary text-xs uppercase tracking-widest font-bold">
            Exquisite Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold mt-1 text-slate-800">
            Explore Holiday Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl font-medium">
            Filter through our curated itineraries to discover your next
            vacation path.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Packages;
