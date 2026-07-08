import { useState } from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Collapse from '@mui/material/Collapse';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography'
import Alert from "@mui/material/Alert";

import Linkify from "react-linkify";

function EventDescription({event}) {

  const [ showDescription, setshowDescription ] = useState(false)

  return (
    <>
      <hr />
      {event.description 
        ? 
        <Card sx={{width: "100%"}}>
          <CardHeader
            subheader={`Info Organización del evento`}
            action={
              <IconButton
                aria-label="Mostrar información del evento"
                aria-expanded={showDescription}
                onClick={() => setshowDescription(!showDescription)}
              >
                {showDescription ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            }
          />
          <Collapse in={showDescription}>

            <Box display="flex" flexDirection="column" alignItems="center" p={3}>
              <Linkify>
                <Typography variant="body2" color="initial" style={{ whiteSpace: 'pre-wrap', textAlign: "start", wordBreak: 'break-word',}}>{event.description}</Typography>  
              </Linkify>
            </Box>

          </Collapse>
        </Card>
        : 
        <Alert severity="warning">Revisa más cerca de la fecha del evento para ver información sobre la organización aqui</Alert>
      }
      
    </>
  )
}

export default EventDescription