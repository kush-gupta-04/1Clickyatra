import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import API from "../api/axios.js";
import Breadcrumbs from "../component/ui/Breadcrumbs.jsx";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const inquiryMutation = useMutation({
    mutationFn: async (inquiryData) => {
      return await API.post("/inquiries", inquiryData);
    },
    onSuccess: () => {
      setSuccess(true);
      setError("");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Failed to submit message");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    inquiryMutation.mutate({
      name,
      email,
      phone,
      message,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 text-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Contact" }]} />

        {/* Page Header */}
        <div className="mb-10 mt-3 text-left">
          <span className="text-primary text-xs uppercase tracking-widest font-bold">
            Concierge Support
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold mt-1 text-slate-800">
            Connect With Us
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl font-medium">
            Have questions about our itineraries, custom requests, or wish to
            start planning a tour? Drop us a note.
          </p>
        </div>

        {/* Contact Info and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Column */}
          <div className="lg:col-span-1 space-y-6 bg-white border border-slate-200/80 p-6 rounded-lg h-fit shadow-sm">
            <h3 className="font-serif text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
              Office Coordinates
            </h3>

            <ul className="space-y-5 text-xs sm:text-sm text-slate-600 font-semibold">
              <li className="flex items-start space-x-3.5">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Main Office</p>
                  <p className="mt-0.5">100 Luxury Avenue, Suite 500</p>
                  <p>Beverly Hills, CA 90210</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Phone Hotline</p>
                  <p className="mt-0.5">+1 (555) 987-6543</p>
                  <p className="text-[10px] text-slate-400">
                    Mon - Sat: 9 AM - 6 PM PST
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Direct Email</p>
                  <p className="mt-0.5">concierge@1clicktravel.com</p>
                  <p className="text-[10px] text-slate-400">
                    Response within 24 hours
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
            <h3 className="font-serif text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">
              Send Message Inquiry
            </h3>

            {success ? (
              <div className="bg-sky-50/50 border border-sky-100 p-6 rounded-md text-center space-y-3">
                <Check className="h-10 w-10 text-primary mx-auto" />
                <h4 className="font-serif text-lg font-bold text-slate-800">
                  Message Delivered Successfully!
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-semibold">
                  Thank you for contacting 1ClickTravel. One of our destination
                  experts has been assigned to your message and will reach out
                  to you via email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-md py-2.5 px-3.5 text-xs font-semibold text-slate-850 focus:outline-none focus:border-primary shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-md py-2.5 px-3.5 text-xs font-semibold text-slate-850 focus:outline-none focus:border-primary shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-md py-2.5 px-3.5 text-xs font-semibold text-slate-850 focus:outline-none focus:border-primary shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">
                    Message Details
                  </label>
                  <textarea
                    required
                    placeholder="Describe your destination interest, travel timeframe, and group details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4.5}
                    className="w-full bg-white border border-slate-200 rounded-md py-2.5 px-3.5 text-xs font-semibold text-slate-850 focus:outline-none focus:border-primary resize-none shadow-sm"
                  ></textarea>
                </div>

                {error && (
                  <p className="text-xs text-rose-500 font-semibold">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={inquiryMutation.isPending}
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-md transition-colors text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {inquiryMutation.isPending ? "Sending..." : "Send Message"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
