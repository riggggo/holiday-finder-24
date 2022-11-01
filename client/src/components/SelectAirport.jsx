import React, { useEffect } from "react";

import {
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  ListItemText,
  Checkbox,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectAirport(props) {
  const [selectedAirports, setSelectedAirports] = React.useState([]);
  const [airports, setAirports] = React.useState([]);
  useEffect(() => {
    fetch("/api/getAirports")
      .then((response) => response.json())
      .then((data) => {
        setAirports(data.airports); //set to airports varibale
      });
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedAirports(typeof value === "string" ? value.split(",") : value);
    props.callback(event.target.value);
  };

  if (airports.length === 0) {
    return (
      <Box sx={{ minWidth: 150 }}>
        <FormControl>
          <InputLabel>Airports</InputLabel>
          <Select
            labelId="airports"
            id="airports"
            multiple
            sx={{ width: 228 }}
            value={[]}
            input={<OutlinedInput label="Airports" />}
            MenuProps={MenuProps}
          >
            <MenuItem key={0} value={"Loading"}>
              <ListItemText primary={"Loading..."} />
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  } else {
    return (
      <Box sx={{ minWidth: 150 }}>
        <FormControl>
          <InputLabel>Airports</InputLabel>
          <Select
            labelId="airports"
            id="airports"
            multiple
            sx={{ width: 228 }}
            value={selectedAirports}
            onChange={handleChange}
            input={<OutlinedInput label="Airports" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {airports.map((airport) => (
              <MenuItem key={airport} value={airport}>
                <Checkbox checked={selectedAirports.indexOf(airport) > -1} />
                <ListItemText primary={airport} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
}
