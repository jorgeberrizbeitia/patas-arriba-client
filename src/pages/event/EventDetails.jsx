import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";

import service from "@service/config"

import Loading from "@components/ui/Loading";
import GoBack from "@components/navigation/GoBack";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { AuthContext } from "@context/auth.context"

import EventMessageBoard from "@components/messages/EventMessageBoard";
import EventCard from "@components/event/EventCard";
import EventParticipantsCollapse from "../../components/event/EventParticipantsCollapse";
import EventLeaveButton from "../../components/event/EventLeaveButton";
import EventCarGroupInfoCard from "../../components/event/EventCarGroupInfoCard";
import EventDescription from "@components/event/EventDescription";
import EventTask from "@components/event/EventTask";
import CarGroupCollapse from "@components/car-group/CarGroupCollapse";


function EventDetails() {

  const { loggedUserId, loggedUserRole } = useContext(AuthContext)
  const navigate = useNavigate()

  const { eventId } = useParams() 

  const [ isLoading, setIsLoading ] = useState(true);
  const [ event, setEvent ] = useState(null)
  const [ eventCarGroups, setEventCarGroups ] = useState(null)
  const [ eventMessages, setEventMessages ] = useState(null)
  const [ userAttendee, setUserAttendee ] = useState(null)
  console.log(userAttendee)
  useEffect(() => {
    getEventDetails()
  }, [])

  const getEventDetails = async () => {

    if (!isLoading) setIsLoading(true)

    try {
      
      const response = await service.get(`/event/${eventId}`)
      setEvent(response.data.eventDetails) // attendees are in eventDetails
      //todo get attendees on its own state
      setEventCarGroups(response.data.carGroups)
      setEventMessages(response.data.messages)

      const foundAttendee = response.data.eventDetails.attendees.find((attendee) => attendee.user._id == loggedUserId)
      setUserAttendee(foundAttendee)

      setIsLoading(false)

    } catch (error) {
      navigate("/server-error")
    }

  }

  const handleJoinEvent = async () => {
    try {
      const response = await service.post(`/attendee/${eventId}`)
      setEvent({...event, attendees: [...event.attendees, response.data]})
      setUserAttendee(response.data)
    } catch (error) {
      navigate("/server-error")
    }
  }

  const handleLeaveEvent = async () => {
    try {
      await service.delete(`/attendee/${event._id}`)
      setEvent({...event, attendees: event.attendees.filter((attendee) => attendee.user._id != loggedUserId)})
      setUserAttendee(null)
    } catch (error) {
      navigate("/server-error")
    }
  }

  if (isLoading) {
    return <Loading />
  }

  // const hasUserJoined = event.attendees.some((attendee) => attendee.user._id == loggedUserId)
  const myCarGroup = eventCarGroups.find((eachCarGroup) => {
    const loggedUserIsCarGroupOwner = eachCarGroup.owner._id == loggedUserId
    const loggedUserIsCarGroupParticipant = eachCarGroup.passengers.some((passenger) => passenger._id == loggedUserId)
    return loggedUserIsCarGroupOwner || loggedUserIsCarGroupParticipant
  })
  console.log(myCarGroup);
  
  const totalRoomAvailableInCarGroups = eventCarGroups.reduce((acc, group) => acc + (group.roomAvailable - group.passengers.length), 0)

  const today = new Date()
  // today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
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

      {loggedUserRole === "admin" && userAttendee && <Button 
        variant="contained"
        size="medium"
        sx={{mb: 2}}
        color="primary" 
        onClick={() => navigate(`/event/${event._id}/manage`)}
        > Gestiona los participantes</Button>}

      {!userAttendee && !isEventInThePast && <Box>
        <Button size="large" variant="contained" onClick={handleJoinEvent} disabled={event.status === "closed" || event.status === "cancelled" || isEventInThePast}>
          {event.status === "open" && "¡Unete al evento!"}
          {event.status === "closed" && "Evento cerrado"}
          {event.status === "cancelled" && "Evento cancelado"}
        </Button>
      </Box>}

      {isEventInThePast && !userAttendee && <Button 
        size="large" 
        variant="contained" 
        disabled={true}
        > este evento ya ha pasado</Button>}

      <hr />

      {userAttendee && <Typography sx={{width: "100%"}}variant="h3" color="success.main">¡Ya estas apuntado al evento!</Typography>}

      {userAttendee && event.description && <EventDescription event={event}/> }

      {userAttendee && <EventParticipantsCollapse attendees={event.attendees}/> }
      {/* //todo change name to attendees */}

      {userAttendee && event.hasCarOrganization && <CarGroupCollapse carGroups={eventCarGroups}/> }

      {(userAttendee && event.hasCarOrganization) && <EventCarGroupInfoCard myCarGroup={myCarGroup}/>}

      {userAttendee && event.hasTaskAssignments && <EventTask userAttendee={userAttendee}/> }

      {userAttendee && (<EventMessageBoard type="event" eventOrCarGroup={event} messages={eventMessages} setMessages={setEventMessages}/>)}

      {userAttendee && <EventLeaveButton handleLeaveEvent={handleLeaveEvent} event={event}/>}

    </>
  )
}

export default EventDetails