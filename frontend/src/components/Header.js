import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {AppBar, Button, Toolbar, Typography, Box, Tab, Tabs} from '@mui/material';
import { authActions } from '../store';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn= useSelector(state => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <div>
    <AppBar sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(89,165,208,1) 35%, rgba(0,212,255,1) 100%)"}} position="sticky">
        <Toolbar>
            <Typography variant="h4">BlogsApp</Typography>
           
            <Box display="flex" marginLeft="auto">
                {!isLoggedIn && <><Button variant="contained" sx={{margin:'1', borderRadius: 10}} color="warning" LinkComponent={Link} to="/auth">Login</Button></>}
                {isLoggedIn && <Button variant="contained" sx={{margin:'1', borderRadius: 10}} color="warning" LinkComponent={Link} to="/auth" onClick={()=>dispatch(authActions.logout())}>Logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>
    { isLoggedIn &&<AppBar sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(89,165,208,1) 35%, rgba(0,212,255,1) 100%)"}} position="sticky">
    <Toolbar>
         <Box marginLeft={"auto"} marginRight="auto">
          <Tabs textColor="inherit" value={value} onChange={(e,val)=>setValue(val)} >
          <Tab label="All Blogs" LinkComponent={Link} to="/blogs" />
          <Tab label="My Blogs"  LinkComponent={Link} to="/myblogs"/>
          <Tab label="Add Blogs"  LinkComponent={Link} to="/blogs/add"/>
          </Tabs>
        </Box>
       
    </Toolbar>
</AppBar>}
</div>
  )
}

export default Header;
