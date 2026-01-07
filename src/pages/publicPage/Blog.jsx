import React, { useState, useMemo } from "react";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { Link } from "react-router";
import { blogPosts } from "../../../public/blogData";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Travel Tips", "Budget Travel", "Inspiration"];

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter((post) =>
        selectedCategory === "All"
          ? true
          : post.category === selectedCategory
      )
      .filter((post) => {
        const text = (post.title + post.excerpt).toLowerCase();
        return text.includes(searchTerm.toLowerCase());
      });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero / Header */}
        <section className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Travel Blog & Stories
            </h1>
            <p className="text-white/80 max-w-2xl text-sm md:text-base">
              Tips, guides, and inspiration to help you plan your next
              adventure.
            </p>

            {/* Search & Filter */}
            <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 
                             text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs rounded-full border text-white
                      ${
                        selectedCategory === cat
                          ? "bg-primary border-primary"
                          : "bg-transparent border-white/40 hover:bg-white/10"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog List */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            {filteredPosts.length === 0 && (
              <p className="text-center text-gray-500">
                No articles found. Try a different search or category.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
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
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-[11px] font-medium">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span>{post.author.name}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
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
      </main>

      <Footer />
    </div>
  );
};

export default Blog;