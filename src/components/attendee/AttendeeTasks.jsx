import { useEffect, useState } from "react"
import AttendeeTaskCard from "./AttendeeTaskCard"
import service from "@service/config"
import { useParams } from "react-router-dom"
import Loading from "@components/ui/Loading"
import Alert from "@mui/material/Alert"


function AttendeeTasks({attendees, setAttendees}) {
  return (
    <>
    
      {attendees.map((attendee) => <AttendeeTaskCard key={attendee._id} attendee={attendee} setAttendees={setAttendees}/>)}

      {attendees.some((attendee) => !attendee.task) && <Alert severity="warning">Aun hay usuarios pendientes por asignar tareas</Alert>}

    </>
  )
}

export default AttendeeTasks