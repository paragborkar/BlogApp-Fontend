import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import axios from "axios";
import { useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";

function App() {
const [openToast, setOpenToast] = useState(false);
const isLoggedIn = useSelector(state=> state.isLoggedIn);
console.log(isLoggedIn);
 useEffect(()=>{
  setOpenToast(true);
  axios.get('https://mern-blogapp-backend.onrender.com/api/health').catch(err => console.log(err));
 },[])

 const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

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
      <Snackbar 
        open={openToast} 
        autoHideDuration={8000} 
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
          Please note: The backend server is hosted on a free tier and might take a moment to start for the first time.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default App;
