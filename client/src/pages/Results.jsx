import React, { useEffect } from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import Search from "../components/Search";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SearchResult from "../components/SearchResult";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@material-ui/core";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import "./Results.css";
export default function Results() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [searchResults, setSearchResults] = React.useState([]);

  const getParamsFromUrl = () => {
    let url = window.location.pathname.split("/");

    let [, , destination, timeTo, timeFrom, adults, children, airport] = url;
    timeTo = new Date(
      timeTo.split("-")[2],
      timeTo.split("-")[1] - 1,
      timeTo.split("-")[0]
    );
    timeFrom = new Date(
      timeFrom.split("-")[2],
      timeFrom.split("-")[1] - 1,
      timeFrom.split("-")[0]
    );
    return {
      timeTo: timeTo,
      timeFrom: timeFrom,
      adults: adults,
      children: children,
      airport: airport.split(","),
      destination: destination,
    };
  };
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

  const example = {
    name: "Iberostar Playa de Muro",
    lat: 39.80012328,
    long: 3.108648156,
    averageRating: 4.0,
    id: 1,
  };
  const getStringOfDate = (d) => {
    let month =
      d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    return day + "." + month + "." + d.getFullYear();
  };
  return (
    <div>
      <div className="content">
        <NavigationBar />
        <Container maxWidth="lg">
          <div className="title-wrapper">
            <h1 className="title">
              <div className="font-weight-normal">
                Hotels for <strong>"{filters.destination}":</strong>
              </div>
            </h1>
            <div className="sub-title">
              ({getStringOfDate(filters.timeFrom)} -{" "}
              {getStringOfDate(filters.timeTo)})
            </div>

            <div className="search-wrapper">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FilterAltIcon></FilterAltIcon>
                </AccordionSummary>
                <AccordionDetails>
                  <Search filters={filters}></Search>
                </AccordionDetails>
              </Accordion>
            </div>

            <SearchResult hotel={example}></SearchResult>
            <SearchResult hotel={example}></SearchResult>
          </div>
        </Container>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
