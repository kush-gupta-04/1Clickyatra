import React from "react";
import {
  Compass,
  Award,
  ShieldCheck,
  Heart,
  ArrowRight,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../component/ui/Breadcrumbs.jsx";

const About = () => {
  const stats = [
    { value: "10+", label: "Years of Excellence", icon: Star },
    { value: "5,000+", label: "Happy Travelers", icon: Users },
    { value: "50+", label: "Global Destinations", icon: MapPin },
    { value: "24/7", label: "Concierge Support", icon: Heart },
  ];

  const values = [
    {
      icon: Compass,
      title: "Bespoke Itineraries",
      desc: "Every journey is meticulously crafted around your unique style, pace, and dream destination, ensuring a one-of-a-kind experience.",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
    },
    {
      icon: Award,
      title: "Premium Stays",
      desc: "We handpick resorts, villas, and boutique stays that offer unparalleled luxury, comfort, and personalized service.",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    },
    {
      icon: ShieldCheck,
      title: "Seamless Travel",
      desc: "From private transfers to exclusive reservations, we handle every detail so you can immerse yourself in the moment.",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="bg-white text-slate-800 min-h-screen selection:bg-primary selection:text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000"
            alt="Breathtaking landscape"
            className="w-full h-full object-cover scale-105 transform origin-center transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white/90 text-sm font-medium tracking-widest uppercase mb-6 shadow-xl">
            Redefining Travel
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-extrabold text-white leading-tight tracking-tight mb-6 drop-shadow-2xl">
            Journey Beyond <br className="hidden md:block" /> the Ordinary
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow-md">
            We don't just book trips; we craft transformative experiences.
            Elevate your travel with personalized itineraries and exclusive
            access.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="px-8 py-4 bg-primary text-white rounded-full font-semibold tracking-wide hover:bg-primary-dark transition-all duration-300 shadow-[0_0_20px_rgba(2,132,199,0.4)] hover:shadow-[0_0_30px_rgba(2,132,199,0.6)] hover:-translate-y-1 flex items-center gap-2">
              Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-white/70">
          <span className="text-xs uppercase tracking-widest font-medium">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/70 to-transparent"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ name: "About Us" }]} />
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-effect bg-white/90 backdrop-blur-xl rounded-2xl p-6 text-center shadow-premium border border-slate-100 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-extrabold text-slate-900 mb-2 gold-gradient-text inline-block">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-24 bg-brand-bg relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] rounded-full bg-sky-200/20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-sky-300 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=1000"
                alt="Travel experiences"
                className="relative rounded-3xl shadow-2xl object-cover h-[600px] w-full"
              />
              <div className="absolute -bottom-10 -right-10 glass-effect bg-white/80 p-6 rounded-2xl shadow-premium hidden md:block max-w-xs transform transition-transform duration-500 group-hover:-translate-y-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Expert Curators</p>
                    <p className="text-xs text-slate-500">
                      Vetted by professionals
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic">
                  "The attention to detail was absolutely flawless. Best trip of
                  our lives."
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-3">
                  Our Philosophy
                </h2>
                <h3 className="text-4xl md:text-5xl font-serif font-extrabold text-slate-900 leading-tight">
                  Travel beautifully, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">
                    without the stress.
                  </span>
                </h3>
              </div>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                <p>
                  1Clickyatra was born from a simple belief: the world is too
                  beautiful for generic, cookie-cutter vacations. We cater to
                  the discerning traveler who seeks authenticity, luxury, and
                  seamless execution.
                </p>
                <p>
                  Our team of seasoned travel designers intimately knows the
                  destinations we offer. We don't rely on algorithms; we rely on
                  personal relationships, firsthand experience, and an
                  unwavering commitment to excellence.
                </p>
                <div className="pl-6 border-l-4 border-primary mt-8">
                  <p className="text-xl font-serif font-medium text-slate-800 italic">
                    "Our mission is to give you back your most valuable asset:
                    time to simply enjoy the journey."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-3">
            The 1Clickyatra Difference
          </h2>
          <h3 className="text-4xl font-serif font-extrabold text-slate-900">
            Crafted for the Extraordinary
          </h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-3xl overflow-hidden shadow-premium bg-white border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-center">
                  <h4 className="text-2xl font-serif font-bold text-slate-900 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=2000')] bg-fixed bg-cover bg-center opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl font-serif font-extrabold text-slate-900 mb-6">
            Ready to script your next adventure?
          </h2>
          <p className="text-xl text-slate-600 mb-10 font-light">
            Let's turn your travel dreams into a meticulously planned reality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-semibold tracking-wide hover:bg-primary transition-colors duration-300 shadow-xl">
              Consult an Expert
            </button>
            <button className="px-10 py-4 bg-white text-slate-900 rounded-full font-semibold tracking-wide hover:bg-slate-50 transition-colors duration-300 shadow-lg border border-slate-200">
              Explore Destinations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
