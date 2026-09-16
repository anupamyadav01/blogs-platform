import { useState } from "react";
import { Navigate } from "react-router-dom";

const CreateBlogs = () => {
  const [userData, setUserData] = useState({
    title: "",
    description: "",
  });
  const user = JSON.parse(localStorage.getItem("User"));

  if (!user?.token) {
    return <Navigate to={"/login"} />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/v1/blogs/", {
      method: "POST",
      body: JSON.stringify(userData, user.token),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleChange1 = (e) => {
    setUserData((prev) => ({ ...prev, description: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        {/* Header */}
        <div className="mb-8 border-b border-slate-100 pb-5">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create a New Blog
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Share your thoughts, stories, and ideas with the community.
          </p>
        </div>

        {/* Blog Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={userData.title}
              onChange={handleChange}
              placeholder="e.g. Getting Started with Modern Web Development"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Category */}
            {/* <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="health">Health & Fitness</option>
              </select>
            </div> */}

            {/* Tags */}
            {/* <div>
              <label
                htmlFor="tags"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="react, tailwind, webdev"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div> */}
          </div>

          {/* Cover Image URL */}
          {/* <div>
            <label
              htmlFor="coverImage"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Cover Image URL
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div> */}

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
              value={userData.content}
              onChange={handleChange1}
              placeholder="Write your story here..."
              required
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-4">
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogs;
