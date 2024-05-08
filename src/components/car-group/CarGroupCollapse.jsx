import { useState } from "react";

import UserCard from "@components/user/UserCard";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Collapse from '@mui/material/Collapse';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CarGroupListItem from "./CarGroupListItem";

function EventParticipantsCollapse({carGroups}) {


  const [ showCarGroups, setShowCarGroups ] = useState(false)

  return (
    <>
      <hr />
      <Card sx={{width: "100%"}}>
        <CardHeader
        sx={{textAlign: "start", pl: 5}}
          subheader={`Ver Coches: ${carGroups.length}`}
          action={
            <IconButton onClick={() => setShowCarGroups(!showCarGroups)}>
              {showCarGroups ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showCarGroups}>

        {carGroups.map((carGroup) => <CarGroupListItem key={carGroup._id} carGroup={carGroup}/>)}

        </Collapse>
      </Card>
    </>
  )
}

export default EventParticipantsCollapse