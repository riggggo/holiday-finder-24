import React, { useEffect } from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import Search from "../components/Search";
import { Button, Container } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Grid from "@mui/material/Grid";
import SearchExpandable from "../components/SearchExpandable";
import { useParams } from "react-router-dom";
import HotelOffer from "../components/HotelOffer";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
export default function HotelView() {
  const NUMBER_PER_LOAD = 10;
  const getParamsFromUrl = () => {
    let url = window.location.pathname.split("/");

    let [
      ,
      ,
      id,
      hotelname,
      destination,
      timeTo,
      timeFrom,
      adults,
      children,
      airport,
    ] = url;
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
      hotelname: decodeURI(hotelname),
    };
  };
  const [filters, setFilters] = React.useState(getParamsFromUrl());
  const status = {
    LOADING: 0,
    NO_RESULTS: 1,
    NO_MORE_RESULTS: 2,
    RESULTS: 3,
    ERROR: 4,
  };
  const [offers, setOffers] = React.useState({
    status: status.LOADING,
    results: [],
  });
  const getStringOfDate = (d) => {
    let month =
      d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    return day + "." + month + "." + d.getFullYear();
  };

  const getHotelOffers = async () => {
    setOffers({ ...offers, status: status.LOADING });
    await fetch(
      `/api/getOffers?id=${filters.id}&destination=${filters.destination}&timeTo=${filters.timeTo}&timeFrom=${filters.timeFrom}&adults=${filters.adults}&children=${filters.children}&airport=${filters.airport}&start=${offers.results.length}&numberToLoad=${NUMBER_PER_LOAD}`
    )
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          setOffers({ status: status.ERROR, results: null });
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then((data) => {
        if (data.offers.length === 0) {
          setOffers({
            status:
              offers.results.length === 0
                ? status.NO_RESULTS
                : status.NO_MORE_RESULTS,
            results: data.offers,
          });
        } else {
          setOffers({
            status:
              data.offers.length < NUMBER_PER_LOAD
                ? status.NO_MORE_RESULTS
                : status.RESULTS,
            results: offers.results.concat(data.offers),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHotelOffers();
  }, []);

  

  return (
    <div>
      <div className="content">
        <NavigationBar />
        <Container maxWidth="lg" sx={{ padding: 0 }}>
          <div className="title-wrapper">
            <h1 className="title">
              <div className="font-weight-normal">
                Offers from <strong>"{filters.hotelname}":</strong>
              </div>
            </h1>

            <div className="sub-title">
              ({getStringOfDate(filters.timeFrom)} -{" "}
              {getStringOfDate(filters.timeTo)})
              <br />
            </div>

            <div className="search-wrapper">
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <SearchExpandable filters={filters} results={false}></SearchExpandable>
                </Grid>

                {(offers.status === status.RESULTS || offers.status === status.LOADING ||
                  offers.status === status.NO_MORE_RESULTS) &&
                  offers.results.map((details) => (
                    <Grid item xs={12}>
                      <HotelOffer offer={details}></HotelOffer>
                    </Grid>
                  ))}
                {offers.status === status.LOADING && (
                  <Grid item xs={12}>
                    <CircularProgress />
                  </Grid>
                )}
                {offers.status === status.NO_RESULTS && (
                  <Grid item xs={12}>
                    No offer for the given filters found :/
                  </Grid>
                )}
                {offers.status === status.ERROR && (
                  <Grid item xs={12}>
                    An error occured :/
                  </Grid>
                )}
                {offers.status === status.RESULTS && (
                  <Grid item xs={12}>
                    <Button onClick={getHotelOffers}>Load More</Button>

                    <br />
                    <Typography>
                      {offers.results.length} offers loaded.
                    </Typography>
                  </Grid>
                )}
                {offers.status === status.NO_MORE_RESULTS && (
                  <Grid item xs={12}>
                    <Typography>
                      All {offers.results.length} offers loaded.
                    </Typography>
                  </Grid>
                )}
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
