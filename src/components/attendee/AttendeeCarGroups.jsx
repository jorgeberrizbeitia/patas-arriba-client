import { useEffect, useState } from "react"
import AttendeeTaskCard from "./AttendeeTaskCard"
import service from "@service/config"
import { useParams } from "react-router-dom"
import Loading from "@components/ui/Loading"
import Alert from "@mui/material/Alert"
import AttendeeCarGroupCard from "./AttendeeCarGroupCard"


function AttendeeCarGroups({attendees, carGroups}) {

  const attendeesWithCarGroups = attendees.map((attendee) => {
    //* map to add car group information to the attendee objects
    attendee.carGroup = carGroups.find((carGroup) => {
      const isAttendeeCar = carGroup.owner._id == attendee.user._id
      const isAttendeeAsPassenger = carGroup.passengers.some((passenger) => passenger == attendee.user._id)
      return (isAttendeeCar || isAttendeeAsPassenger)
    })
    return attendee
  })

  return (
    <>
      {attendeesWithCarGroups.map((attendee) => <AttendeeCarGroupCard key={attendee._id} attendee={attendee}/>)}
      {/* //* not sorting by no car assigned because it changes order compared to other two manage types */}
    </>
  )
}

export default AttendeeCarGroups