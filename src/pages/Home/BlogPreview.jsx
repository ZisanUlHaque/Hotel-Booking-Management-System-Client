// src/Components/BlogPreview.jsx
import React from "react";
import { Link } from "react-router";

const BlogPreview = () => {
  const posts = [
    {
      id: 1,
      title: "Top 10 European Cities You Must Visit in 2025",
      category: "Travel Tips",
      date: "Jan 5, 2025",
      image:
        "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
      excerpt:
        "From Paris to Prague, discover the European cities that should be on your bucket list this year.",
    },
    {
      id: 2,
      title: "How to Plan a Budget-Friendly Trip Without Compromising",
      category: "Budget Travel",
      date: "Dec 20, 2024",
      image:
        "https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg",
      excerpt:
        "Smart tips to save money on flights, hotels, and activities while still enjoying your vacation.",
    },
    {
      id: 3,
      title: "5 Underrated Destinations in Asia You’ll Fall in Love With",
      category: "Inspiration",
      date: "Nov 10, 2024",
      image:
        "https://images.pexels.com/photos/5205083/pexels-photo-5205083.jpeg",
      excerpt:
        "Skip the crowds and explore lesser-known gems that offer authentic culture and stunning views.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="text-primary font-medium uppercase tracking-wide text-xs">
              Travel Blog
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
              Latest Stories & Tips
            </h2>
            <p className="text-gray-500 text-sm max-w-md mt-2">
              Get inspired and learn how to make the most of your next trip.
            </p>
          </div>
          <Link
            to="/blog"
            className="text-sm font-medium text-primary border-b border-primary self-start"
          >
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100"
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-white rounded-full border text-[11px] font-medium">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-xs mb-3 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-xs font-medium text-primary"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;