import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import API from "../../api/axios";

const CreatePackage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    duration: "",
    category: "",
    overview: "",
    description: "",
    price: "",
    discountedPrice: "",
    hotelDetails: "",
    transport: "",
    groupSize: "Any",
    featured: false,
    status: "draft",
    seoTitle: "",
    seoDesc: "",
    seoKeywords: "",
  });

  const [inclusions, setInclusions] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);
  
  const [itinerary, setItinerary] = useState([
    { day: 1, title: "", description: "", meals: "" },
  ]);

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleListChange = (index, value, type) => {
    const list = type === "inclusions" ? [...inclusions] : [...exclusions];
    list[index] = value;
    type === "inclusions" ? setInclusions(list) : setExclusions(list);
  };

  const addListItem = (type) => {
    type === "inclusions" ? setInclusions([...inclusions, ""]) : setExclusions([...exclusions, ""]);
  };

  const removeListItem = (index, type) => {
    const list = type === "inclusions" ? [...inclusions] : [...exclusions];
    list.splice(index, 1);
    type === "inclusions" ? setInclusions(list) : setExclusions(list);
  };

  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = value;
    setItinerary(newItinerary);
  };

  const addItineraryDay = () => {
    setItinerary([
      ...itinerary,
      { day: itinerary.length + 1, title: "", description: "", meals: "" },
    ]);
  };

  const removeItineraryDay = (index) => {
    const newItinerary = [...itinerary];
    newItinerary.splice(index, 1);
    // Re-index days
    newItinerary.forEach((item, i) => (item.day = i + 1));
    setItinerary(newItinerary);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const data = new FormData();
      
      // Basic Fields
      Object.keys(formData).forEach((key) => {
        if (!key.startsWith("seo")) {
           data.append(key, formData[key]);
        }
      });

      // Filter empty list items
      const validInclusions = inclusions.filter((item) => item.trim() !== "");
      const validExclusions = exclusions.filter((item) => item.trim() !== "");
      
      validInclusions.forEach((inc) => data.append("inclusions[]", inc));
      validExclusions.forEach((exc) => data.append("exclusions[]", exc));

      // Itinerary mapping
      const validItinerary = itinerary.map((item) => ({
        ...item,
        meals: item.meals.split(",").map((m) => m.trim()).filter(m => m)
      }));
      
      validItinerary.forEach((item, index) => {
        data.append(`itinerary[${index}][day]`, item.day);
        data.append(`itinerary[${index}][title]`, item.title);
        data.append(`itinerary[${index}][description]`, item.description);
        item.meals.forEach((meal, mealIndex) => {
           data.append(`itinerary[${index}][meals][${mealIndex}]`, meal);
        });
      });

      // SEO
      const seoData = {
        title: formData.seoTitle,
        description: formData.seoDesc,
        keywords: formData.seoKeywords,
      };
      // Usually backend accepts seo as object or JSON string. 
      // The backend packageController might need logic to parse it. If it doesn't parse, we can skip or send as string.
      // packageController doesn't have JSON.parse for SEO in standard format, but let's assume it accepts object notation via bracket syntax, or we just skip it if backend doesn't handle it well. 
      // I'll skip complex bracket serialization and send string if backend handles it, but let's just ignore SEO if it's too complex or send it as json string.
      // Looking at the package model, seo is an object.
      data.append(`seo[title]`, formData.seoTitle);
      data.append(`seo[description]`, formData.seoDesc);
      data.append(`seo[keywords]`, formData.seoKeywords);

      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      } else {
        throw new Error("Thumbnail is required");
      }

      if (images.length > 0) {
        images.forEach((img) => {
          data.append("images", img);
        });
      }

      const res = await API.post("/packages", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setSuccessMsg("Package created successfully!");
        setTimeout(() => navigate("/admin"), 1500);
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || error.message || "Failed to create package"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center text-slate-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-800">
              Create New Package
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Add a new travel destination package to the platform.
            </p>
          </div>

          <div className="p-6 md:p-8">
            {errorMsg && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-semibold rounded-md">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-semibold rounded-md">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Basic Info */}
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">
                  Basic Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Title</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Package Title" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Destination</label>
                    <input type="text" name="destination" required value={formData.destination} onChange={handleInputChange} className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="City, Country" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Duration</label>
                    <input type="text" name="duration" required value={formData.duration} onChange={handleInputChange} className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. 5 Days / 4 Nights" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Category</label>
                    <select name="category" required value={formData.category} onChange={handleInputChange} className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none bg-white">
                      <option value="">Select Category</option>
                      <option value="Honeymoon">Honeymoon</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Family">Family</option>
                      <option value="Solo">Solo</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Price (₹)</label>
                    <input type="number" name="price" required value={formData.price} onChange={handleInputChange} className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Base price" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Discounted Price (₹)</label>
                    <input type="number" name="discountedPrice" value={formData.discountedPrice} onChange={handleInputChange} className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Optional" />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Descriptions</h2>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Overview (Short)</label>
                  <textarea name="overview" required rows={3} value={formData.overview} onChange={handleInputChange} className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none"></textarea>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Full Description</label>
                  <textarea name="description" required rows={5} value={formData.description} onChange={handleInputChange} className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none"></textarea>
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 flex justify-between items-center">
                    <span>Inclusions</span>
                    <button type="button" onClick={() => addListItem("inclusions")} className="text-primary hover:text-primary-dark text-xs flex items-center">
                      <Plus className="h-3 w-3 mr-1" /> Add
                    </button>
                  </h2>
                  {inclusions.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input type="text" value={item} onChange={(e) => handleListChange(index, e.target.value, "inclusions")} className="flex-1 border border-slate-200 rounded-md py-1.5 px-3 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. Daily Breakfast" />
                      <button type="button" onClick={() => removeListItem(index, "inclusions")} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 flex justify-between items-center">
                    <span>Exclusions</span>
                    <button type="button" onClick={() => addListItem("exclusions")} className="text-primary hover:text-primary-dark text-xs flex items-center">
                      <Plus className="h-3 w-3 mr-1" /> Add
                    </button>
                  </h2>
                  {exclusions.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input type="text" value={item} onChange={(e) => handleListChange(index, e.target.value, "exclusions")} className="flex-1 border border-slate-200 rounded-md py-1.5 px-3 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. Flight Tickets" />
                      <button type="button" onClick={() => removeListItem(index, "exclusions")} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 flex justify-between items-center">
                  <span>Itinerary</span>
                  <button type="button" onClick={addItineraryDay} className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Day
                  </button>
                </h2>
                
                <div className="space-y-4">
                  {itinerary.map((day, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50 relative">
                      {index > 0 && (
                        <button type="button" onClick={() => removeItineraryDay(index)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                      <h3 className="font-bold text-slate-700 mb-3">Day {day.day}</h3>
                      <div className="space-y-3">
                        <input type="text" required value={day.title} onChange={(e) => handleItineraryChange(index, "title", e.target.value)} placeholder="Day Title (e.g. Arrival in Paris)" className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none bg-white" />
                        <textarea required value={day.description} onChange={(e) => handleItineraryChange(index, "description", e.target.value)} placeholder="Day Description..." rows={2} className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none bg-white"></textarea>
                        <input type="text" value={day.meals} onChange={(e) => handleItineraryChange(index, "meals", e.target.value)} placeholder="Meals (comma separated, e.g. Breakfast, Dinner)" className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none bg-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media */}
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Media</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Thumbnail Image</label>
                    <div className="flex items-center space-x-4">
                      {thumbnailPreview && (
                        <img src={thumbnailPreview} alt="Preview" className="h-16 w-24 object-cover rounded-md border border-slate-200" />
                      )}
                      <input type="file" required accept="image/*" onChange={handleThumbnailChange} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Gallery Images (Max 12)</label>
                    <input type="file" multiple accept="image/*" onChange={handleImagesChange} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                    <p className="text-xs text-slate-500 mt-1">{images.length} files selected</p>
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Options & Status</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                   <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-primary outline-none bg-white">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-6 space-x-2">
                    <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="h-4 w-4 text-primary rounded border-slate-300" />
                    <label htmlFor="featured" className="text-sm font-semibold text-slate-700 select-none">Mark as Featured</label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button type="submit" disabled={loading} className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-8 rounded-md transition-colors text-sm flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>{loading ? "Saving Package..." : "Create Package"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePackage;
