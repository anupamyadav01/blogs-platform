import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Blogs from "./pages/blogs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateBlogs from "./components/CreateBlog";
import UpdateBlog from "./components/updateBlog";
import Error from "./pages/error";

import UserContextProvider from "./context/UserContextProvider";

const App = () => {
  return (
    <UserContextProvider>
      <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6">
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-blog" element={<CreateBlogs />} />

            <Route path="/update-blog/:id" element={<UpdateBlog />} />
            <Route path="/update-blog" element={<UpdateBlog />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
      </div>
    </UserContextProvider>
  );
};

export default App;
