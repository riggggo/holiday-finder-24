import React, { useEffect } from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import Search from "../components/Search";
import { Container } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Grid from "@mui/material/Grid";
import SearchExpandable from "../components/SearchExpandable";
import { useParams } from "react-router-dom";
import HotelOffer from "../components/HotelOffer";
import CircularProgress from '@mui/material/CircularProgress';

export default function HotelView() {
  const getParamsFromUrl = () => {
    let url = window.location.pathname.split("/");

    let [, , id, hotelname, destination, timeTo, timeFrom, adults, children, airport] =
      url;
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
      id: id,
      hotelname: hotelname.replaceAll("%20", " "),
    };
  };
  const [filters, setFilters] = React.useState(getParamsFromUrl());

  //status: 
  //  0: loading
  //  1: no results
  //  2: results
  
  const [offers, setOffers] = React.useState([]);
  const getStringOfDate = (d) => {
    let month =
      d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    return day + "." + month + "." + d.getFullYear();
  };

  const getHotelOffers = async () => {
    const response =
      await fetch(`/api/getOffers?id=${filters.id}&destination=${filters.destination}&timeTo=${filters.timeTo}&timeFrom=${filters.timeFrom}&adults=${filters.adults}&children=${filters.children}&airport=${filters.airport}&`);
  return response.json();
    
  }

  useEffect(() => {
    getHotelOffers().then((data) => {
      setOffers(data.offers);
    }).catch(console.error)
  }, []);


  const offer =
    offers.length === 0 ? (
      <Grid item xs={12}>
        <CircularProgress />
      </Grid>
    ) : (offers.map((details) => (
      <Grid item xs={12}>
        <HotelOffer
          offer={details}
        ></HotelOffer>
      </Grid>
    )));

  return (
    <div>
      <div className="content">
        <NavigationBar />
        <Container maxWidth="lg" sx={{ padding: 0 }}>
          <div className="title-wrapper">
            <h1 className="title">
              <div className="font-weight-normal">
                Offers from: <strong>"{filters.hotelname}":</strong>
              </div>
            </h1>

            <div className="sub-title">
              ({getStringOfDate(filters.timeFrom)} -{" "}
              {getStringOfDate(filters.timeTo)})
            </div>

            <div className="search-wrapper">
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <SearchExpandable filters={filters} ></SearchExpandable>
                </Grid>
         {offer}
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
