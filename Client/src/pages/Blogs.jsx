import Breadcrumbs from "../component/ui/Breadcrumbs.jsx";
import { useState } from "react";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const categories = [
    "Travel Guide",
    "Safari Tips",
    "Bespoke Guide",
    "Adventure Guide",
  ];
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Blogs" }]} />

        {/* Page Header */}
        <div className="mb-10 mt-3 text-left">
          <span className="text-primary text-xs uppercase tracking-widest font-bold">
            Travel Journals
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold mt-1 text-slate-800">
            The 1ClickYatra Blog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl font-medium">
            Inspirational stories, packing guides, and luxury travel secrets
            compiled by our local specialists.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 bg-white border border-slate-200/85 p-4 rounded-lg shadow-sm">
          {/* Categories select pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("")}
              className={`px-3.5 py-1.5 rounded text-[10px] uppercase tracking-wider font-bold transition-colors cursor-pointer ${
                category === ""
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-650 hover:bg-slate-200 border-none"
              }`}
            >
              All Posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-[10px] uppercase tracking-wider font-bold transition-colors cursor-pointer ${
                  category === cat
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-650 hover:bg-slate-200 border-none"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md py-2 pl-9.5 pr-4 text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
