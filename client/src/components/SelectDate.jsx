import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, TextField } from "@mui/material";
export default function SelectDate(props) {
  let today = new Date();

  const [value, setValue] = React.useState(props.today ? today : new Date(today.getFullYear(), today.getMonth(), today.getDate()+7));

  const handleChange = (date) => {
    setValue(date);
    props.callback(date);
  };

  return (
    <Box sx={{ minWidth: 160 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          
          ampm={false}
          label={props.ownLabel}
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} fullWidth />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}
