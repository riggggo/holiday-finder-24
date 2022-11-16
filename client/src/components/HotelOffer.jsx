import React from "react";
import "./HotelOffer.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import HotelIcon from "@mui/icons-material/Hotel";
import { grey } from "@mui/material/colors";
import { Grid, Box } from "@mui/material";
import WaterIcon from "@mui/icons-material/Water";
import Stack from "@mui/material/Stack";
import FlightInformation from "./FlightInformation";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
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
  const getHoursMinutesBetween = (date1, date2) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    let diffMs = date1 - date2;
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if (diffHrs < 10) diffHrs = "0" + diffHrs;
    if (diffMins < 10) diffMins = "0" + diffMins;
    return diffHrs + ":" + diffMins;
  };

  const getChildrenAdultsString = () => {
    console.log(props.offer)
    let adultsString = `${
      parseInt(props.offer.countadults) === 1
        ? "1 adult"
        : props.offer.countadults + " adults"
    }`;

    if (parseInt(props.offer.countchildren) === 0) {
      return adultsString;
    } else if (parseInt(props.offer.countchildren) === 1) {
      return adultsString + " and 1 child";
    } else {
      return adultsString + ` and ${props.offer.countchildren} children`;
    }
  };

  return (
    <Card className="search-result-comp" sx={{ backgroundColor: "#Eeeef1" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h5" }}
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
        <div style={{ paddingBottom: "15px" }}>
          <Divider variant="middle" />
        </div>
        <Grid container spacing={2}>
          <FlightInformation
            offer={{
              ...props.offer,
              outbound: true,
              date: formatDate(props.offer.departuredate),
              arrivaltime: formatTime(props.offer.outboundarrivaldatetime),
              departuretime: formatTime(props.offer.departuredate),
              departureairport: props.offer.outbounddepartureairport,
              arrivalairport: props.offer.outboundarrivalairport,
              airline: props.offer.outboundairline,
              delta: getHoursMinutesBetween(
                props.offer.outboundarrivaldatetime,
                props.offer.departuredate
              ),
            }}
          ></FlightInformation>
          <FlightInformation
            offer={{
              ...props.offer,
              outbound: false,
              date: formatDate(props.offer.returndate),
              arrivaltime: formatTime(props.offer.inboundarrivaldatetime),
              departuretime: formatTime(props.offer.returndate),
              departureairport: props.offer.inbounddepartureairport,
              arrivalairport: props.offer.inboundarrivalairport,
              airline: props.offer.inboundairline,
              delta: getHoursMinutesBetween(
                props.offer.inboundarrivaldatetime,
                props.offer.returndate
              ),
            }}
          ></FlightInformation>
        </Grid>
        <div style={{ padding: "15px 0 15px 0" }}>
          <Divider variant="middle" />
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="left">
              <div style={{ padding: "0 0 13px 15px" }}>
                <div className="mediumSize">
                  <div style={{ padding: "0 0 10px 0" }}>
                    <strong>Hotel:</strong>
                  </div>

                  <Stack spacing={1}>
                  {props.offer.oceanview === "TRUE" && (
                    <div>
                      <WaterIcon sx={{ fontSize: 16, padding: 0, margin: 0 }} />{" "}
                      oceanview
                    </div>)
                  }
                    <div>
                      <RestaurantIcon
                        sx={{ fontSize: 16, padding: 0, margin: 0 }}
                      />{" "}
                      {props.offer.mealtype}
                    </div>
                    <div>
                      <HotelIcon sx={{ fontSize: 16, padding: 0, margin: 0 }} />{" "}
                      {props.offer.roomtype}
                    </div>
                    <div>
                      <PeopleAltIcon
                        sx={{ fontSize: 16, padding: 0, margin: 0 }}
                      />{" "}
                      {getChildrenAdultsString()}
                    </div>
                  </Stack>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="mediumSize" style={{ padding: "0 15px 0 0" }}>
              {" "}
              <div className="right">
                Price: <strong>{props.offer.price}€ (total)</strong>
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
