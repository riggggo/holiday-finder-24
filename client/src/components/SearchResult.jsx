import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HotelIcon from "@mui/icons-material/Hotel";
import { grey } from "@mui/material/colors";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { Button, Rating } from "@mui/material";


export default function SearchResult(props) {
  return (
    <Card className="search-result-comp" sx={{ maxWidth: 700 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[500] }}>
            <HotelIcon />
          </Avatar>
        }
        action={
          <a
            href={`https://maps.google.com/maps?z=12&t=m&q=loc:${props.hotel.lat}+${props.hotel.long}`}
          >
            <IconButton aria-label="Location">
              <LocationOnIcon />
            </IconButton>
          </a>
        }
      
        
      ></CardHeader><Typography variant="h5">{props.hotel.name}</Typography>

      <CardContent>
        <Typography color="primary">
          <Rating
            name="read-only"
            value={props.hotel.averageRating}
            readOnly
            precision={0.1}
          />
        </Typography>

        <Button
          color="primary"
          variant="contained"
          component={Link}
          to={`/search/detail/${props.hotel.id}`}
        >
          More
        </Button>
      </CardContent>
    </Card>
  );
}
