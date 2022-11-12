import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";
import HotelIcon from "@mui/icons-material/Hotel";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
export default function HotelOffer(props) {
  const formatDate = (date) => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return day + "." + month + "." + year;
  };
  const formatTime = (date) => {
    date = new Date(date);
    let hour = date.getHours();
    let min = date.getMinutes();
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    return hour + ":" + min;
  };
  const formatDateTime = (date) => {
    return formatDate(date) + " " + formatTime(date);
  };

  return (
    <Card className="search-result-comp" sx={{ backgroundColor: "#Eeeef1" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[500] }}>
            <HotelIcon />
          </Avatar>
        }
        titleTypographyProps={{variant:'h5' }}
        title={`${Math.round(
          (new Date(props.offer.returndate) -
            new Date(props.offer.departuredate)) /
            (1000 * 60 * 60 * 24)
        )} Tage`}
        subheader={`${formatDate(props.offer.departuredate)} - ${formatDate(
          props.offer.returndate
        )}`}
      ></CardHeader>

      <CardContent>
        <Grid container spacing={2}>
          
              <Grid item xs={1} >
                <FlightTakeoffIcon />
              </Grid>
              <Grid item xs={5} md={4}>
                {formatDate(props.offer.departuredate)}

                <br />
                {`${formatTime(props.offer.departuredate)} - ${formatTime(
                  props.offer.outboundarrivaldatetime
                )}`}
                <br />
                {`With ${props.offer.outboundairline}
                from ${props.offer.outbounddepartureairport} to
                ${props.offer.outboundarrivalairport}`}
              </Grid>
              <Grid item xs={1}>
                <FlightLandIcon />
              </Grid>
              <Grid item xs={5} md={4}>
                {formatDate(props.offer.returndate)}

                <br />
                {`${formatTime(props.offer.returndate)} - ${formatTime(
                  props.offer.inboundarrivaldatetime
                )}`}
                <br />
                {`With ${props.offer.inboundairline}
                from ${props.offer.inbounddepartureairport} to
                ${props.offer.inboundarrivalairport}`}
              </Grid>
            
          
          <Grid item xs={12} md={2}>
            {" "}
            Price: <br />
            <strong>{props.offer.price}€ (total)</strong>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
