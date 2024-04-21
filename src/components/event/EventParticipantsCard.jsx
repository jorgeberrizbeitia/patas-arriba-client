import { useState } from "react";

import UserCard from "@components/user/UserCard";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Collapse from '@mui/material/Collapse';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function EventParticipantsCard({event}) {

  const [ showParticipants, setShowParticipants ] = useState(false)

  return (
    <>
      <hr />
      <Card sx={{width: "100%"}}>
        <CardHeader
          subheader={`Participantes`}
          action={
            <IconButton onClick={() => setShowParticipants(!showParticipants)}>
              {showParticipants ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showParticipants}>

          <Box display="flex" flexDirection="column" alignItems="center" p={3}>
            {event.attendees.map((eachAttendee) => <UserCard key={eachAttendee._id} attendee={eachAttendee}/>)}
            {/* //todo to admin show all not in cars */}
          </Box>
          

        </Collapse>
      </Card>
    </>
  )
}

export default EventParticipantsCard