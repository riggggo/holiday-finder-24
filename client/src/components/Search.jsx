import { Button, Box, Grid, TextField } from "@mui/material";
import SelectDate from "./SelectDate";
import SelectAirport from "./SelectAirport";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "@mui/material/styles/createTransitions";

export default function FilterBar(props) {

  const navigate = useNavigate();

  const [filters, setFilters] = React.useState(props.filters);
  
  const handleSubmit = () => {
    console.log(createFilterSting());
    navigate("/results" + createFilterSting());
  };

  const formatDate = (date) => {
    console.log(date);
    if (date === null) {
      date = new Date();
    }
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  }
  

const createFilterSting = () => {
  return "/" + filters.destination + "/" + formatDate(filters.timeTo) + "/" + formatDate(filters.timeFrom) + "/" +
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

  

  const handleTimeChangeFrom = (newTime) => {
    setFilters({
      ...filters,
      //timeFrom: helpHandleTimeChange(newTime),
      timeFrom: new Date(newTime),
    });
  };

  const handleTimeChangeTo = (newTime) => {
    setFilters({
      ...filters,
      timeTo: new Date(newTime),
    });
  };

  const handleSearchBox = (value) => {
    setFilters({
      ...filters,
      destination: value,
    });
  }
  return (
    <div className="searchBox">
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item xs={12} md={8} lg={8}>
            <Box>
              <div>
                <TextField
         
                  fullWidth
                  value={filters.destination}
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
            <SelectAirport callback={handleAirportChange} airports={filters.airport}/>
          </Grid>
          <Grid item xs={6}  md={3} lg={3}>
            <Box>
              <SelectDate callback={handleTimeChangeFrom} ownLabel={"From"} initialDate={filters.timeFrom}/>
            </Box>
          </Grid>
          <Grid item xs={6}  md={3} lg={3}>
            <Box>
              <SelectDate callback={handleTimeChangeTo} ownLabel={"To"} initialDate={filters.timeTo}/>
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
                defaultValue={filters.adults}
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
                defaultValue={filters.children}
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