import GoBack from '@components/navigation/GoBack';
import Loading from '@components/ui/Loading';
import service from '@service/config';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import AttendeeTasks from '@components/attendee/AttendeeTasks';
import Typography from '@mui/material/Typography'
import formatDate from '@utils/formatDate';
import Alert from '@mui/material/Alert';
import AttendeeAttendance from '@components/attendee/AttendeeAttendance';
import AttendeeCarGroups from '@components/attendee/AttendeeCarGroups';

function EventManage() {

  const { eventId } = useParams() 
  const navigate = useNavigate()

  const [ isLoading, setIsLoading ] = useState(true);
  const [ event, setEvent ] = useState(null)
  const [ attendees, setAttendees ] = useState(null)
  const [ carGroups, setCarGroups ] = useState(null)

  //todo manage states with queries so back button works better
  const [ manageType, setManageType ] = useState(null)
  // editType 1: carGroups, 2: tasks, 3: attendance

  useEffect(() => {
    getEventDetails()
  }, [])

  const getEventDetails = async () => {
    if (!isLoading) setIsLoading(true)
    try {
      const response = await service.get(`/event/${eventId}`)
      setEvent(response.data.eventDetails)
      setCarGroups(response.data.carGroups)
      setAttendees(response.data.eventDetails.attendees)
      setIsLoading(false)

    } catch (error) {
      navigate("/server-error")
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
    
      <GoBack to={`/event/${eventId}`} caption="evento"/> 

      <Typography variant="h4" color="text" gutterBottom>¿Como quieres gestionar los participantes del evento: {event.title}, de fecha: {formatDate(event.date)}?</Typography>

      {event.status !== "closed" && <Alert severity='warning'>Este evento no ha sido cerrado aun. Si un participante sale del evento la asistancia y tarea de ese usuario se perderá. Considera cerrar el evento <Link onClick={() => navigate(`/event/${event._id}/edit`)} >aqui</Link>  primero antes de asignar tareas y/o marcar la asistencia.</Alert>}

      <br />

      <Box display="flex" flexDirection="row" justifyContent="space-evenly" paddingBottom={2}>
        
        {event.hasCarOrganization && <Button 
          onClick={() => setManageType(1)} 
          variant={manageType === 1 ? "contained" : "outlined"} 
          color="info" 
          sx={{width: "32%", height: 60}}
        > Participantes por coches</Button>}

        {event.hasTaskAssignments && <Button 
          onClick={() => setManageType(2)} 
          variant={manageType === 2 ? "contained" : "outlined"} 
          color="info" 
          sx={{width: "32%", height: 60}}
        > Asignar tareas</Button>}

        <Button 
          onClick={() => setManageType(3)} 
          variant={manageType === 3 ? "contained" : "outlined"} 
          color="info"
          sx={{width: "32%", height: 60}}
        > Marcar asistencia</Button>

      </Box>

      {manageType === 1 && <AttendeeCarGroups attendees={attendees} carGroups={carGroups}/>}
      {manageType === 2 && <AttendeeTasks attendees={attendees} setAttendees={setAttendees}/>}
      {manageType === 3 && <AttendeeAttendance attendees={attendees} setAttendees={setAttendees}/>}

    </>
  )
}

export default EventManage