import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import API, { getMediaUrl } from "../../api/axios";

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadPackages = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const res = await API.get("/packages/admin");
        if (!res.data.success || !Array.isArray(res.data.data)) {
          throw new Error("The server returned an invalid package list.");
        }
        setPackages(res.data.data);
      } catch (error) {
        setErrorMsg(
          error.response?.data?.message ||
            error.message ||
            "Failed to load packages",
        );
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/admin"
          className="inline-flex items-center text-slate-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-800">
                Manage Packages
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Edit package details or add a new travel package.
              </p>
            </div>
            <Link
              to="/admin/packages/create"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-5 rounded-md transition-colors text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Link>
          </div>

          <div className="p-6 md:p-8">
            {errorMsg && (
              <div
                role="alert"
                className="mb-5 p-4 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-semibold rounded-md"
              >
                {errorMsg}
              </div>
            )}

            {loading ? (
              <p className="py-10 text-center text-sm font-medium text-slate-500">
                Loading packages...
              </p>
            ) : packages.length === 0 ? (
              <p className="py-10 text-center text-sm font-medium text-slate-500">
                No packages yet. Add your first travel package to get started.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                      <th className="py-3 pr-4 font-bold">Package</th>
                      <th className="py-3 px-4 font-bold">Destination</th>
                      <th className="py-3 px-4 font-bold">Price</th>
                      <th className="py-3 px-4 font-bold">Status</th>
                      <th className="py-3 pl-4 text-right font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {packages.map((travelPackage) => (
                      <tr key={travelPackage._id}>
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            {travelPackage.thumbnail && (
                              <img
                                src={getMediaUrl(travelPackage.thumbnail)}
                                alt=""
                                className="h-12 w-16 rounded-md object-cover"
                              />
                            )}
                            <span className="font-semibold text-slate-800">
                              {travelPackage.title}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-600">
                          {travelPackage.destination}
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-600">
                          ₹{Number(travelPackage.price).toLocaleString("en-IN")}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                              travelPackage.status === "published"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {travelPackage.status}
                          </span>
                        </td>
                        <td className="py-4 pl-4 text-right">
                          <Link
                            to={`/admin/packages/${travelPackage._id}/edit`}
                            className="inline-flex items-center rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-primary hover:text-primary transition-colors"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePackages;
