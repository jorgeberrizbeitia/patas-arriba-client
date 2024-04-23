import { useState, useEffect } from "react";

import service from "@service/config";
import Loading from "@components/ui/Loading";
import EventCard from "@components/event/EventCard";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

function UpcomingEventsList() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState(null);

  useEffect(() => {
    getUpcomingEvents();
  }, []);

  const getUpcomingEvents = async () => {

    if (!isLoading) setIsLoading(true)

    try {
      const response = await service.get("/event?upcoming=true");
      setUpcomingEvents(response.data)
      setIsLoading(false)
    } catch (error) {
      navigate("/server-error")
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>¡Bienvenido! Aqui verás los próximos eventos de Patas Arriba</Typography>

      <br />
        
      {isLoading ? <Loading /> : upcomingEvents.map((event) => <EventCard key={event._id} event={event}/>)}
      {!isLoading && upcomingEvents.length === 0 && <Typography>No hay próximos eventos</Typography>}
        
      <hr />

      {!isLoading && <Button onClick={() => navigate("/event")}>Ver todos los eventos</Button> }

    </>
  );
}

export default UpcomingEventsList;
