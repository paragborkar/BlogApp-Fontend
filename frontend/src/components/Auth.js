import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {useDispatch} from 'react-redux';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {authActions} from '../store/index';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name:'',email:'',password:''
  });
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(inputs);
    if(isSignup)
    {
    sendRequest('signup').then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")).then(data=> console.log(data));
    }else{
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")).then(data=> console.log(data));
    }
  }
 
  const sendRequest = async (type="login")=> {
      const res = await axios.post(`https://mern-blogapp-backend.onrender.com/api/user/${type}`,{
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    }).catch(err=>alert("User Not Found,Please Signup"));
    const data = await res.data;
    console.log(data);
    return data;
  }
  const handleChange = (e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }));
  }
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={400} display="flex" flexDirection={'column'} alignItems="center" justifyContent={'center'} boxShadow="10px 10px 20px #ccc" padding={3} margin='auto' marginTop={5} borderRadius={5}>
          <Typography padding={3} variant="h2" textAlign="center" >{!isSignup ? "Login" : "Signup"}</Typography>
         { isSignup && <TextField margin='normal' name='name' value={inputs.name} onChange={handleChange} placeholder='Name' />}
          <TextField margin='normal' name='email' onChange={handleChange} type={'email'}  value={inputs.email} placeholder='Email' />
          <TextField margin='normal' name='password' onChange={handleChange}type={'password'}value={inputs.password} placeholder='Password' />
          <Button sx={{borderRadius:3, marginTop:3}} variant="contained" color='warning' type='submit'>Submit</Button>
          <Button onClick={() =>setIsSignup(!isSignup)} sx={{borderRadius:3, marginTop:3}} >Change To {isSignup ? "Login" : "Signup"}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth;
