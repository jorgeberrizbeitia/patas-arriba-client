import { useState, useEffect } from "react";

import service from "@service/config";
import Loading from "@components/ui/Loading";
import EventCard from "@components/event/EventCard";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from "react-router-dom";

function EventList() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {

    if (!isLoading) setIsLoading(true)

    try {
      const response = await service.get("/event");
      console.log(response.data)
      setEvents(response.data)
      // setTimeout(() => {
        setIsLoading(false)
      // }, 1000)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>

      <hr style={{maxWidth:"initial"}} />

      <Typography variant="h4"gutterBottom>Todos los Eventos</Typography>
      {/* <Box sx={{display:"flex", justifyContent: "space-between"}}>
        <Button onClick={() => navigate(-1)}><ArrowBackIcon/></Button>
        <Button onClick={() => getEvents()} disabled={isLoading}><RefreshIcon /></Button>
      </Box> */}
      <Box>
        {isLoading ? <Loading /> : events.map((event) => <EventCard key={event._id} event={event}/>)}
        {!isLoading && events.length === 0 && <Typography>No hay eventos</Typography>}
        {/* //todo test if it works */}
      </Box>
    </>
  );
}

export default EventList;