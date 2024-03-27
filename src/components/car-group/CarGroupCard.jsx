import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import profilePicExample from "@assets/images/profile-pic-example.jpg"
import { useState } from 'react';

function CarGroupCard({eachCarGroup}) {
  console.log(eachCarGroup)

  const {pickupLocation, pickupCoordinates, roomAvailable, pickupTime, owner} = eachCarGroup

  //todo color code: green available, 
  //todo all fields mandatory

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary" }}>
            P
          </Avatar>
        }
        
        title={`En ${pickupLocation} a las ${pickupTime}`}
        subheader={`Disponibilidad: ${roomAvailable}`}
        action={
          <IconButton aria-label="settings">
            <AddIcon />
          </IconButton>
        }
      />
    </Card>
  )
}

export default CarGroupCard