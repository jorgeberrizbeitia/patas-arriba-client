import { useState } from "react"

import service from "@service/config.js"
import { useNavigate, useParams } from "react-router-dom";

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CarGroupAddForm from "@components/car-group/CarGroupAddForm";
import CarGroupAvailableList from "@components/car-group/CarGroupAvailableList";
import NoCarGroupNeeded from "@components/car-group/NoCarGroupNeeded";

function EventJoin() {

  const { eventId } = useParams()
  const navigate = useNavigate()

  //todo look for event details on useEffect and redirect if user already part of event. Just in case of going back or manually accesing.

  const [ setting, setSetting ] = useState(0)
  // settings: 0-not-yet-selected, 1-user-has-car, 2-user-needs-car-ride, 3-user-forever-alone

  const joinEvent = async (createdCarGroup, joinedCarGroupId) => {
    console.log(createdCarGroup, joinedCarGroupId)
    try {
      
      // 1. user joins event
      await service.patch(`/event/${eventId}/join`)

      // 2. if setting 1, user creates a car group
      if (setting === 1 && createdCarGroup) {
        await service.post(`/car-group/${eventId}`, createdCarGroup)
      }

      // 3. if setting 2, user joins a car group
      if (setting === 2 && joinedCarGroupId) {
        await service.patch(`/car-group/${joinedCarGroupId}/join`)
      }

      // 4. redirect
      navigate(`/event/${eventId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>

      <Card sx={{display: "flex", flexDirection: "column", alignItems: "stretch"}}>

        <Typography variant="h6" sx={{margin: 3}}>Como vas a asistir al evento?</Typography>

        <Button 
          sx={{margin: "10px"}}
          variant="contained" 
          color={setting === 0 ? "info" : setting === 1 ? "success" : "gray"}  
          onClick={() => setSetting(1)}
        >Tengo Coche y puedo llevar gente!</Button>

        <Button 
          sx={{margin: "10px"}}
          variant="contained" 
          color={setting === 0 ? "info" : setting === 2 ? "success" : "gray"}  
          onClick={() => setSetting(2)}
        >Necesito coche para ir</Button>

        <Button 
          sx={{margin: "10px"}}
          variant="contained" 
          color={setting === 0 ? "info" : setting === 3 ? "success" : "gray"}   
          onClick={() => setSetting(3)}
        >Voy por mi cuenta</Button>

      </Card>

      <Box sx={{marginTop: 4}}>
        {setting === 1 && <CarGroupAddForm joinEvent={joinEvent}/>}
        {setting === 2 && <CarGroupAvailableList joinEvent={joinEvent}/>}
        {setting === 3 && <NoCarGroupNeeded joinEvent={joinEvent}/>}
      </Box>

    </Container>

  )
}

export default EventJoin