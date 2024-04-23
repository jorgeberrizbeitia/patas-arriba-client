import { useState } from "react";

import UserCard from "@components/user/UserCard";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Collapse from '@mui/material/Collapse';
import IconButton from "@mui/material/IconButton";
import AssignmentIcon from '@mui/icons-material/Assignment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography'

function EventTask({userAttendee}) {

  const [ showDescription, setshowDescription ] = useState(false)

  return (
    <>
      <hr />

      {!userAttendee.task && <Typography sx={{width: "100%", pb: 1}} color="warning.main">
        Aun no tienes tarea asignada, revisa más cerca de la fecha del evento para saber como puedes apoyar el día del evento.
      </Typography>}

      {userAttendee.task && <Typography sx={{width: "100%", pb: 1}} color="success.main">
        ¡Ya tienes una tarea asignada para el evento!
      </Typography>}

      {userAttendee.task && <Card sx={{width: "100%"}}>
        <CardHeader
          avatar={<AssignmentIcon />}
          title={userAttendee.task}
          sx={{pr: 8}}
          />
        </Card>}
    </>
  )
}

export default EventTask