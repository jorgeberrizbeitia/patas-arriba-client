import { useState, useEffect, useContext } from "react";

import service from "@service/config";
import Loading from "@components/ui/Loading";
import PageHeader from "@components/ui/PageHeader";
import EventCard from "@components/event/EventCard";
import { AuthContext } from "@context/auth.context";
import { SHADOW } from "../../theme";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

function EventList() {

  const navigate = useNavigate()
  const { isOrganizerOrAdmin } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [timeFrame, setTimeFrame] = useState("upcoming")
  // todo manage timeFrame state with queries

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
      navigate("/server-error")
    }
  };

  let eventsToDisplay;
  const today = new Date()
  today.setHours(0, 0, 0, 0); 
  //* Above will include events for the same day. FE and BE won't allow them to join if they are in the last a few hours.
  if (timeFrame === "upcoming") {
    eventsToDisplay = events.filter((event) => new Date(event.date) >= today)
  } else if (timeFrame === "past") {
    eventsToDisplay = events.filter((event) => new Date(event.date) < today).reverse()
  }

  return (
    <>

      <PageHeader title="Eventos" />

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

      {!isLoading && eventsToDisplay.length === 0 && <Typography>No se han encontrado eventos</Typography>}

      {/* Creating an event is THE organizer action on this screen, so it
          floats within thumb reach instead of hiding in a menu (spec FR-7).
          Volunteers never see it — the /event/create route rejects them. */}
      {isOrganizerOrAdmin && (
        <Fab
          color="primary"
          variant="extended"
          aria-label="Crear evento"
          onClick={() => navigate("/event/create")}
          sx={{
            position: "fixed",
            // Sits above the fixed BottomNav (56px) plus a comfortable gap.
            bottom: 88,
            right: 24,
            boxShadow: SHADOW.fab,
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Crear evento
        </Fab>
      )}

    </>
  );
}

export default EventList;