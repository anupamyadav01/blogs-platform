import { Routes, Route } from "react-router-dom";
import "./App.css";
import Blogs from "./pages/blogs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateBlogs from "./components/createBlogs";
import Error from "./pages/error";
import UpdateBlog from "./components/updateBlog";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-blog" element={<CreateBlogs />} />
      <Route path="/update-blog" element={<UpdateBlog />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
