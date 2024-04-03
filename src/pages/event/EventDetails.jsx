import { useState, useEffect, useContext } from "react"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useParams } from "react-router-dom";

import mapExample from "@assets/images/map-example.png"

import service from "@service/config"

import Loading from "@components/ui/Loading";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from "@mui/material/CardHeader";

import { AuthContext } from "@context/auth.context"
import EventParticipantCard from "../../components/event/EventParticipantCard";
import IconButton from "@mui/material/IconButton";

import EventMessageBoard from "@components/messages/EventMessageBoard";
import EditIcon from '@mui/icons-material/Edit';
import PetsIcon from '@mui/icons-material/Pets';



function EventDetails() {

  const { loggedUserId, loggedUserRole } = useContext(AuthContext)

  const { eventId } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null)

  useEffect(() => {
    getEventDetails()
  }, [])

  const getEventDetails = async () => {

    // if (!isLoading) setIsLoading(true)

    try {
      
      const response = await service.get(`/event/${eventId}`)

      console.log(response.data)
      console.log(loggedUserId)

      setEvent(response.data)

      setTimeout(() => setIsLoading(false), 700)

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>

      <Box sx={{display:"flex", justifyContent: "space-between"}}>
        <IconButton onClick={() => navigate('/event')}><ArrowBackIcon/></IconButton>
      </Box>

      {event.status === "cancelled" && <Typography variant="h3" color="error" gutterBottom>Este evento ha sido cancelado</Typography>}

      <Card sx={{ marginTop: 3}}>
        <CardHeader 
          title={event.title}
          avatar={loggedUserRole === "admin" && <PetsIcon />}
          action={loggedUserRole === "admin" && <IconButton 
            onClick={() => navigate(`/event/${eventId}/edit`)} 
            color="primary"
          >
            <EditIcon/>
            <Typography variant="icon">editar</Typography>
          </IconButton>}
        />
        <CardContent sx={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
          <Typography variant="body2">Fecha: {new Date(event.date).toDateString()}</Typography>
          <Typography variant="body2">Hora: {event.time}</Typography>
          <Typography variant="body2">Participantes: {event.participants.length}</Typography>
          {/* //todo when clicking on participants, open a modal with list */}
        </CardContent>
      </Card>

      <hr />

      <Card sx={{height: 200, marginTop: 3}}>
        <Typography variant="h5">Lugar: {event.location}</Typography>
        <CardMedia
          component="img"
          image={mapExample}
          alt="mapa-ubicación"
        />
      </Card>

      <hr />

      {event.participants.some((e) => e._id == loggedUserId) ? (<>
        <EventParticipantCard getEventDetails={getEventDetails}/>
        {/* //todo separate elements in EventParticipantCard here */}
        <hr />
        <EventMessageBoard type="event" eventOrCarGroup={event}/>
      </>
      ) : (
      <Box>
        <Link to={`/event/${event._id}/join`}>
          <Button size="large" variant="contained">Unirse al evento!</Button>
        </Link>
      </Box>
      )}

    </Container>
  )
}

export default EventDetails