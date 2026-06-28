import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, Users, Heart, Star, Check, X, ShieldAlert, Phone, Send, Info, Hotel, Truck } from 'lucide-react';
import API from '../api/axios.js';
import Loader from '../components/ui/Loader.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';

const PackageDetails = () => {

  const PackageDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('overview');
  const [activeItineraryDay, setActiveItineraryDay] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  // Booking Form State
  const [bookingPersons, setBookingPersons] = useState(1);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Inquiry Form State (Fallback if guest or general)
  const [inquiryName, setInquiryName] = useState(user?.name || '');
  const [inquiryEmail, setInquiryEmail] = useState(user?.email || '');
  const [inquiryPhone, setInquiryPhone] = useState(user?.phone || '');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  //Fetch Package Details
  const { data: pkg, isLoading, error } = useQuery({
    queryKey: ['package', slug],
    queryFn: async () => {
      const res = await API.get(`/packages/${slug}`);
      return res.data.data;
    },
  });

   // Set default selected image when package loads
  useEffect(() => {
    if (pkg) {
      setSelectedImage(pkg.thumbnail);
    }
  }, [pkg]);

// Booking Mutation
  const bookingMutation = useMutation({
    mutationFn: async (bookingData) => {
      return await API.post('/bookings', bookingData);
    },
    onSuccess: () => {
      setBookingSuccess(true);
      setBookingError('');
      setBookingPersons(1);
      setBookingDate('');
      setBookingMessage('');
      queryClient.invalidateQueries(['my-bookings']);
    },
    onError: (err) => {
      setBookingError(err.response?.data?.message || 'Failed to submit booking inquiry');
    },
  });

  // Inquiry Mutation
  const inquiryMutation = useMutation({
    mutationFn: async (inquiryData) => {
      return await API.post('/inquiries', inquiryData);
    },
    onSuccess: () => {
      setInquirySuccess(true);
      setInquiryMessage('');
    },
  });

  // Review Mutation
  const reviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      return await API.post(`/packages/${pkg._id}/reviews`, reviewData);
    },
    onSuccess: () => {
      setReviewComment('');
      setReviewRating(5);
      setReviewError('');
      queryClient.invalidateQueries(['package', slug]);
    },
    onError: (err) => {
      setReviewError(err.response?.data?.message || 'Failed to submit review');
    },
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    bookingMutation.mutate({
      packageId: pkg._id,
      persons: Number(bookingPersons),
      travelDate: bookingDate,
      contactInfo: {
        name: user.name,
        email: user.email,
        phone: user.phone || '+1234567890',
        message: bookingMessage,
      },
    });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    inquiryMutation.mutate({
      packageId: pkg._id,
      name: inquiryName,
      email: inquiryEmail,
      phone: inquiryPhone,
      message: inquiryMessage,
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!reviewComment.trim()) {
      setReviewError('Comment cannot be empty');
      return;
    }
    reviewMutation.mutate({
      rating: reviewRating,
      comment: reviewComment,
    });
  };
  
  const handleWhatsAppBooking = () => {
    const defaultNumber = import.meta.env.VITE_WHATSAPP_PHONE || '+1234567890';
    const message = encodeURIComponent(
      `Hello 1ClickTravel, I would like to book the "${pkg.title}" package for ${bookingPersons} guest(s) on date ${bookingDate || 'TBD'}.`
    );
    window.open(`https://wa.me/${defaultNumber}?text=${message}`, '_blank');
  };

  if (isLoading) return <Loader fullPage />;
  if (error || !pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        <div className="text-center space-y-4">
          <ShieldAlert className="h-16 w-16 text-rose-500 mx-auto" />
          <h2 className="font-serif text-2xl font-bold">Package Not Found</h2>
          <p className="text-slate-400">The package slug you entered could not be found or has been disabled.</p>
          <Link to="/packages" className="inline-block bg-primary text-white px-6 py-2 rounded font-bold shadow-sm">
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  const getImgUrl = (url) => {
    if (!url) return '';
    return url.startsWith('/uploads') ? `http://localhost:5001${url}` : url;
  };

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

        {/* 3. Detailed Tabs (Overview, Itinerary, Inclusions/Exclusions, Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Columns: Tabs and reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs Headers */}
            <div className="flex border-b border-slate-200 overflow-x-auto">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'itinerary', name: 'Itinerary Plan' },
                { id: 'inclusions', name: 'Inclusions' },
                { id: 'hotels', name: 'Accommodation' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3.5 px-4.5 sm:px-6 text-xs sm:text-sm font-semibold tracking-wide border-b-2 focus:outline-none transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-primary text-primary font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tabs Contents */}
            <div className="bg-white border border-slate-200 p-6 rounded-lg min-h-[250px] shadow-sm">
              {activeTab === 'overview' && (
                <div className="space-y-5">
                  <h3 className="font-serif text-lg font-bold text-slate-800">About This Expedition</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {pkg.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4.5 border-t border-slate-100">
                    <div className="flex items-center space-x-3 text-slate-700">
                      <Hotel className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Accommodation</p>
                        <p className="font-semibold text-xs text-slate-700">{pkg.hotelDetails || 'Premium boutique suites'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-700">
                      <Truck className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Transportation</p>
                        <p className="font-semibold text-xs text-slate-700">{pkg.transport || 'Chauffeured vehicle'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  {/* Day selection tabs */}
                  <div className="flex sm:flex-col overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 space-x-2 sm:space-x-0 sm:space-y-1.5 border-b sm:border-b-0 sm:border-r border-slate-100 pr-0 sm:pr-4">
                    {pkg.itinerary?.map((day) => (
                      <button
                        key={day.day}
                        onClick={() => setActiveItineraryDay(day.day)}
                        className={`flex-shrink-0 py-2 px-3 rounded text-left text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          activeItineraryDay === day.day
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
                        }`}
                      >
                        Day {day.day} {day.meals ? `(${day.meals.join(', ')})` : ''}
                      </button>
                    ))}
                  </div>

                  {/* Day description content */}
                  <div className="sm:col-span-3 space-y-3">
                    {pkg.itinerary?.filter((d) => d.day === activeItineraryDay).map((day) => (
                      <div key={day.day} className="space-y-3">
                        <h4 className="font-serif text-base font-bold text-primary">
                          Day {day.day} — {day.title}
                        </h4>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                          {day.description}
                        </p>
                        {day.meals?.length > 0 && (
                          <div className="flex items-center space-x-2 pt-1 text-[10px]">
                            <span className="text-slate-450 uppercase font-bold">Meals Included:</span>
                            {day.meals.map((meal, index) => (
                              <span key={index} className="bg-sky-50 text-primary px-2 py-0.5 rounded font-bold border border-sky-100">
                                {meal}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inclusions */}
                  <div className="space-y-3.5">
                    <h4 className="text-slate-800 font-serif font-bold text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>What's Included</span>
                    </h4>
                    <ul className="space-y-2 text-slate-600 text-xs font-semibold">
                      {pkg.inclusions?.map((inc, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="space-y-3.5">
                    <h4 className="text-slate-800 font-serif font-bold text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
                      <X className="h-4 w-4 text-rose-500" />
                      <span>What's Excluded</span>
                    </h4>
                    <ul className="space-y-2 text-slate-600 text-xs font-semibold">
                      {pkg.exclusions?.map((exc, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <X className="h-3.5 w-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'hotels' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-slate-800 font-serif font-bold text-sm flex items-center space-x-2 mb-1.5">
                      <Hotel className="h-4 w-4 text-primary" />
                      <span>Premium Lodging Info</span>
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                      {pkg.hotelDetails || 'Our packages feature premium rated accommodations vetted personally for service quality, style, and comfort.'}
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-5">
                    <h4 className="text-slate-800 font-serif font-bold text-sm flex items-center space-x-2 mb-1.5">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Private Transit Info</span>
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                      {pkg.transport || 'All transfers, flights, speedboats, and yachts mentioned in the itinerary are covered. Guests enjoy private air-conditioned vehicles equipped with professional drivers.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Ratings & Reviews */}
            <div className="space-y-5 pt-4">
              <h3 className="font-serif text-xl font-bold text-slate-800 border-b border-slate-200 pb-3.5">
                Traveler Feedback
              </h3>

              {/* Reviews List */}
              {pkg.reviews?.length === 0 ? (
                <p className="text-slate-505 text-xs font-semibold">No reviews submitted yet. Be the first to share your experience!</p>
              ) : (
                <div className="space-y-3.5">
                  {pkg.reviews.map((rev) => (
                    <div key={rev._id} className="bg-white border border-slate-200/80 p-4.5 rounded-lg space-y-2 shadow-sm">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-700">{rev.userName}</span>
                        <span className="text-slate-400">{new Date(rev.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex space-x-0.5 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400 stroke-none" />
                        ))}
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed font-medium">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit a Review Form */}
              <div className="bg-white border border-slate-200 p-5 rounded-lg space-y-4 shadow-sm">
                <h4 className="font-serif text-base font-bold text-slate-800">Write a Review</h4>
                
                {isAuthenticated ? (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Your Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="focus:outline-none cursor-pointer"
                          >
                            <Star
                              className={`h-5 w-5 ${
                                star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">
                        Feedback
                      </label>
                      <textarea
                        required
                        placeholder="Share details of your travel experience..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={3}
                        className="w-full bg-white border border-slate-200 rounded-md py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-primary resize-none"
                      ></textarea>
                    </div>

                    {reviewError && <p className="text-xs text-rose-500 font-semibold">{reviewError}</p>}

                    <button
                      type="submit"
                      disabled={reviewMutation.isPending}
                      className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-5 rounded-md transition-colors text-xs uppercase tracking-wider cursor-pointer shadow-sm"
                    >
                      {reviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                ) : (
                  <p className="text-xs text-slate-500 font-medium">
                    Please{' '}
                    <Link to="/login" className="text-primary hover:underline font-bold">
                      Sign In
                    </Link>{' '}
                    to leave a package review.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Callback Request form (For General Inquiry fallback) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center space-x-2">
                <Info className="h-4.5 w-4.5 text-primary" />
                <span>General Inquiry</span>
              </h3>

              {inquirySuccess ? (
                <div className="bg-sky-50/50 border border-sky-100 p-5 rounded-md text-center space-y-3.5">
                  <Check className="h-10 w-10 text-primary mx-auto" />
                  <h4 className="font-serif font-bold text-slate-800">Inquiry Received!</h4>
                  <p className="text-xs text-slate-550 font-semibold">
                    We have saved your question. A travel consultant will reply to your email address shortly.
                  </p>
                  <button
                    onClick={() => setInquirySuccess(false)}
                    className="text-xs text-primary font-bold hover:underline cursor-pointer"
                  >
                    Ask another question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-md py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-md py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="+1 (555) 123-4567"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-md py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">Message</label>
                    <textarea
                      required
                      placeholder="Write your holiday inquiries..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      rows={3}
                      className="w-full bg-white border border-slate-200 rounded-md py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-primary resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={inquiryMutation.isPending}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-md transition-colors text-xs uppercase tracking-wider cursor-pointer shadow-sm"
                  >
                    {inquiryMutation.isPending ? 'Sending...' : 'Send Inquiry'}
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
