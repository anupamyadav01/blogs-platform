import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Blogs = () => {
  const { user } = useContext(UserContext);

  const [currentBlog, setCurrentBlog] = useState(null);

  const [blogs, setBlogs] = useState();
  const [blogId, setBlogId] = useState();
  const [showUpdateDialogBox, setShowUpdateDialogBox] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("User"));

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/v1/blogs/${blogId}`,
      {
        method: "PATCH",
        body: JSON.stringify(currentBlog),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
      },
    );
    const data = await response.json();
    setCurrentBlog(null);
    setShowUpdateDialogBox(false);
    console.log(data);
  };

  const handleDelete = async (currentBlog) => {
    setCurrentBlog(currentBlog);
    console.log(currentBlog);

    setBlogId(currentBlog?._id);
    // e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/v1/blogs/${blogId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
      },
    );
    const data = await response.json();
    console.log(data);
  };

  const handleChangeTitle = (e) => {
    setCurrentBlog((prev) => ({ ...prev, title: e.target.value }));
  };
  const handleChangeDesc = (e) => {
    setCurrentBlog((prev) => ({ ...prev, description: e.target.value }));
  };

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
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleClick = (e) => {
    const name = e.target.name;
    console.log(e.target.name);

    if (name === "create-blog") {
      navigate("/create-blog");
    } else if (name === "login") {
      navigate("/login");
    } else if (name === "sign-up") {
      navigate("/signup");
    }
  };

  const handleUpdateClick = (currentBlog) => {
    setCurrentBlog(currentBlog);
    console.log("current blog", currentBlog);
    setBlogId(currentBlog?._id);
    setShowUpdateDialogBox(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] px-4 py-12 text-gray-900 sm:px-6">
      <div className="flex max-w-4/5 items-center justify-end gap-3 p-3">
        <button
          name="create-blog"
          onClick={handleClick}
          type="button"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Blog
        </button>
        {user ? (
          <div className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none">
            {user?.name[0]}
          </div>
        ) : (
          <div>
            <button
              name="login"
              onClick={handleClick}
              type="button"
              className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none"
            >
              Login
            </button>

            <button
              name="sign-up"
              onClick={handleClick}
              type="button"
              className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
      <div className="relative mx-auto max-w-3xl">
        {showUpdateDialogBox ? (
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
                  value={currentBlog?.title}
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
                  value={currentBlog?.description}
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
                  type="submit"
                  onClick={() => setShowUpdateDialogBox(false)}
                  className="cursor-pointer rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 focus:ring-2 focus:ring-slate-400 focus:outline-none"
                >
                  Cancel update
                </button>
              </div>
            </form>
          </div>
        ) : (
          ""
        )}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="font-serif text-3xl font-bold tracking-tight">
            Stories
          </h1>
        </div>
        <div className="flex flex-col gap-4 divide-y divide-gray-100">
          {blogs?.map((post, index) => (
            <article key={index} className="rounded-xl bg-slate-300 p-3">
              <div className="flex justify-between p-2">
                <p className="mb-2 font-mono text-sm text-gray-500">
                  Author Name: {post?.creator.name}
                </p>
                <div>
                  <button
                    name="create-blog"
                    onClick={() => {
                      handleUpdateClick(post);
                    }}
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none"
                  >
                    Update
                  </button>{" "}
                  <button
                    name="create-blog"
                    onClick={() => {
                      handleDelete(post);
                    }}
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-300 bg-red-500 px-4 py-2 text-sm font-medium text-blue-50 transition-colors hover:bg-red-600 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <h2 className="cursor-pointer font-serif text-xl leading-snug font-bold text-gray-900 hover:text-gray-600 sm:text-2xl">
                {post?.title}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                {post.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
