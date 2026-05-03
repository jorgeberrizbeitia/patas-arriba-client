// AttendeeAttendance — list view that renders one card per attendee on the
// event-management screen.
//
// What this file does NOT do anymore: warn the organizer about "pending"
// attendees. That warning made sense when the server defaulted new sign-ups
// to attendance: "pending" — the organizer's job was then to move every row
// out of pending. The server now defaults to "show", so the warning would
// either never fire (new events) or alarm the organizer about historical
// records they already know about. See specs/attendance-default.md.
//
// The single concern of this component is presenting the list. Per-attendee
// state changes (the dropdown, the save button, the network call) live in
// AttendeeAttendanceCard.

import AttendeeAttendanceCard from "./AttendeeAttendanceCard"

function AttendeeAttendance({attendees, setAttendees}) {
  return (
    <>
      {attendees.map((attendee) => <AttendeeAttendanceCard key={attendee._id} attendee={attendee} setAttendees={setAttendees}/>)}
    </>
  )
}

export default AttendeeAttendance
