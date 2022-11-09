import React, { useEffect } from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import Search from "../components/Search";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SearchResult from "../components/SearchResult";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SearchExpandable from "../components/SearchExpandable";

export default function Results() {
  const status = {
    LOADING: 0,
    NO_RESULTS: 1,
    RESULTS: 2,
    ERROR: 3,
  };
  const [searchResults, setSearchResults] = React.useState({
    status: status.LOADING,
    results: [],
  });

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

  const getSearchResults = async () => {
    await fetch(
      `/api/getSearchResults?destination=${filters.destination}&timeTo=${filters.timeTo}&timeFrom=${filters.timeFrom}&adults=${filters.adults}&children=${filters.children}&airport=${filters.airport}`
    ).then((res) => {
      if (res.status >= 400 && res.status < 600) {
        setSearchResults({ status: status.ERROR, results: null });
        throw new Error("Bad response from server");
      } 
      return res.json();
    }).then((data) => {
      if (data.searchResults.length === 0) {
        setSearchResults({
          status: status.NO_RESULTS,
          results: data.searchResults,
        });
      } else {
        setSearchResults({
          status: status.RESULTS,
          results: data.searchResults,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getSearchResults()
  }, []);

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
                  <SearchExpandable filters={filters} />
                </Grid>
                {searchResults.status === status.LOADING ? (
                  <Grid item xs={12}>
                    <CircularProgress />
                  </Grid>
                ) : searchResults.status === status.NO_RESULTS ? (
                  <Grid item xs={12}>
                    No results for the given filters found :/
                  </Grid>
                ) : searchResults.status === status.ERROR ? (
                  <Grid item xs={12}>
                    An error occured :/
                  </Grid>
                ) : (
                  searchResults.results.map((hotel) => (
                    <Grid item xs={12} md={6}>
                      <SearchResult
                        hotel={hotel}
                        urlParams={window.location.pathname.replace(
                          "/results/",
                          ""
                        )}
                      ></SearchResult>
                    </Grid>
                  ))
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
