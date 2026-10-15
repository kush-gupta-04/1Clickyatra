import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Mountain,
} from "lucide-react";
import Breadcrumbs from "../component/ui/Breadcrumbs.jsx";
import { articles } from "../data/blogArticles.js";

const BlogArticle = () => {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return <Navigate to="/blogs" replace />;
  }

  const relatedArticles = articles
    .filter((item) => item.id !== article.id)
    .slice(0, 3);
  const isAdventureGuide = article.category === "Adventure Guide";

  return (
    <article className="min-h-screen bg-slate-50 pb-20 pt-22 text-slate-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Blogs", path: "/blogs" },
            { name: article.title },
          ]}
        />

        <Link
          to="/blogs"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>

        {isAdventureGuide ? (
          <header
            className="relative mt-7 overflow-hidden rounded-[30px] bg-cover bg-center shadow-premium"
            style={{ backgroundImage: `url(${article.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/25" />
            <div className="relative max-w-3xl px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100 backdrop-blur">
                <Mountain className="h-4 w-4" />
                {article.category}
              </span>
              <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                {article.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-200">
                <span>{article.author}</span>
                <span>{article.publishedAt}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4 text-cyan-200" />
                  {article.readTime}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-cyan-200" />
                  {article.location}
                </span>
              </div>
            </div>
          </header>
        ) : (
          <>
            <header className="mx-auto mt-8 max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                {article.category}
              </p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                {article.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span>{article.author}</span>
                <span>{article.publishedAt}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4 text-primary" />
                  {article.readTime}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  {article.location}
                </span>
              </div>
            </header>

            <div
              role="img"
              aria-label={article.title}
              className="mt-9 h-64 overflow-hidden rounded-[28px] bg-cover bg-center shadow-premium sm:h-96"
              style={{ backgroundImage: `url(${article.image})` }}
            />
          </>
        )}

        <div
          className={`mx-auto mt-10 ${
            isAdventureGuide ? "max-w-5xl" : "max-w-3xl"
          }`}
        >
          {isAdventureGuide && (
            <>
              <section aria-label="Trip at a glance">
                <div className="mb-4 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold text-slate-900">
                    Your trip at a glance
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {article.quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                        {fact.label}
                      </p>
                      <p className="mt-2 font-bold text-slate-900">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    A relaxed route
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    A 4-day mountain escape
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {article.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-extrabold text-cyan-100">
                        {day.day}
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {day.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {day.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          <p className="border-l-4 border-primary pl-5 text-lg leading-8 text-slate-700">
            {article.details}
          </p>

          <div
            className={`mt-8 ${
              isAdventureGuide
                ? "grid gap-4 lg:grid-cols-3"
                : "space-y-9"
            }`}
          >
            {article.sections.map((section) => (
              <section
                key={section.heading}
                className={
                  isAdventureGuide
                    ? "rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
                    : ""
                }
              >
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {section.heading}
                </h2>
                {section.points ? (
                  <ul className="mt-4 space-y-3">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-sm leading-6 text-slate-600"
                      >
                        <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-base leading-8 text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))
                )}
              </section>
            ))}
          </div>

          {isAdventureGuide && (
            <section className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50 p-5 sm:p-7">
              <h2 className="text-xl font-bold text-slate-900">
                Mountain trip packing checklist
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Weather can shift quickly at altitude. Keep these essentials
                within easy reach on day trips.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {article.packingEssentials.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-700"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-10 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
              Make it your own
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Ready to plan your next escape?
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-slate-300">
              Explore our curated trips and find a journey that fits your
              schedule, travel style, and sense of adventure.
            </p>
            <Link
              to="/packages"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-cyan-100"
            >
              Explore packages
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <section className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold text-slate-900">Keep exploring</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                to={`/blogs/${related.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-primary hover:shadow-premium"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                  {related.category} · {related.readTime}
                </p>
                <h3 className="mt-3 font-bold leading-6 text-slate-900 group-hover:text-primary">
                  {related.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read story
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};

export default BlogArticle;
