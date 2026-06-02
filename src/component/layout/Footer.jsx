import { Link } from "react-router-dom";
import { Compass, Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Compass className="h-7 w-7 text-primary" />
              <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center">
                1Click<span className="text-primary">yatra</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              The simplest way to discover, customize, and book your next
              holiday path to the world's most spectacular destinations.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V2h-3a5 5 0 00-5 5v1z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/1clicktravel?igsh=MTZ5M3Y3OXpqODhzYw=="
                className="hover:text-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.2 2.4h3.3L14.3 11l8.5 11.3h-6.7L10.8 15.4l-6 6.9H1.5l7.7-8.8L1 2.4h6.9l4.7 6.2 5.6-6.2zm-1.2 17.6h1.8L7.1 4.7H5.2l11.8 15.3z" />
                </svg>
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-slate-100 font-serif text-lg font-semibold mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/packages"
                  className="hover:text-primary transition-colors"
                >
                  Our Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="hover:text-primary transition-colors"
                >
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Details */}
          <div>
            <h3 className="text-slate-100 font-serif text-lg font-semibold mb-4 tracking-wide">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  100 Luxury Avenue, Suite 500, Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span>+1 (555) 987-6543</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span>ops@1clickyatra.in</span>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="text-slate-100 font-serif text-lg font-semibold mb-4 tracking-wide">
              Newsletter
            </h3>
            <p className="text-sm mb-4">
              Subscribe to receive exclusive travel offers and luxury updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md py-3.5 pl-4 pr-12 text-sm text-slate-100 focus:outline-none focus:border-primary transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-primary mt-2 animate-pulse">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} 1Clickyatra. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
