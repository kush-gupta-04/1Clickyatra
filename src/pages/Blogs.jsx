import Breadcrumbs from "../component/ui/Breadcrumbs.jsx";
const Blogs = () => {
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
      </div>
    </div>
  );
};

export default Blogs;
