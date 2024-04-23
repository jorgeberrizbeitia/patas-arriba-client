import { useState } from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Collapse from '@mui/material/Collapse';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography'

function EventDescription({event}) {

  const [ showDescription, setshowDescription ] = useState(false)

  return (
    <>
      <hr />
      <Card sx={{width: "100%"}}>
        <CardHeader
          subheader={`Información Adicional`}
          action={
            <IconButton onClick={() => setshowDescription(!showDescription)}>
              {showDescription ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showDescription}>

          <Box display="flex" flexDirection="column" alignItems="center" p={3}>

            <Typography variant="body1" color="initial" style={{ whiteSpace: 'pre-wrap', textAlign: "start" }}>{event.description}</Typography>

          </Box>

        </Collapse>
      </Card>
    </>
  )
}

export default EventDescription