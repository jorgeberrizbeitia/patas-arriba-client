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
import IconButton from "@mui/material/IconButton";

import EventMessageBoard from "@components/messages/EventMessageBoard";
import EditIcon from '@mui/icons-material/Edit';
import PetsIcon from '@mui/icons-material/Pets';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import EventCard from "@components/event/EventCard";
import Alert from '@mui/material/Alert';
import EventMapCard from "@components/event/EventMapCard";
import EventParticipantsCard from "../../components/event/EventParticipantsCard";
import EventLeaveButton from "../../components/event/EventLeaveButton";
import EventCarGroupInfoCard from "../../components/event/EventCarGroupInfoCard";



function EventDetails() {

  const { loggedUserId } = useContext(AuthContext)

  const { eventId } = useParams() 

  const [ isLoading, setIsLoading ] = useState(true);
  const [ event, setEvent ] = useState(null)
  const [ eventCarGroups, setEventCarGroups ] = useState(null)

  useEffect(() => {
    getEventDetails()
  }, [])

  const getEventDetails = async () => {

    if (!isLoading) setIsLoading(true)

    try {
      
      const responseEvent = await service.get(`/event/${eventId}`)
      const responseCarGroups = await service.get(`/car-group/list/${eventId}`)
      setEvent(responseEvent.data)
      setEventCarGroups(responseCarGroups.data)

      // setTimeout(() => {
        setIsLoading(false)
      // }, 700)

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
  const myCarGroup = eventCarGroups.find((eachCarGroup) => {
    return eachCarGroup.members.includes(loggedUserId) || eachCarGroup.owner._id == loggedUserId
  })
  const totalRoomAvailableInCarGroups = eventCarGroups.reduce((acc, group) => acc + (group.roomAvailable - group.members.length), 0)
  console.log(totalRoomAvailableInCarGroups)

  return (
    <>

      <GoBack to={`/event`}/> 

      {event.status === "cancelled" && <>
      <Typography variant="h3" color="error" gutterBottom>Este evento ha sido cancelado</Typography>
      <hr />
      </>}

      {event.status === "closed" && <>
      <Typography variant="h3" color="warning.main" gutterBottom>Este evento ya no acepta nuevos participantes</Typography>
      <hr />
      </>}
      
      <EventCard event={event} fromDetails totalRoomAvailableInCarGroups={totalRoomAvailableInCarGroups}/>

      {!hasUserJoined && <Box>
        <Button size="large" variant="contained" onClick={handleJoinEvent} disabled={event.status === "closed" || event.status === "cancelled"}>
          {event.status === "open" && "¡Unete al evento!"}
          {event.status === "closed" && "Evento cerrado"}
          {event.status === "cancelled" && "Evento cancelado"}
        </Button>
      </Box>}

      <hr />

      {hasUserJoined && <Typography sx={{width: "100%"}}variant="h3" color="success.main">¡Ya estas apuntado al evento!</Typography>}

      {hasUserJoined && <EventMapCard event={event}/> }

      {hasUserJoined && <EventParticipantsCard event={event}/> }

      {(hasUserJoined && event.category === "car-group") && <EventCarGroupInfoCard myCarGroup={myCarGroup}/>}

      {/* //todo show all cars to admin with qty, people and assigned */}

      {hasUserJoined && (<EventMessageBoard type="event" eventOrCarGroup={event}/>)}

      {hasUserJoined && <EventLeaveButton handleLeaveEvent={handleLeaveEvent}/>}

    </>
  )
}

export default EventDetails