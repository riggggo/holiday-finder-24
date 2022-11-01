import {
  Box,
  Grid,
  TextField,
} from "@mui/material";
import SelectDate from "./SelectDate";
import SelectAirport from "./SelectAirport";
import React, { useEffect } from "react";






export default function FilterBar() {
  const [filters, setFilters] = React.useState({
    timeTo: null,
    timeFrom: null,
    adults: 1,
    children: 0,
    airport: []
  });

  const handleAirportChange = (airports) => {
    setFilters({
      ...filters,
      airport: airports,
    });
    console.log(filters.airport.length);
  };

  const handleAdultsChange = (_event) => {
    setFilters({
      ...filters,
      adults: _event.target.value,
    });
    console.log(filters.adults);
  };

  const handleChildrenChange = (_event) => {
    setFilters({
      ...filters,
      children: _event.target.value,

    });
    console.log(filters.adults);
  };

  const helpHandleTimeChange = (newTime) => {
    const d = new Date(newTime);
    let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    let month =
      d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    return hours + ":" + minutes + "_" + d.getFullYear() + "-" + month + "-" + day;
  };

  const handleTimeChangeFrom = (newTime) => {
    setFilters({
      ...filters,
      timeFrom:
      helpHandleTimeChange(newTime),
    });

  }

  const handleTimeChangeTo = (newTime) => {
    setFilters({
      ...filters,
      timeTo:
      helpHandleTimeChange(newTime),
    });
  }
  return (
    <div>
      <Grid container spacing={3} justifyContent="space-around">
      


        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SelectAirport callback={handleAirportChange} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Box>
            <SelectDate callback={handleTimeChangeFrom} ownLabel={"Anreise ab"} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Box>
            <SelectDate callback={handleTimeChangeTo} ownLabel={"Abflug bis"} />
          </Box>
          {
            // TODO: validate that departure date > arrival date
          }
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={1}>
          <Box>
            <TextField
              id="adults"
              label="Adults"
              type="number"
              defaultValue={0}
              onChange={handleAdultsChange}
              sx={{ width: 114 }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: { min: 0, max: 6 },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={1}>
          <Box>
            <TextField
              id="children"
              label="Children"
              type="number"
              defaultValue={0}
              onChange={handleChildrenChange}
              sx={{ width: 114 }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: { min: 0, max: 10 },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
