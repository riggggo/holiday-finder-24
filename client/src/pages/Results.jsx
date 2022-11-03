import React, { useEffect } from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import Search from "../components/Search";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";



export default function Results() {
 const [searchResults, setSearchResults] = React.useState([]);
 

 const getParamsFromUrl = () => {
  let url = window.location.pathname.split("/");
  const [, destination, timeTo, timeFrom, adults, children, airport] = url;
  return {
    timeTo: timeTo,
    timeFrom: timeFrom,
    adults: adults,
    children: children,
    airport: airport,
    destination: destination,
  }

 }
 const [filters, setFilters] = React.useState(getParamsFromUrl());
 

  useEffect(() => {
    fetch(`api/getSearchResults?destination=${filters.destination}&timeTo=${filters.timeTo}&
    timeFrom=${filters.timeFrom}&adults=${filters.adults}&
    children=${filters.children}&airport=${filters.airport}&`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.searchResults); //set to airports varibale
      });
  }, []);


  
  console.log("filters: " + filters.timeFrom);
  //TODO
  /*
  useEffect(() => {
    // read the params on component load and when any changes occur
    const currentParams = Object.fromEntries([...searchParams]);
    // get new values on change
    console.log('useEffect:', currentParams);
    // update the search params programmatically
    setSearchParams({ sort: 'name', order: 'ascending' });
  }, [searchParams]);
*/
  return (
    <div>
      <div className="content">
        <NavigationBar />
        <Container maxWidth="lg">
          <div className="title-wrapper">
            <h1 className="title">Holiday24</h1>
            <div className="sub-title">Find your perfect trip!</div>
            <div className="search-wrapper">
              <Search></Search>
            </div>
          </div>
        </Container>
        <Container maxWidth="lg">
          <div className="title-wrapper">
            <div className="sub-title">Results:</div>
            <div className="search-wrapper"></div> 
            
          </div>
         
        </Container>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
