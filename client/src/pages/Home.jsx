import "./Home.css";
import React from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import { Container, TextField } from "@mui/material";
import Axios from "axios";
import SelectAirport from "../components/SelectAirport";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <div className="content">
        <Container maxWidth="xl">
          <div className="title-wrapper">
            <h1 className="title">Holiday24</h1>
            <div className="sub-title">
              Let's make your trip perfect!
             
            </div>
            <FilterBar></FilterBar>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
