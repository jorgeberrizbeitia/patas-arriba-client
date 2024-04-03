import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import capitalizeAll from "@utils/capitalizeAll"

function CarGroupCard({eachCarGroup, setSelectedCarGroupId, selectedCarGroupId}) {

  console.log(eachCarGroup)

  const {pickupLocation, pickupCoordinates, roomAvailable, pickupTime, owner} = eachCarGroup

  //todo color code: green available, 
  //todo all fields mandatory

   

  return (
    <Card>
      <CardHeader
        avatar={
          <Tooltip title={owner.username}>
            <Avatar sx={{ bgcolor: "primary" }}>
              {owner.username}
            </Avatar>
          </Tooltip>
        }
        
        title={`Recogida en: ${pickupLocation}`}
        subheader={`Hora: ${pickupTime}. Plazas: ${roomAvailable}`}
        action={
          <>
            {/* <Typography variant="body2">{`Disp`}</Typography> */}
            <IconButton color={eachCarGroup._id == selectedCarGroupId ? "success" : "primary"} onClick={() => setSelectedCarGroupId(eachCarGroup._id)}>
              {eachCarGroup._id == selectedCarGroupId ? <CheckIcon /> : <AddIcon />}
            </IconButton>
          </>
        }
      />
    </Card>
  )
}

export default CarGroupCard 