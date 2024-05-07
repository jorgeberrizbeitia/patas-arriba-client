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
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import capitalizeAll from "@utils/capitalizeAll"
import UserIcon from '@components/user/UserIcon';


function CarGroupCard({eachCarGroup, setSelectedCarGroupId, selectedCarGroupId}) {

  const {pickupLocation, roomAvailable, carBrand, carColor, pickupTime, owner, passengers} = eachCarGroup

  //todo color code: green available, 
  //todo all fields mandatory

  const occupancyAvailable = roomAvailable - passengers.length
  
  return (
    <Card sx={{bgcolor: "gray.transparent", width:"100%"}}>
      <CardHeader
        avatar={ <UserIcon user={owner} size="small" caption/> }
        
        title={<Typography variant="body2">Recogida: {pickupLocation} </Typography>}
        subheader={<Typography variant="caption">Hora: {pickupTime}</Typography>}
        action={
          <Box display="flex" flexDirection="column">
            <IconButton color={eachCarGroup._id == selectedCarGroupId ? "success" : "primary"} onClick={() => setSelectedCarGroupId(eachCarGroup._id)} disabled={occupancyAvailable <= 0}>
              {eachCarGroup._id == selectedCarGroupId ? <CheckIcon /> : <AddIcon />}
            </IconButton>
            <Typography variant="caption">{`Disp. ${occupancyAvailable}`}</Typography>
          </Box>
        }
      />
    </Card>
  )
}

export default CarGroupCard 