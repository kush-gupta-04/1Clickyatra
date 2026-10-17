import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import Breadcrumbs from "../component/ui/Breadcrumbs.jsx";
import { articles, categories } from "../data/blogArticles.js";
import API from "../api/axios.js";
import { toBlogArticle } from "../utils/blogArticle.js";

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [allArticles, setAllArticles] = useState(articles);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isActive = true;

    API.get("/blogs")
      .then((response) => {
        if (!response.data.success || !Array.isArray(response.data.data)) {
          throw new Error("The server returned an invalid blog list.");
        }

        const publishedArticles = response.data.data.map(toBlogArticle);
        const publishedSlugs = new Set(
          publishedArticles.map((article) => article.slug),
        );
        if (isActive) {
          setAllArticles([
            ...publishedArticles,
            ...articles.filter((article) => !publishedSlugs.has(article.slug)),
          ]);
        }
      })
      .catch((error) => {
        if (isActive) {
          setLoadError(
            error.response?.data?.message ||
              "Could not load the latest stories. Showing our featured travel guides.",
          );
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const availableCategories = useMemo(
    () =>
      [
        ...categories,
        ...allArticles.map((article) => article.category),
      ].filter((category, index, list) => list.indexOf(category) === index),
    [allArticles],
  );

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All Posts") return allArticles;
    return allArticles.filter(
      (article) => article.category === selectedCategory,
    );
  }, [allArticles, selectedCategory]);

  const featuredArticle = filteredArticles[0];

  return (
    <div className="min-h-screen bg-[#f8f7f3] pb-20 pt-22 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Travel Journal" }]} />

        <header className="grid gap-6 py-8 sm:py-12 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-primary">
              The 1ClickYatra Journal
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-extrabold leading-[1.08] text-slate-950 sm:text-5xl lg:text-6xl">
              Go beyond the itinerary.
            </h1>
          </div>
          <p className="max-w-xl pb-1 text-base leading-7 text-slate-600 lg:justify-self-end">
            Destination ideas, thoughtful itineraries, and little details that
            make a journey feel like your own. Find a story for wherever you
            want to go next.
          </p>
        </header>

        {loadError && (
          <p
            role="status"
            className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            {loadError}
          </p>
        )}

        {featuredArticle && (
          <section aria-label="Featured travel story">
            <Link
              to={`/blogs/${featuredArticle.slug}`}
              className="group relative isolate flex min-h-[440px] overflow-hidden rounded-[28px] bg-slate-900 text-white shadow-premium sm:min-h-[500px]"
            >
              <img
                src={featuredArticle.image}
                alt=""
                className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/5" />
              <div className="mt-auto max-w-3xl p-6 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-white/85">
                  <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                    {featuredArticle.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {featuredArticle.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {featuredArticle.location}
                  </span>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                  Editor&apos;s story
                </p>
                <h2 className="mt-2 max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {featuredArticle.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-100 sm:text-base">
                  {featuredArticle.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 transition group-hover:bg-cyan-100">
                  Read the story
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </section>
        )}

        <section id="stories" className="scroll-mt-28 pt-14 sm:pt-16">
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
                Inspiration for the road ahead
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-slate-950 sm:text-4xl">
                Stories worth travelling for
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              {filteredArticles.length}{" "}
              {filteredArticles.length === 1 ? "story" : "stories"}
            </p>
          </div>

          <div
            aria-label="Filter stories by category"
            className="flex gap-2 overflow-x-auto py-5"
          >
            {availableCategories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isSelected
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {filteredArticles.length ? (
            <div className="grid gap-x-6 gap-y-10 pt-2 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <article key={article.id} className="group">
                  <Link
                    to={`/blogs/${article.slug}`}
                    className="relative block aspect-[1.42] overflow-hidden rounded-2xl bg-slate-200"
                    aria-label={`Read ${article.title}`}
                  >
                    <img
                      src={article.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-800 shadow-soft">
                      {article.category}
                    </span>
                  </Link>

                  <div className="pt-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {article.location}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="mt-3 font-serif text-xl font-bold leading-7 text-slate-900 transition group-hover:text-primary sm:text-2xl">
                      <Link to={`/blogs/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                      {article.excerpt}
                    </p>
                    <Link
                      to={`/blogs/${article.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition hover:text-primary"
                    >
                      Explore story
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-slate-500">
              There are no stories in this category yet.
            </p>
          )}
        </section>

        <section className="mt-16 flex flex-col gap-5 rounded-[28px] bg-slate-900 p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
              Your next chapter
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
              Found a place you can&apos;t stop thinking about?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Browse thoughtfully planned trips and turn your saved inspiration
              into a journey.
            </p>
          </div>
          <Link
            to="/packages"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-cyan-100"
          >
            Explore trips
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
