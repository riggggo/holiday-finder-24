import "./Home.css";
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { Container, TextField } from "@mui/material";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <div className="content">
        <Container maxWidth="xl">
          <div className="title-wrapper">
            <h1 className="title">Holiday24</h1>
            <div className="sub-title">
              Summer is coming, let's make your trip perfect!
             
            </div>
            
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
