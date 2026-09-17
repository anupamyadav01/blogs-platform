import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const name = e.target.name;
    if (name === "login") {
      navigate("/login");
    } else if (name === "sign-up") {
      navigate("/signup");
    }
  };

  const handleWriteBlog = () => {
    console.log("helo");
    navigate("/create-blog");
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? "px-4 pt-3 sm:px-6" : "px-0 pt-0"
      }`}
    >
      <nav
        className={`pointer-events-auto flex w-full items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "max-w-5xl rounded-full border border-white/50 bg-white/40 px-5 py-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xs backdrop-saturate-150"
            : "max-w-full rounded-none border-b border-zinc-200/70 bg-[#FDFDFD] px-6 py-4 shadow-none backdrop-blur-none sm:px-10"
        }`}
      >
        <div className="flex cursor-pointer items-center gap-2.5 select-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white shadow-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-zinc-900">
            Scribe<span className="text-zinc-400">.</span>
          </span>
        </div>

        <div className="hidden items-center gap-6 text-xs font-semibold tracking-wider text-black uppercase md:flex">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer transition-colors hover:text-zinc-950"
          >
            Stories
          </button>
          <button
            type="button"
            className="cursor-pointer transition-colors hover:text-zinc-950"
          >
            Featured
          </button>
          <button
            type="button"
            className="cursor-pointer transition-colors hover:text-zinc-950"
          >
            Community
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            name="create-blog"
            onClick={handleWriteBlog}
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-900 shadow-2xs transition-all hover:border-zinc-300 hover:bg-zinc-50 focus:outline-none active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
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
            <span className="hidden sm:inline">Write</span>
          </button>

          {user ? (
            <div className="group relative inline-flex cursor-pointer items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold tracking-wider text-white uppercase shadow-xs ring-2 ring-zinc-100 transition-all duration-200 ease-out group-hover:scale-105 group-hover:bg-zinc-800">
                {user?.name?.[0] || "U"}
              </div>
              <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full border border-white bg-emerald-500" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                name="login"
                onClick={handleClick}
                type="button"
                className="cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-950 focus:outline-none"
              >
                Sign In
              </button>
              <button
                name="sign-up"
                onClick={handleClick}
                type="button"
                className="cursor-pointer rounded-full bg-zinc-950 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs transition-colors hover:bg-zinc-800 focus:outline-none active:scale-95"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
