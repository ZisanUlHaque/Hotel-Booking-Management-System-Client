import React from "react";
import { useParams, Link } from "react-router";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { getPostById, blogPosts } from "../../../public/blogData";

const BlogDetails = () => {
  const { id } = useParams();
  const post = getPostById(id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Article Not Found
            </h2>
            <Link to="/blog" className="text-primary underline text-sm">
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Suggest 2 other posts
  const related = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
            <p className="text-xs text-white/80 mb-2">{post.category}</p>
            <h1 className="text-2xl md:text-4xl font-bold mb-3">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        <section className="bg-black">
          <div className="max-w-5xl mx-auto">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[260px] md:h-[360px] object-cover"
            />
          </div>
        </section>

        {/* Content */}
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            {/* Author */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800 text-sm">
                  {post.author.name}
                </p>
                <p className="text-xs text-gray-500">{post.author.role}</p>
              </div>
            </div>

            {/* Article Text */}
            <div className="prose prose-sm md:prose-base max-w-none text-gray-700">
              {post.content.map((para, idx) => (
                <p key={idx} className="mb-4">
                  {para}
                </p>
              ))}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Back + Share */}
            <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <Link
                to="/blog"
                className="text-sm text-primary font-medium inline-flex items-center gap-1"
              >
                ← Back to Blog
              </Link>
              <p className="text-xs text-gray-400">
                Share this article with friends who love to travel.
              </p>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="py-10 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                You might also like
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={`/blog/${item.id}`}
                    className="bg-white rounded-xl p-4 border border-gray-100 hover:border-primary"
                  >
                    <p className="text-xs text-gray-500 mb-1">
                      {item.category} • {item.date}
                    </p>
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {item.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetails;