import React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@material-ui/core";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Search from "./Search";
export default function SearchExpandable(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor: "#Eeeef1",
        }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FilterAltIcon></FilterAltIcon>
        </AccordionSummary>
        <AccordionDetails>
          <Search filters={props.filters}></Search>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
