import { getMediaUrl } from "../api/axios.js";

const formatPublishedDate = (date) => {
  if (!date) return "Recently published";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Recently published";

  return parsedDate.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const toBlogArticle = (blog) => {
  const content = blog.content?.trim() || "";
  const paragraphs = content.split(/\n\s*\n/).filter(Boolean);
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const excerpt = paragraphs[0] || content;
  const shortExcerpt =
    excerpt.length > 190 ? `${excerpt.slice(0, 187).trim()}...` : excerpt;

  return {
    id: blog._id,
    slug: blog.slug,
    title: blog.title,
    category: blog.category,
    readTime: `${Math.max(1, Math.ceil(wordCount / 200))} min read`,
    location: blog.location || "Travel Journal",
    image: getMediaUrl(blog.thumbnail),
    excerpt: shortExcerpt,
    details: shortExcerpt,
    badge: "From the journal",
    author: blog.author || "1ClickYatra Travel Desk",
    publishedAt: formatPublishedDate(blog.createdAt),
    sections: [
      {
        heading: "The story",
        paragraphs: paragraphs.length ? paragraphs : [content],
      },
    ],
  };
};
