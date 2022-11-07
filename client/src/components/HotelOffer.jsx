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
    let hour = date.getHours();
    let min = date.getMinutes();
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    return day + "." + month + "." + year + " " + hour + ":" + min;
  };

  return (
    <Card className="search-result-comp" sx={{ backgroundColor: "#Eeeef1" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[500] }}>
            <HotelIcon />
          </Avatar>
        }
        title={formatDate(props.offer.departuredate) + " Tage"}
        subheader="test"
      ></CardHeader>

      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FlightTakeoffIcon />
                {formatDate(props.offer.departuredate)}
                With {props.offer.inboundairline}
                from
                {props.offer.inbounddepartureairport}to
                {props.offer.inboundarrivalairport}
                arrival time
                {props.offer.inboundarrivaldatetime}
              </Grid>
              <Grid item xs={6}>
                <FlightLandIcon /> {formatDate(props.offer.returndate)}
                With {props.offer.outboundairline}
                from
                {props.offer.outbounddepartureairport}to
                {props.offer.outboundarrivalairport}
                arrival time
                {props.offer.outboundarrivaldatetime}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            {props.offer.countadults}
            {props.offer.countchildren}
          </Grid>
          <Grid item xs={2}>
            <strong>Price: {props.offer.price}€ (total)</strong>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
