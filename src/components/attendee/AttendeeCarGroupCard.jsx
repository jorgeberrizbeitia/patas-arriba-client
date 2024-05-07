import CardHeader from "@mui/material/CardHeader"
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton'
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import UserIcon from "../user/UserIcon";
import TextField from '@mui/material/TextField'
import { useState } from "react";
import service from "@service/config";
import ReadMoreIcon from '@mui/icons-material/ReadMore';

function AttendeeCarGroupCard({attendee}) {

  const navigate = useNavigate()

  const { user, carGroup } = attendee
  //* this attendee includes car groups. Check AttendeeCarGroups
  const { _id, username, fullName, role } = user

  const isCarOwner = user._id == carGroup?.owner._id
  const isCarPassenger = carGroup?.passengers?.some((passenger) =>  passenger == user._id)
  
  return (
    <Box 
      bgcolor="gray.transparent"
      width="100%" 
      height="70px" 
      display="flex" 
      justifyContent="space-between"
      alignItems="center"
      padding={1} 
      margin={0.5}
      borderRadius={1}
     >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <UserIcon user={user} size="small" caption/>

        <Typography 
          variant="body1" 
          color={(isCarOwner || isCarPassenger) ? "success.main" : "error.main"}
          sx={{pl: 2}}
        >
          {!carGroup && `No tiene coche asignado` }
          {carGroup && isCarOwner && "Va en coche propio"}
          {carGroup && isCarPassenger && `Pasajero en coche de ${carGroup.owner.username}`}
        </Typography>
      </Box>

      <IconButton onClick={() => navigate(`/user/${user._id}`)}>
        <ReadMoreIcon />
        <Typography variant="icon">ver usuario</Typography>
      </IconButton>

    </Box>
  )
}

export default AttendeeCarGroupCard