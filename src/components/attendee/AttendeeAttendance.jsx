import { useEffect, useState } from "react"
import service from "@service/config"
import { useParams } from "react-router-dom"
import Loading from "@components/ui/Loading"
import AttendeeAttendanceCard from "./AttendeeAttendanceCard"
import Alert from "@mui/material/Alert"


function AttendeeAttendance({attendees, setAttendees}) {
  return (
    <>
    
      {attendees.map((attendee) => <AttendeeAttendanceCard key={attendee._id} attendee={attendee} setAttendees={setAttendees}/>)}

      {attendees.some((attendee) => attendee.attendance === "pending") && <Alert severity="warning">Aun hay usuarios pendientes por marcar asistencia</Alert>}

    </>
  )
}

export default AttendeeAttendance