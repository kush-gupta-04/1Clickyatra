import Breadcrumbs from "../component/ui/Breadcrumbs.jsx";
import { articles, categories } from "../data/blogArticles.js";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock3, MapPin, Star } from "lucide-react";

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [activeArticle, setActiveArticle] = useState(articles[0]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All Posts") return articles;
    return articles.filter((article) => article.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const firstArticleInCategory =
      category === "All Posts"
        ? articles[0]
        : articles.find((article) => article.category === category) ||
          articles[0];
    setActiveArticle(firstArticleInCategory);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-22 pb-20 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Blogs" }]} />

        <header className="mt-6 mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Travel Journal
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
            Discover stories worth taking the long way for.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Handpicked inspiration for weekend escapes, cultural adventures, and
            easy luxury holidays designed around how real travellers love to
            move.
          </p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${
                selectedCategory === category
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="overflow-hidden rounded-[28px] bg-white shadow-premium ring-1 ring-slate-200">
            <div
              className="h-72 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${activeArticle.image})` }}
            />

            <div className="p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <span className="rounded-full bg-primary-light px-2.5 py-1 text-primary">
                  {activeArticle.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {activeArticle.readTime}
                </span>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">
                  {activeArticle.badge}
                </span>
              </div>

              <h2 className="max-w-xl text-2xl font-bold text-slate-900 sm:text-3xl">
                {activeArticle.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {activeArticle.details}
              </p>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-primary" />
                  {activeArticle.location}
                </div>
                <Link
                  to={`/blogs/${activeArticle.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] bg-slate-900 p-6 text-white shadow-premium">
            <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
              <Star className="h-4 w-4 fill-current text-amber-300" />
              Top reads
            </div>

            <div className="space-y-4">
              {filteredArticles.slice(0, 3).map((article) => (
                <button
                  key={article.id}
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    activeArticle.id === article.id
                      ? "border-cyan-400 bg-white/10"
                      : "border-white/10 bg-white/5 hover:bg-white/8"
                  }`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                    {article.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-6 text-white">
                    {article.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                    <span>{article.location}</span>
                    <span>{article.readTime}</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Latest articles
            </h2>
            <span className="text-sm text-slate-500">
              {filteredArticles.length}{" "}
              {filteredArticles.length === 1 ? "article" : "articles"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className={`overflow-hidden rounded-[24px] border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-premium ${
                  activeArticle.id === article.id
                    ? "border-primary shadow-premium"
                    : "border-slate-200"
                }`}
              >
                <div
                  className="h-52 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${article.image})` }}
                />

                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-7 text-slate-900">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {article.excerpt}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 text-primary" />
                      {article.location}
                    </div>
                    <Link
                      to={`/blogs/${article.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary-dark"
                    >
                      View article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
