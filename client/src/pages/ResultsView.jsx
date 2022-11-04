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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
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
    fetch(`/api/getSearchResults?destination=${filters.destination}&timeTo=${filters.timeTo}&
    timeFrom=${filters.timeFrom}&adults=${filters.adults}&
    children=${filters.children}&airport=${filters.airport}&`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.searchResults); //set to airports varibale
      });
  }, []);

 
  const components = searchResults.length === 0 ? <Grid item xs={12}>Loading...</Grid> : searchResults.map((hotel) => (
    <Grid item xs={12} md={6}>
      <SearchResult hotel={hotel}></SearchResult>
    </Grid>
  ));

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
        <Container maxWidth="lg" sx={{ padding: 0 }}>
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
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Accordion
                    sx={{
                      backgroundColor: "#Fbfbfb",
                    }}
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
                </Grid>
                {components}
              </Grid>
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
