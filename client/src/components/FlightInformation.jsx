import React from "react";
import { Grid } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

export default function FlightInformation(props) {
  const offer = props.offer;
  return (
    <Grid item sm={12} md={6}>
      <Grid container rowSpacing={0} columnSpacing={1}>
        <Grid item xs={12}>
          <div className="left">
            <div className="mediumSize" style={{ padding: "0 0 13px 15px"}}>
              {offer.outbound && <div><FlightTakeoffIcon sx={{ fontSize: 18 }} /> <strong> Departure: {offer.date}</strong></div>}
              {!offer.outbound &&  <div><FlightLandIcon sx={{ fontSize: 18 }} /> <strong> Arrival: {offer.date}</strong></div>}
             
            </div>
          </div>
        </Grid>

        {
          //row 0
        }
        <Grid item xs={5}>
          <div className="right">
            <div className="mediumSize">{offer.departuretime}</div>
          </div>
        </Grid>
        <Grid item xs={1}>
          <div className="circle"></div>
        </Grid>
        <Grid item xs={6}>
          <div className="left">
            <div className="mediumSize">{offer.departureairport}</div>
          </div>
        </Grid>
        {
          //row 1
        }
        <Grid item xs={5}></Grid>
        <Grid item xs={1}>
          <div className="smallCircle"></div>
        </Grid>
        <Grid item xs={6}></Grid>
        {
          //row 2
        }
        <Grid item xs={5}>
          {" "}
          <div className="right">{offer.delta}</div>
        </Grid>
        <Grid item xs={1}>
          <div className="smallCircle"></div>
        </Grid>
        <Grid item xs={6}>
          {" "}
          <div className="left">Airline: {offer.airline}</div>
        </Grid>
        {
          //row 3
        }
        <Grid item xs={5}></Grid>
        <Grid item xs={1}>
          <div className="smallCircle"></div>
        </Grid>
        <Grid item xs={6}></Grid>
        {
          //row 4
        }
        <Grid item xs={5}>
          <div className="right">
            <div className="mediumSize">{offer.arrivaltime}</div>
          </div>
        </Grid>
        <Grid item xs={1}>
          <div className="circle"></div>
        </Grid>
        <Grid item xs={6}>
          <div className="left">
            <div className="mediumSize">{offer.arrivalairport}</div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
