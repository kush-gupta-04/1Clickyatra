import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import API, { getMediaUrl } from "../../api/axios";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEditing = Boolean(slug);
  const [loading, setLoading] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(isEditing);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [blogId, setBlogId] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: "", // comma separated
    seoTitle: "",
    seoDesc: "",
    seoKeywords: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  useEffect(() => {
    if (!slug) return;

    let isActive = true;
    const loadBlog = async () => {
      setLoadingArticle(true);
      setErrorMsg("");
      try {
        const response = await API.get(`/blogs/${slug}`);
        if (!response.data.success || !response.data.data) {
          throw new Error("The server returned an invalid blog post.");
        }
        const blog = response.data.data;
        if (!isActive) return;

        setBlogId(blog._id);
        setFormData({
          title: blog.title || "",
          category: blog.category || "",
          content: blog.content || "",
          tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
          seoTitle: blog.seo?.title || "",
          seoDesc: blog.seo?.description || "",
          seoKeywords: blog.seo?.keywords || "",
        });
        setThumbnailPreview(getMediaUrl(blog.thumbnail));
      } catch (error) {
        if (isActive) {
          setErrorMsg(
            error.response?.data?.message ||
              error.message ||
              "Failed to load the blog post.",
          );
        }
      } finally {
        if (isActive) setLoadingArticle(false);
      }
    };

    loadBlog();
    return () => {
      isActive = false;
    };
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("content", formData.content);
      
      // Parse tags
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      data.append("tags", JSON.stringify(tagsArray));

      // SEO
      const seoData = {
        title: formData.seoTitle,
        description: formData.seoDesc,
        keywords: formData.seoKeywords,
      };
      data.append("seo", JSON.stringify(seoData));

      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      } else if (!isEditing) {
        throw new Error("Thumbnail image is required");
      }

      const request = isEditing
        ? API.put(`/blogs/${blogId}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : API.post("/blogs", data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      const res = await request;

      if (res.data.success) {
        setSuccessMsg(
          isEditing
            ? "Blog post updated successfully!"
            : "Blog post created successfully!",
        );
        setTimeout(() => navigate("/admin/blogs"), 1000);
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || error.message || "Failed to save blog",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/admin/blogs"
          className="flex items-center text-slate-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog Posts
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-800">
              {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              {isEditing
                ? "Update the article details shown on the travel blog."
                : "Write a new article for the 1clickYatra travel blog."}
            </p>
          </div>

          <div className="p-6 md:p-8">
            {errorMsg && (
              <div
                role="alert"
                className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-semibold rounded-md"
              >
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div
                role="status"
                className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-semibold rounded-md"
              >
                {successMsg}
              </div>
            )}

            {loadingArticle ? (
              <p className="py-10 text-center text-sm font-medium text-slate-500">
                Loading blog post...
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="space-y-5">
                  <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">
                    Basic Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-md py-2.5 px-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                        placeholder="Enter blog title"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-md py-2.5 px-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                        placeholder="e.g. Adventure Guide"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-md py-2.5 px-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      placeholder="e.g. himalayas, trekking, family travel"
                    />
                  </div>
                </div>

                {/* Content & Media */}
                <div className="space-y-5">
                  <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">
                    Content & Media
                  </h2>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                      Thumbnail Image {isEditing && "(optional when keeping the current image)"}
                    </label>
                    <div className="flex items-center space-x-6">
                      <div className="shrink-0">
                        {thumbnailPreview ? (
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="h-24 w-32 object-cover rounded-md border border-slate-200"
                          />
                        ) : (
                          <div className="h-24 w-32 bg-slate-100 rounded-md border border-slate-200 border-dashed flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required={!isEditing}
                        className="block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary/10 file:text-primary
                          hover:file:bg-primary/20
                          cursor-pointer transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Content
                    </label>
                    <textarea
                      name="content"
                      required
                      rows={10}
                      value={formData.content}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-md py-2.5 px-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-y"
                      placeholder="Write your blog content here..."
                    />
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="space-y-5">
                  <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">
                    SEO Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        name="seoTitle"
                        value={formData.seoTitle}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-md py-2.5 px-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        SEO Keywords
                      </label>
                      <input
                        type="text"
                        name="seoKeywords"
                        value={formData.seoKeywords}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-md py-2.5 px-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        SEO Description
                      </label>
                      <textarea
                        name="seoDesc"
                        rows={2}
                        value={formData.seoDesc}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-md py-2.5 px-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading || (isEditing && !blogId)}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-md transition-colors text-sm flex items-center space-x-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />
                    <span>
                      {loading
                        ? isEditing
                          ? "Saving..."
                          : "Publishing..."
                        : isEditing
                          ? "Save Changes"
                          : "Publish Blog"}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
