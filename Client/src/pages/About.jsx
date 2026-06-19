import { Compass, Award, ShieldCheck, Heart } from "lucide-react";
import Breadcrumbs from "../component/ui/Breadcrumbs.jsx";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 text-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "About Us" }]} />

        {/* Brand Narrative Hero */}
        <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-primary text-xs uppercase tracking-widest font-bold">
              The 1Clickyatra Story
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
              Crafting Extraordinary <br />
              <span className="text-primary">Luxury Escapes</span> Since 2012
            </h1>
            <p className="text-slate-500 text-xs leading-relaxed font-semibold">
              At 1Clickyatra, we believe travel is not just about changing
              locations; it is about changing perspectives. For over a decade,
              we have curated high-end bespoke holiday paths for travelers who
              value service quality, comfort, and authenticity.
            </p>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">
              From the overwater villa lagoons of the Maldives to the scenic
              trails of Switzerland, our team coordinates with local hosts to
              arrange seamless private sanctuaries, private transport, and
              guided local excursions.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-slate-200 aspect-[4/3] bg-slate-100 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"
              alt="Luxury Travel Experience"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="py-12 border-t border-b border-slate-200 my-12">
          <div className="text-center mb-10">
            <span className="text-primary text-xs uppercase tracking-widest font-bold">
              Core Pillars
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold mt-1 text-slate-800">
              Our Committed Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Compass,
                title: "Bespoke Curation",
                desc: "Every itinerary is built from scratch around your interests, pace, and lodging choices.",
              },
              {
                icon: Award,
                title: "5-Star Hospitality",
                desc: "We only book hand-picked hotels and private villas boasting top reputation scores.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Transport",
                desc: "Chauffeured luxury SUVs, private boat charters, and high-end air transfers.",
              },
              {
                icon: Heart,
                title: "Boutique Guides",
                desc: "Certified local specialists who share hidden cultural gems and insider stories.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/80 p-5 rounded-lg text-center space-y-2.5 shadow-sm"
              >
                <div className="mx-auto h-12 w-12 bg-sky-50 rounded-full flex items-center justify-center text-primary mb-2">
                  <p.icon className="h-6 w-6" />
                </div>
                <h4 className="font-serif font-bold text-slate-800 text-sm sm:text-base">
                  {p.title}
                </h4>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-primary text-xs uppercase tracking-widest font-bold">
              Our Advisors
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold mt-1 text-slate-800">
              Travel Concierges
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Swati Gupta",
                role: "Founder & CEO",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
              },
              {
                name: "Victoria Beaumont",
                role: "Director of Curation",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
              },
              {
                name: "Marcus Vance",
                role: "Head Concierge Advisor",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
              },
            ].map((m, i) => (
              <div
                key={i}
                className="group bg-white border border-slate-200/80 rounded-lg overflow-hidden text-center transition-all duration-200 hover:shadow-soft shadow-sm hover:border-slate-350"
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h4 className="font-serif font-bold text-slate-800 text-sm sm:text-base">
                    {m.name}
                  </h4>
                  <p className="text-xs text-primary mt-0.5 font-bold">
                    {m.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
