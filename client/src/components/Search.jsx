import { Button, Box, Grid, TextField } from "@mui/material";
import SelectDate from "./SelectDate";
import SelectAirport from "./SelectAirport";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function FilterBar() {
  const [query, handleSearchBox] = React.useState("");
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState({
    timeTo: null,
    timeFrom: null,
    adults: 1,
    children: 0,
    airport: [],
  });
  
  const handleSubmit = () => {
    navigate(`/results/${createFilterSting()}`)
  };

  const formatDate = (date) => {
    if (date === null) {
      date = new Date();
    }
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  }
  

  const createFilterSting = () => {
    return "" + query + "/" + formatDate(filters.timeTo) + "/" + formatDate(filters.timeFrom) + "/" +
    filters.adults + "/" + filters.children + "/" + filters.airport.join(",");
  }
  
  

  const handleAirportChange = (airports) => {
    setFilters({
      ...filters,
      airport: airports,
    });
  };

  const handleAdultsChange = (_event) => {
    setFilters({
      ...filters,
      adults: _event.target.value,
    });
  };

  const handleChildrenChange = (_event) => {
    setFilters({
      ...filters,
      children: _event.target.value,
    });
  };

  const helpHandleTimeChange = (newTime) => {
    const d = new Date(newTime);
    let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    let month =
      d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    return (
      hours + ":" + minutes + "_" + d.getFullYear() + "-" + month + "-" + day
    );
  };

  const handleTimeChangeFrom = (newTime) => {
    setFilters({
      ...filters,
      timeFrom: helpHandleTimeChange(newTime),
    });
  };

  const handleTimeChangeTo = (newTime) => {
    setFilters({
      ...filters,
      timeTo: helpHandleTimeChange(newTime),
    });
  };
  return (
    <div className="searchBox">
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item xs={12} md={8} lg={8}>
            <Box>
              <div>
                <TextField
                  fullWidth
                  value={query}
                  onChange={(e) => handleSearchBox(e.target.value)}
                  label="Destination"
                  variant="outlined"
                  color="primary"
                  required
                />
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <SelectAirport callback={handleAirportChange} />
          </Grid>
          <Grid item xs={6}  md={3} lg={3}>
            <Box>
              <SelectDate callback={handleTimeChangeFrom} ownLabel={"From"} today={true}/>
            </Box>
          </Grid>
          <Grid item xs={6}  md={3} lg={3}>
            <Box>
              <SelectDate callback={handleTimeChangeTo} ownLabel={"To"} today={false}/>
            </Box>
            {
              // TODO: validate that departure date > arrival date
            }
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <Box>
              <TextField
                id="adults"
                label="Adults"
                type="number"
                defaultValue={1}
                onChange={handleAdultsChange}
                fullWidth
                
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { min: 1, max: 6 },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}md={3} lg={3}>
            <Box>
              <TextField
                id="children"
                label="Children"
                type="number"
                defaultValue={0}
                onChange={handleChildrenChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
                InputProps={{
                  inputProps: { min: 0, max: 10 },
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={6}md={4} lg={4}>
            <div className="search-button">
              <Button
              
              
                type="submit"
                color="primary"
                variant="contained"
                //component={Link}
                //to={"/search/"}
              >
                Search
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
