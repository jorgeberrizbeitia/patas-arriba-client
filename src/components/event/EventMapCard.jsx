import { useState } from "react";

import mapExample from "@assets/images/map-example.png"

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from '@mui/material/Collapse';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function EventMapCard({event}) {

  const [ showMap, setShowMap ] = useState(false)

  return (
    <>
      <hr />
      <Card sx={{width: "100%"}}>
        <CardHeader
          subheader={`Mapa del evento`}
          action={
            <IconButton onClick={() => setShowMap(!showMap)}>
              {showMap ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showMap}>
          <CardMedia component="img" image={mapExample} alt="mapa-evento" />
        </Collapse>
      </Card>
    </>
  );
}

export default EventMapCard;
