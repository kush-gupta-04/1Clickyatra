import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import API from "../api/axios.js";
import { toBlogArticle } from "../utils/blogArticle.js";

const BlogArticle = () => {
  const { slug } = useParams();
  const staticArticle = articles.find((item) => item.slug === slug);
  const [remoteResult, setRemoteResult] = useState(null);

  useEffect(() => {
    let isActive = true;
    if (staticArticle) return undefined;

    API.get(`/blogs/${slug}`)
      .then((response) => {
        if (!response.data.success || !response.data.data) {
          throw new Error("The server returned an invalid blog post.");
        }
        if (isActive) {
          setRemoteResult({
            slug,
            article: toBlogArticle(response.data.data),
            error: "",
          });
        }
      })
      .catch((error) => {
        if (isActive) {
          setRemoteResult({
            slug,
            article: null,
            error:
              error.response?.data?.message ||
              "Unable to load this article. Please try again later.",
          });
        }
      });

    return () => {
      isActive = false;
    };
  }, [slug, staticArticle]);

  const article =
    staticArticle ||
    (remoteResult?.slug === slug ? remoteResult.article : null);
  const loading = !staticArticle && remoteResult?.slug !== slug;
  const loadError =
    !staticArticle && remoteResult?.slug === slug ? remoteResult.error : "";

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f8f7f3] px-4 py-24 text-center text-slate-800">
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          {loading ? "Finding your story..." : "This story is unavailable"}
        </h1>
        {loadError && (
          <p role="alert" className="mx-auto mt-3 max-w-lg text-sm text-rose-700">
            {loadError}
          </p>
        )}
        <Link
          to="/blogs"
          className="mt-5 inline-flex font-semibold text-primary hover:text-primary-dark"
        >
          Back to the travel journal
        </Link>
      </div>
    );
  }

  const relatedArticles = articles
    .filter((item) => item.id !== article.id)
    .slice(0, 3);
  const hasAdventureDetails =
    article.category === "Adventure Guide" &&
    Array.isArray(article.quickFacts) &&
    Array.isArray(article.itinerary);

  return (
    <article className="min-h-screen bg-[#f8f7f3] pb-20 pt-22 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Travel Journal", path: "/blogs" },
            { name: article.title },
          ]}
        />

        <Link
          to="/blogs"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          All stories
        </Link>

        <header className="relative isolate mt-5 flex min-h-[480px] overflow-hidden rounded-[28px] bg-slate-900 text-white sm:min-h-[540px]">
          <img
            src={article.image}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/10" />
          <div className="mt-auto w-full px-6 pb-8 pt-24 sm:px-10 sm:pb-12 lg:px-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.17em] text-white backdrop-blur-sm">
              {hasAdventureDetails && <Mountain className="h-4 w-4" />}
              {article.category}
            </span>
            <h1 className="mt-5 max-w-4xl font-serif text-3xl font-extrabold leading-tight sm:text-4xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              {article.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-200">
              <span className="font-semibold text-white">{article.author}</span>
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

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
          <div className="min-w-0">
            <p className="border-l-4 border-primary pl-5 font-serif text-lg leading-8 text-slate-700 sm:text-xl">
              {article.details}
            </p>

            {hasAdventureDetails && (
              <section aria-label="Trip at a glance" className="mt-10">
                <div className="mb-4 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    Your trip at a glance
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {article.quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-xl border border-slate-200 bg-white p-4"
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
            )}

            {hasAdventureDetails && (
              <section className="mt-12">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
                  A relaxed route
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold text-slate-950 sm:text-3xl">
                  A 4-day mountain escape
                </h2>
                <div className="mt-5 space-y-3">
                  {article.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-extrabold text-white">
                        {day.day.replace("Day ", "")}
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {day.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-6 text-slate-600">
                          {day.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-12 space-y-10">
              {article.sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={`story-section-${index + 1}`}
                  className="scroll-mt-28"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                    Chapter {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-slate-950 sm:text-3xl">
                    {section.heading}
                  </h2>
                  {section.points ? (
                    <ul className="mt-5 space-y-3">
                      {section.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700"
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

            {hasAdventureDetails &&
              Array.isArray(article.packingEssentials) && (
                <section
                  id="packing-checklist"
                  className="mt-12 scroll-mt-28 rounded-2xl bg-cyan-50 p-5 sm:p-7"
                >
                  <h2 className="font-serif text-2xl font-bold text-slate-950">
                    Mountain trip packing checklist
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Weather can shift quickly at altitude. Keep these
                    essentials close on day trips.
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

            <section className="mt-12 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                Make it your own
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold">
                Ready to plan your next escape?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Explore curated trips and find a journey that fits your
                schedule, travel style, and sense of adventure.
              </p>
              <Link
                to="/packages"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-cyan-100"
              >
                Explore trips
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                In this story
              </p>
              <nav aria-label="Article contents" className="mt-4 space-y-1">
                {hasAdventureDetails && (
                  <a
                    href="#packing-checklist"
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-primary"
                  >
                    Packing checklist
                  </a>
                )}
                {article.sections.map((section, index) => (
                  <a
                    key={section.heading}
                    href={`#story-section-${index + 1}`}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold leading-5 text-slate-600 transition hover:bg-slate-50 hover:text-primary"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </div>
            <div className="mt-4 rounded-2xl bg-[#eaf4f4] p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                Travel note
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Keep plans flexible, respect local customs, and check current
                weather and access conditions before you set out.
              </p>
            </div>
          </aside>
        </div>

        {relatedArticles.length > 0 && (
          <section className="mx-auto mt-16 max-w-6xl border-t border-slate-200 pt-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
              Continue exploring
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-slate-950">
              More stories for your journey
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/blogs/${related.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-premium"
                >
                  <img
                    src={related.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[1.6] w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                      {related.category} · {related.readTime}
                    </p>
                    <h3 className="mt-2 font-serif text-lg font-bold leading-6 text-slate-900 group-hover:text-primary">
                      {related.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-slate-700">
                      Read story
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

export default BlogArticle;
