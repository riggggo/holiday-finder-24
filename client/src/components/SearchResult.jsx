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
import { useNavigate } from "react-router-dom";

export default function SearchResult(props) {
  const navigate = useNavigate();

  const handleSubmit = () => {

    navigate(`/hotel/${props.hotel.id}/${props.hotel.hotelname}/${props.urlParams}`);
  };
  return (
    
    <Card className="search-result-comp" sx={{ maxWidth: 700,
      backgroundColor: "#Eeeef1",
   }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[500] }}>
            <HotelIcon />
          </Avatar>
        }

      
        
      ></CardHeader><Typography variant="h5">{props.hotel.hotelname}</Typography>

      <CardContent>
        <Typography color="primary">
          <Rating
            name="read-only"
            value={props.hotel.hotelstars}
            readOnly
            precision={0.1}
          />
        </Typography>

        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
        >
          More
        </Button>
      </CardContent>
    </Card>
  );
}
