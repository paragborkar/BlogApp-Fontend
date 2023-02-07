import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({title,description,imageURL,userName, isUser, id}) => {
    const navigate = useNavigate();
    const handleEdit = (e) =>{
        navigate(`/myBlogs/${id}`)
    }
    const deleteRequest = async ()=>{
        const res = await axios.delete(`https://mern-blogapp-backend.onrender.com/api/blog/${id}`).catch(err=>console.log(err));
        const data = await res.data;
        return data;
    }
    const handleDelete = () =>{
        deleteRequest().then(()=>navigate('/')).then(()=>('/blogs'))
    }
  return (
    <div>
      <Card sx={{ width: '40%', margin:'auto',mt:'2',padding:2,boxShadow:"10px 10px 20px #ccc",":hover:":{boxShadow:"10px 10px 20px #ccc"}}}>
        {isUser && <Box display={"flex"}>
            <IconButton  onClick={handleEdit} sx={{marginLeft:"auto"}} ><EditIcon/></IconButton>
            <IconButton onClick={handleDelete} ><DeleteIcon/></IconButton>
            </Box>}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {userName.charAt(0)}
          </Avatar>
        }
    
        title={userName}
      />
      <CardMedia
        component="img"
        height="auto"
        image={imageURL}
        alt="Paella dish"
      />

      <CardContent>
        <hr/>
        <br/>
        <Typography variant="body2" color="text.secondary">
         <b><h3>{title}</h3></b><br></br>Description:        {description}
        </Typography>
      </CardContent>    
    </Card>
    </div>
  )
}

export default Blog;
