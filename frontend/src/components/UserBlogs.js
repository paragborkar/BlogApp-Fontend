import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Blog from './Blog';

const UserBlogs = () => {
  const [user, setUser]= useState();
  const id= localStorage.getItem("userId");
  const sendRequest = async () =>{
    const res = await axios.get(`https://mern-blogapp-backend.onrender.com/api/blog/user/${id}`).catch(err =>console.log(err));
    const data= await res.data;
    return data;
  }
  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.user));
  },);
  return (
    <div>
     {user && user.blogs && user.blogs.map((blogs,index)=>(
      <Blog isUser={true} id={blogs._id} key={index} title={blogs.title} description={blogs.description} imageURL={blogs.image} userName={user.name} />
    ))}
    </div>
  )
}

export default UserBlogs
