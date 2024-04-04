import { useState, useEffect, useContext } from "react"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";

import mapExample from "@assets/images/map-example.png"

import service from "@service/config"

import UserCard from '@components/user/UserCard';


import Loading from "@components/ui/Loading";
import GoBack from "@components/navigation/GoBack";
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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import EventCard from "@components/event/EventCard";
import Alert from '@mui/material/Alert';



function EventDetails() {

  const { loggedUserId } = useContext(AuthContext)

  const { eventId } = useParams() 

  const [ isLoading, setIsLoading ] = useState(true);
  const [ event, setEvent ] = useState(null)
  const [ showMap, setShowMap ] = useState(false)
  const [ showParticipants, setShowParticipants ] = useState(false)
  const [ showAreYouSureButtons, setShowAreYouSureButtons ] = useState(false)


  useEffect(() => {
    getEventDetails()
  }, [])

  const getEventDetails = async () => {

    if (!isLoading) setIsLoading(true)

    try {
      
      const response = await service.get(`/event/${eventId}`)
      setEvent(response.data)

      setTimeout(() => setIsLoading(false), 700)

    } catch (error) {
      console.log(error)
    }

  }

  const handleJoinEvent = async () => {
    try {
      
      await service.patch(`/event/${eventId}/join`)
      getEventDetails() // to get new list of participants

    } catch (error) {
      console.log(error)
    }
  }

  const handleLeaveEvent = async () => {

    try {
      
      await service.patch(`/event/${event._id}/leave`)
      getEventDetails() // to get new list of participants

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }

  const hasUserJoined = event.participants.some((e) => e._id == loggedUserId)

  return (
    <Container>

      <GoBack to={`/event`}/> 

      <hr />

      {event.status === "cancelled" && <>
      <Typography variant="h3" color="error" gutterBottom>Este evento ha sido cancelado</Typography>
      <hr />
      </>}
      
      <EventCard event={event} fromDetails/>

      <hr />

      {hasUserJoined && <Typography variant="h5" color="info.main">¡Estas apuntado a este evento!</Typography>}
      {!hasUserJoined && <Box>
        <Button size="large" variant="contained" onClick={handleJoinEvent}>Unirse al evento!</Button>
      </Box>}
        
      <hr />

      <Card>
        <CardHeader
          subheader={`Mapa del evento`}
          action={
            <IconButton onClick={() => setShowMap(!showMap)}>
              {showMap ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showMap}>
          <CardMedia
            component="img"
            image={mapExample}
            alt="mapa-evento"
          />
        </Collapse>
      </Card>

      <hr />

      <Card>
        <CardHeader
          subheader={`Participantes`}
          action={
            <IconButton onClick={() => setShowParticipants(!showParticipants)}>
              {showParticipants ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showParticipants}>
        
          {event.participants.map((eachMember) => <UserCard key={eachMember._id} user={eachMember}/>)}
          {/* //todo to admin show all not in cars */}

        </Collapse>
      </Card>

      <hr />

        {hasUserJoined && <>
          <Button variant="outlined" color="error"onClick={() => setShowAreYouSureButtons(!showAreYouSureButtons)}>Salir del evento</Button>
        {showAreYouSureButtons && (
          <Card raised sx={{}}>
            <Alert severity="warning">Estas seguro que deseas salir? Si tienes un grupo de coche creado, esto eliminará el grupo.</Alert>
            <Button color="error" onClick={handleLeaveEvent}>Si</Button>
            <Button color="primary"onClick={() => setShowAreYouSureButtons(false)}>No</Button>
          </Card>
        )}
        </>}

      <hr />

      {/* //todo show all cars to admin with qty, people and assigned */}

      {hasUserJoined && (<>
        <EventParticipantCard getEventDetails={getEventDetails}/>
        {/* //todo separate elements in EventParticipantCard here */}
        <hr />
        <EventMessageBoard type="event" eventOrCarGroup={event}/>
      </>
      )}

    </Container>
  )
}

export default EventDetails