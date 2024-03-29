import Header from "./components/Header";
import React, { useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import axios from "axios";
import { useSelector } from "react-redux";

function App() {
const isLoggedIn = useSelector(state=> state.isLoggedIn);
console.log(isLoggedIn);
 useEffect(()=>{
  const res =  axios.get('https://mern-blogapp-backend.onrender.com/api/blog');
 },[])
  return (
    <React.Fragment>
      <header><Header/></header>
      <main>
        <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/myBlogs" element={<UserBlogs/>} />
          <Route path="/myBlogs/:id" element={<BlogDetail/>} />
          <Route path="/blogs/add" element={<AddBlog/>} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
