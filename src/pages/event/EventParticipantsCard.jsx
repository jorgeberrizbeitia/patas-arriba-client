import { useState } from "react";

import UserCard from "@components/user/UserCard";

import Card from "@mui/material/Card";
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
      <Card>
        <CardHeader
          subheader={`Participantes`}
          action={
            <IconButton onClick={() => setShowParticipants(!showParticipants)}>
              {showParticipants ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showParticipants}>
          
          {event.participants.map((eachMember) => <UserCard key={eachMember._id} user={eachMember}/>)}
          {/* //todo to admin show all not in cars */}

        </Collapse>
      </Card>
    </>
  )
}

export default EventParticipantsCard