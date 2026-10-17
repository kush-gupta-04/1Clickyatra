import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react";
import API, { getMediaUrl } from "../../api/axios.js";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isActive = true;
    API.get("/blogs")
      .then((response) => {
        if (!response.data.success || !Array.isArray(response.data.data)) {
          throw new Error("The server returned an invalid blog list.");
        }
        if (isActive) setBlogs(response.data.data);
      })
      .catch((error) => {
        if (isActive) {
          setErrorMsg(
            error.response?.data?.message ||
              error.message ||
              "Failed to load blog posts.",
          );
        }
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(blog._id);
    setErrorMsg("");
    try {
      await API.delete(`/blogs/${blog._id}`);
      setBlogs((currentBlogs) =>
        currentBlogs.filter((item) => item._id !== blog._id),
      );
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete the blog post.",
      );
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/admin"
          className="mb-6 inline-flex items-center text-slate-500 transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <header className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <h1 className="font-serif text-2xl font-bold text-slate-800 md:text-3xl">
                Manage Blog Posts
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Create, update, or remove articles published from the admin
                console.
              </p>
            </div>
            <Link
              to="/admin/blogs/create"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Blog
            </Link>
          </header>

          <div className="p-6 md:p-8">
            {errorMsg && (
              <div
                role="alert"
                className="mb-5 rounded-md border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700"
              >
                {errorMsg}
              </div>
            )}

            {loading ? (
              <p className="py-10 text-center text-sm font-medium text-slate-500">
                Loading blog posts...
              </p>
            ) : blogs.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm font-medium text-slate-500">
                  No admin-created blog posts yet.
                </p>
                <Link
                  to="/admin/blogs/create"
                  className="mt-4 inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Write your first post
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                      <th className="py-3 pr-4 font-bold">Article</th>
                      <th className="px-4 py-3 font-bold">Category</th>
                      <th className="px-4 py-3 font-bold">Published</th>
                      <th className="py-3 pl-4 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {blogs.map((blog) => (
                      <tr key={blog._id}>
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            {blog.thumbnail && (
                              <img
                                src={getMediaUrl(blog.thumbnail)}
                                alt=""
                                className="h-12 w-16 rounded-md object-cover"
                              />
                            )}
                            <span className="max-w-md font-semibold text-slate-800">
                              {blog.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {blog.category}
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {blog.createdAt
                            ? new Date(blog.createdAt).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="py-4 pl-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <Link
                              to={`/admin/blogs/${blog.slug}/edit`}
                              className="inline-flex items-center rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(blog)}
                              disabled={deletingId === blog._id}
                              className="inline-flex items-center rounded-md border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {deletingId === blog._id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManageBlogs;
