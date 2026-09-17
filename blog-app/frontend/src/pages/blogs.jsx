import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";

const Blogs = () => {
  const { token } = useContext(UserContext);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogs, setBlogs] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const updateLocalState = () => {
    setBlogs((previousBlogs) =>
      previousBlogs.map((blog) =>
        blog?._id === editingBlog?._id ? formData : blog,
      ),
    );
  };

  // update blog
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/v1/blogs/${editingBlog?._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to update blog");
    }

    const data = await response.json();
    updateLocalState();
    setEditingBlog(null);
    console.log(data);
  };
  // delete blog
  const handleDelete = async (editingBlog) => {
    const response = await fetch(
      `http://localhost:5000/api/v1/blogs/${editingBlog?._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    setBlogs((previousBlogs) =>
      previousBlogs.filter((blog) => blog._id !== editingBlog._id),
    );
    console.log(data);
  };

  const handleChangeTitle = (e) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };
  const handleChangeDesc = (e) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  // get all blogs
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/v1/blogs/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const blogsData = await response.json();
      setBlogs(blogsData?.blogs);
      // updateLocalState();
    };
    fetchData();
  }, []);

  const handleUpdateClick = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
    });
    // console.log("current blog", editingBlog);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFDFD] px-4 py-12 text-gray-900 sm:px-6">
      <div className="relative flex max-w-6xl flex-col items-center justify-center">
        {editingBlog ? (
          <div className="absolute w-full rounded-2xl border border-black bg-white p-6 shadow-sm sm:p-10">
            {/* Header */}
            <div className="mb-8 border-b border-slate-100 pb-5">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Update Blog
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Share your thoughts, stories, and ideas with the community.
              </p>
            </div>

            {/* Blog Form */}
            <form onSubmit={handleSubmitUpdate} className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData?.title}
                  onChange={handleChangeTitle}
                  placeholder="e.g. Getting Started with Modern Web Development"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Content / Body */}
              <div>
                <label
                  htmlFor="content"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  value={formData?.description}
                  onChange={handleChangeDesc}
                  placeholder="Write your story here..."
                  required
                  className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-4">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                  Publish Post
                </button>
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="cursor-pointer rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 focus:ring-2 focus:ring-slate-400 focus:outline-none"
                >
                  Cancel update
                </button>
              </div>
            </form>
          </div>
        ) : (
          <></>
        )}
        <div className="mb-4">
          <h1 className="font-serif text-3xl font-bold tracking-tight">
            Stories
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs?.map((post) => (
            <article
              key={post?._id || post?.id}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg"
            >
              {/* Top Section: Author & Action Buttons */}
              <div>
                <div className="mb-4 flex items-center justify-between gap-2 border-b border-zinc-100 pb-3.5">
                  {/* Author Badge */}
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white uppercase">
                      {post?.creator?.name?.[0] || "A"}
                    </div>
                    <span className="truncate text-xs font-medium text-zinc-600">
                      {post?.creator?.name || "Anonymous"}
                    </span>
                  </div>

                  {/* Action Buttons: Minimalist & Clean */}
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      onClick={() => handleUpdateClick(post)}
                      type="button"
                      className="inline-flex cursor-pointer items-center rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post)}
                      type="button"
                      className="inline-flex cursor-pointer items-center rounded-md border border-red-200/60 bg-red-50/50 px-2.5 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 hover:text-red-700 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Content Section: Title & Description */}
                <div>
                  <h2 className="line-clamp-2 cursor-pointer font-serif text-lg leading-snug font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-600 sm:text-xl">
                    {post?.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500">
                    {post?.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Subtle Read More / Meta Hint */}
              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-400">
                <span className="font-mono text-[11px]">
                  {post?.draft ? "Draft" : "Published"}
                </span>
                <span className="cursor-pointer font-medium text-zinc-900 underline-offset-4 group-hover:underline">
                  Read Story →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
