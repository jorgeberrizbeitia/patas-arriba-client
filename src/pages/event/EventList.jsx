import { useState, useEffect } from "react";

import service from "@service/config";
import Loading from "@components/ui/Loading";
import EventCard from "@components/event/EventCard";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

function EventList() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [timeFrame, setTimeFrame] = useState("upcoming")

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {

    if (!isLoading) setIsLoading(true)

    try {
      const response = await service.get("/event");
      setEvents(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  };

  let eventsToDisplay;
  const today = new Date()
  today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
  if (timeFrame === "upcoming") {
    eventsToDisplay = events.filter((event) => new Date(event.date) >= today)
  } else if (timeFrame === "past") {
    eventsToDisplay = events.filter((event) => new Date(event.date) < today).reverse()
  }

  return (
    <>

      <hr style={{maxWidth:"initial"}} />

      <Typography variant="h4" gutterBottom>Aqui podrás ver todos los eventos próximos y más recientes</Typography>

      <br />

      <Box display="flex" gap="20px">
        <Button onClick={() => setTimeFrame("upcoming")} sx={{width: "120px"}} variant={timeFrame === "upcoming" ? "contained" : "outlined"} color="primary">
          Próximos
        </Button>

        <Button onClick={() => setTimeFrame("past")} sx={{width: "120px"}} variant={timeFrame === "past" ? "contained" : "outlined"} color="primary">
          Pasados
        </Button>
      </Box>
      
      <br />

      {isLoading ? <Loading /> : eventsToDisplay.map((event) => <EventCard key={event._id} event={event}/>)}

      {!isLoading && events.length === 0 && <Typography>No se han encontrado eventos</Typography>}

    </>
  );
}

export default EventList;