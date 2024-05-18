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
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from "@context/auth.context.jsx"

import capitalizeAll from "@utils/capitalizeAll"
import UserIcon from '@components/user/UserIcon';
import { useNavigate } from 'react-router-dom';


function CarGroupListItem({carGroup}) {
  
  const navigate = useNavigate()

  const {_id, pickupLocation, roomAvailable, owner, passengers} = carGroup
  const {loggedUser} = useContext(AuthContext)

  //todo color code: green available, 
  //todo all fields mandatory

  const occupancyAvailable = roomAvailable - passengers.length
  
  return (
    <Card sx={{bgcolor: "gray.transparent", width:"100%"}}>
      <CardHeader
        avatar={ 
          <Box display="flex" flexDirection="column">
            <DirectionsCarIcon />
            <Typography variant="caption">{passengers.length + 1} / {roomAvailable + 1}</Typography>
          </Box>
         }
        
        title={<Typography variant="body2">
          <Typography variant='span' fontWeight="bold">Lugar de Recogida: </Typography>
          <Typography variant='span'>{pickupLocation}</Typography>
        </Typography>}
        subheader={<>
          <Typography variant="body2">
            <Typography variant='span' fontWeight="bold">Conductor: </Typography>
            <Typography variant='span'>{owner.username}</Typography>
          </Typography>
          <Typography variant="body2">
            <Typography variant="span" fontWeight="bold">Pasajeros: </Typography>
            {passengers.map((passenger, index) => {
              return <Typography key={passenger._id} variant="span">{passenger.username}{index === passengers.length - 1 ? "" : ", "}</Typography>
            })}
            </Typography>
          </>}
         action={loggedUser.role === "admin" &&
          <IconButton 
            onClick={() => navigate(`/car-group/${_id}`)}
          >
            <ReadMoreIcon />
            <Typography variant="icon">Ver info</Typography>
            <Typography variant="icon">Admin</Typography>
          </IconButton>
          }
      />
    </Card>
  )
}

export default CarGroupListItem 