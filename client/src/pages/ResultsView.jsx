import React, { useEffect } from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import Search from "../components/Search";
import { Container, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SearchResult from "../components/SearchResult";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SearchExpandable from "../components/SearchExpandable";
import { Button } from "@mui/material";
export default function Results() {
  const NUMBER_PER_LOAD = 10;
  const status = {
    LOADING: 0,
    NO_RESULTS: 1,
    NO_MORE_RESULTS: 2,
    RESULTS: 3,
    ERROR: 4,
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
    setSearchResults({ ...searchResults, status: status.LOADING });
    await fetch(
      `/api/getSearchResults?destination=${filters.destination}&timeTo=${filters.timeTo}&timeFrom=${filters.timeFrom}&adults=${filters.adults}&children=${filters.children}&airport=${filters.airport}&start=${searchResults.results.length}&numberToLoad=${NUMBER_PER_LOAD}`
    )
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          setSearchResults({ status: status.ERROR, results: null });
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then((data) => {
        if (data.searchResults.length === 0) {
          setSearchResults({
            status:
              searchResults.results.length === 0
                ? status.NO_RESULTS
                : status.NO_MORE_RESULTS,
            results: data.searchResults,
          });
        } else {
          setSearchResults({
            status:
              data.searchResults.length < NUMBER_PER_LOAD
                ? status.NO_MORE_RESULTS
                : status.RESULTS,
            results: searchResults.results.concat(data.searchResults),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSearchResults();
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
                  <SearchExpandable results={true} filters={filters} />
                </Grid>
                {(searchResults.status === status.LOADING ||
                  searchResults.status === status.RESULTS ||
                  searchResults.status === status.NO_MORE_RESULTS) &&
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
                  ))}
                {searchResults.status === status.LOADING && (
                  <Grid item xs={12}>
                    <CircularProgress />
                  </Grid>
                )}
                {searchResults.status === status.NO_RESULTS && (
                  <Grid item xs={12}>
                    No results for the given filters found :/
                  </Grid>
                )}
                {searchResults.status === status.ERROR && (
                  <Grid item xs={12}>
                    An error occured :/
                  </Grid>
                )}
                {searchResults.status === status.RESULTS && (
                  <Grid item xs={12}>
                    <Button onClick={getSearchResults}>Load More</Button>

                    <br />
                    <Typography>
                      {searchResults.results.length} results loaded.
                    </Typography>
                  </Grid>
                )}
                {searchResults.status === status.NO_MORE_RESULTS && (
                  <Grid item xs={12}>
                    <Typography>
                      All {searchResults.results.length} results loaded.
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
