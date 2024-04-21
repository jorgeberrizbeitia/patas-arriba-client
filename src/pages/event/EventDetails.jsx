import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom";

import service from "@service/config"

import Loading from "@components/ui/Loading";
import GoBack from "@components/navigation/GoBack";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { AuthContext } from "@context/auth.context"

import EventMessageBoard from "@components/messages/EventMessageBoard";
import EventCard from "@components/event/EventCard";
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
  const [ eventMessages, setEventMessages ] = useState(null)

  useEffect(() => {
    getEventDetails()
  }, [])

  const getEventDetails = async () => {

    if (!isLoading) setIsLoading(true)

    try {
      
      const response = await service.get(`/event/${eventId}`)
      console.log(response.data)
      setEvent(response.data.eventDetails) // attendees are in eventDetails
      setEventCarGroups(response.data.carGroups)
      setEventMessages(response.data.messages)

      // setTimeout(() => {
        setIsLoading(false)
      // }, 700)

    } catch (error) {
      console.log(error)
    }

  }

  const handleJoinEvent = async () => {
    try {
      
      const response = await service.post(`/attendee/${eventId}`)
      setEvent({...event, attendees: [...event.attendees, response.data]})

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

  const hasUserJoined = event.attendees.some((attendee) => attendee.user._id == loggedUserId)
  console.log(event.attendees)
  const myCarGroup = eventCarGroups.find((eachCarGroup) => {
    return eachCarGroup.members.includes(loggedUserId) || eachCarGroup.owner._id == loggedUserId
  })
  const totalRoomAvailableInCarGroups = eventCarGroups.reduce((acc, group) => acc + (group.roomAvailable - group.members.length), 0)
  console.log(totalRoomAvailableInCarGroups)

  const today = new Date()
  today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
  const isEventInThePast = new Date(event.date) < today

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

      {!hasUserJoined && !isEventInThePast && <Box>
        <Button size="large" variant="contained" onClick={handleJoinEvent} disabled={event.status === "closed" || event.status === "cancelled" || isEventInThePast}>
          {event.status === "open" && "¡Unete al evento!"}
          {event.status === "closed" && "Evento cerrado"}
          {event.status === "cancelled" && "Evento cancelado"}
        </Button>
      </Box>}

      {isEventInThePast && <Button size="large" variant="contained" disabled={true}>este evento ya ha pasado</Button>}

      <hr />

      {hasUserJoined && <Typography sx={{width: "100%"}}variant="h3" color="success.main">¡Ya estas apuntado al evento!</Typography>}

      {/* {hasUserJoined && <EventMapCard event={event}/> } */}

      {hasUserJoined && <EventParticipantsCard event={event}/> }

      {(hasUserJoined && event.hasCarOrganization) && <EventCarGroupInfoCard myCarGroup={myCarGroup}/>}

      {/* //todo show all cars to admin with qty, people and assigned */}

      {hasUserJoined && (<EventMessageBoard type="event" eventOrCarGroup={event} messages={eventMessages} setMessages={setEventMessages}/>)}

      {hasUserJoined && <EventLeaveButton handleLeaveEvent={handleLeaveEvent}/>}

    </>
  )
}

export default EventDetails