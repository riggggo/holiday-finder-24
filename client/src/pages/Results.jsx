
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { Container, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
export default function Results() {




  const [searchResults, setSearchResults] = React.useState([]);
  useEffect(() => {
    fetch("api/getSearchResults/${query}/${filterString}")
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.searchResults); //set to airports varibale
      });
  }, []);


 const [searchParams, setSearchParams] = useSearchParams();
console.log(searchParams);

//TODO



  return (
    <div>
      
      <div className="content">
      <NavigationBar />
        <Container maxWidth="lg">
          <div className="title-wrapper">
            <h1 className="title">Holiday24</h1>
            <div className="sub-title">Find your perfect trip!</div>
            <div className="search-wrapper">
            <Search ></Search>
            </div>
            
          </div>
        </Container>
        <Container maxWidth="lg">
          <div className="title-wrapper">
            <div className="sub-title">Results:</div>
            <div className="search-wrapper">
            
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
