import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios.js";
import Breadcrumbs from "../component/ui/Breadcrumbs.jsx";
import Loader from "../component/ui/Loader.jsx";
import PackageCard from "../component/ui/PackageCard.jsx";

const categories = ["Honeymoon", "Adventure", "Luxury", "Family", "Solo"];

const Packages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["packages", queryString],
    queryFn: async () => {
      const res = await API.get(`/packages?${queryString}`);
      return res.data;
    },
  });

  const packages = data?.data || [];
  const hasFilters = ["search", "category", "minPrice", "maxPrice"].some(
    (key) => searchParams.has(key),
  );
  const page = Number(searchParams.get("page") || 1);

  const applyFilters = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextParams = new URLSearchParams();
    const search = String(formData.get("search") || "").trim();
    const category = String(formData.get("category") || "");
    const minPrice = String(formData.get("minPrice") || "");
    const maxPrice = String(formData.get("maxPrice") || "");
    if (search) nextParams.set("search", search);
    if (category) nextParams.set("category", category);
    if (minPrice) nextParams.set("minPrice", minPrice);
    if (maxPrice) nextParams.set("maxPrice", maxPrice);
    setSearchParams(nextParams);
  };

  const changePage = (nextPage) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(nextPage));
    setSearchParams(nextParams);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Explore Tours" }]} />
        <div className="mb-8 mt-3">
          <span className="text-primary text-xs uppercase tracking-widest font-bold">
            Exquisite Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold mt-1 text-slate-800">
            Explore Holiday Packages
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl font-medium">
            Find a trip that fits your destination, travel style, and budget.
          </p>
        </div>

        <form
          key={queryString}
          onSubmit={applyFilters}
          className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1fr)_180px_140px_140px_auto] gap-3 items-end border-y border-slate-200 py-5"
        >
          <label className="text-xs font-semibold text-slate-600">
            Search packages
            <span className="relative mt-1.5 block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                name="search"
                defaultValue={searchParams.get("search") || ""}
                placeholder="Destination or package name"
                className="w-full rounded border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm font-normal outline-none focus:border-primary"
              />
            </span>
          </label>
          <label className="text-xs font-semibold text-slate-600">
            Travel style
            <select
              name="category"
              defaultValue={searchParams.get("category") || ""}
              className="mt-1.5 w-full rounded border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-primary"
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-600">
            Min price
            <input
              type="number"
              name="minPrice"
              min="0"
              defaultValue={searchParams.get("minPrice") || ""}
              placeholder="Any"
              className="mt-1.5 w-full rounded border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-primary"
            />
          </label>
          <label className="text-xs font-semibold text-slate-600">
            Max price
            <input
              type="number"
              name="maxPrice"
              min="0"
              defaultValue={searchParams.get("maxPrice") || ""}
              placeholder="Any"
              className="mt-1.5 w-full rounded border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-primary"
            />
          </label>
          <button
            type="submit"
            className="inline-flex h-10.5 items-center justify-center gap-2 rounded bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Apply
          </button>
        </form>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p
            role="alert"
            className="py-12 text-center text-sm font-semibold text-rose-600"
          >
            Packages could not be loaded. Please try again.
          </p>
        ) : packages.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="font-serif text-xl font-bold text-slate-800">
              {hasFilters ? "No packages found" : "No packages published yet"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {hasFilters
                ? "Try changing or clearing your filters."
                : "Published packages will appear here."}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="mt-4 text-sm font-bold text-primary hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-slate-500">
              {data.total} {data.total === 1 ? "package" : "packages"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
            {(data.pagination?.prev || data.pagination?.next) && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={!data.pagination.prev}
                  onClick={() => changePage(page - 1)}
                  className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-500">Page {page}</span>
                <button
                  type="button"
                  disabled={!data.pagination.next}
                  onClick={() => changePage(page + 1)}
                  className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Packages;
