import { useState } from "react";

import UserCard from "@components/user/UserCard";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Collapse from '@mui/material/Collapse';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function EventParticipantsCollapse({attendees}) {

  const [ showParticipants, setShowParticipants ] = useState(false)

  return (
    <>
      <hr />
      <Card sx={{width: "100%"}}>
        <CardHeader
          sx={{textAlign: "start", pl:5}}
          subheader={`Ver Participantes: ${attendees.length}`}
          action={
            <IconButton onClick={() => setShowParticipants(!showParticipants)}>
              {showParticipants ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showParticipants}>

        {attendees.map((eachAttendee) => <UserCard key={eachAttendee._id} user={eachAttendee.user}/>)}
        {/* //! update to attendee so admin can see */}

        </Collapse>
      </Card>
    </>
  )
}

export default EventParticipantsCollapse