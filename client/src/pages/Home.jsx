import React from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { Container, TextField } from "@mui/material";

export default function Home() {
  const today = new Date();
  const defaultFilters = {
    timeTo: new Date(today.getFullYear(), today.getMonth(), today.getDate()+21),
    timeFrom: new Date(),
    adults: 1,
    children: 0,
    airport: [],
    destination:"Mallorca"
  }
  return (
    <div>
      
      <div className="content">
      <NavigationBar />
        <Container maxWidth="lg" sx={{ padding: 0 }}>
          <div className="title-wrapper">
            <h1 className="title">Holiday24</h1>
            <div className="sub-title">Find your perfect trip!</div>
            <div className="search-wrapper">
            <Search filters={defaultFilters} ></Search>
            </div>
            
          </div>
        </Container>
      </div>
      <div className="footer">
        <Footer />
      </div>
      
    </div>
  );
}
