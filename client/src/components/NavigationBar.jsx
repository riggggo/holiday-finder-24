import "./NavigationBar.css";
import React from "react";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { ThemeProvider } from "@emotion/react";
export default function NavigationBar() {
  const navigate = useNavigate();
//<AppBar style={{ background: '#2E3B55' }}>
  return (
  
    <AppBar position="static" color="primary" className="navigation-bar">
      <Toolbar>
      <IconButton onClick={() => navigate(-1)} size="small" color="inherit">
          <ArrowBackIcon />
        </IconButton>
        <IconButton component={Link} to="/" size="small" color="inherit">
          <HomeOutlinedIcon />
        </IconButton>

        <div style={{ flex: 1 }} />
      </Toolbar>
    </AppBar>

   
    
   
  );
}