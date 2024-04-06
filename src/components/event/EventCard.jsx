import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";

import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import CornerChip from '@components/ui/CornerChip';



function EventCard({event, fromDetails, totalRoomAvailableInCarGroups}) {

  const navigate = useNavigate()
  const {loggedUserId, loggedUserRole} = useContext(AuthContext)

  const eventDateStartOfDay = new Date(event.date)
  eventDateStartOfDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
  const todayStartOfDay = new Date()
  todayStartOfDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

  const hasUserJoined = event.participants.some((e) => e._id == loggedUserId) // participants without populate (from event list)
  const hasUserJoined2 = event.participants.includes(loggedUserId) // participants with populate (from event details)
  //todo improve above code

  let rightChip;
  if (event.status === "cancelled") {
    rightChip = <CornerChip label="Cancelado" color="error.main" side={"right"}/>
  } else if (hasUserJoined || hasUserJoined2) {
    rightChip = <CornerChip label="Apuntado" color="success.main" side={"right"} />
  } else if (event.status === "closed") {
    console.log("cerrado")
    rightChip = <CornerChip label="Cerrado" color="warning.main" side={"right"}/>
  }

  let leftChip;
  if (eventDateStartOfDay > todayStartOfDay) {
    leftChip = <CornerChip label="Próximo" color="primary.main" side={"left"}/>
  } else if (eventDateStartOfDay.toDateString() === todayStartOfDay.toDateString()) {
    leftChip = <CornerChip label="Es Hoy" color="info.main" side={"left"}/>
  } else {
    leftChip = <CornerChip label="Pasado" color="gray.main" side={"left"}/>
  }

  return (
    <Card raised sx={{ minHeight: "230px", width: "100%", position: 'relative', mb: "20px" }}>
      
      {leftChip}
      {rightChip}

      <CardHeader 
        sx={{ pl: (fromDetails && loggedUserRole === "admin") ? 7.5 : 2}}
        // * above is to account for the icon on the right side when user is admin
        title={<Typography variant="h4" sx={{px: "8%"}}>{event.title}</Typography>}
        action={(fromDetails && loggedUserRole === "admin") && 
          <IconButton 
            onClick={() => navigate(`/event/${event._id}/edit`)} 
            color="primary"
            sx={{width: "50px", height: "50px"}}
          ><EditIcon/>
            <Typography variant="icon">editar</Typography>
          </IconButton>}
      />
      <CardContent>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <Typography variant="span" color="initial" fontWeight="bold">Lugar:</Typography>
          <Typography variant="span" color="initial"> {event.location}</Typography>
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <Typography variant="span" color="initial" fontWeight="bold">Fecha:</Typography>
          <Typography variant="span" color="initial"> {new Date(event.date).toDateString()}</Typography>
        </Typography>

        {event.status !== "cancelled" && <Typography variant="body2" color="text.secondary" gutterBottom>
          <Typography variant="span" color="initial" fontWeight="bold">Participantes:</Typography>
          <Typography variant="span" color="initial"> {event.participants.length}</Typography>
        </Typography>}

        {(totalRoomAvailableInCarGroups !== undefined && event.status !== "cancelled" && event.category === "car-group")&& 
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Typography variant="span" color="initial" fontWeight="bold">Plazas en coche disponibles:</Typography>
            <Typography variant="span" color="initial"> {totalRoomAvailableInCarGroups}</Typography>
          </Typography>}

      </CardContent>

      {!fromDetails && 
        <CardActions sx={{ justifyContent: 'center'}}>
          <Button size="small" onClick={() => navigate(`/event/${event._id}`)}>ver mas detalles</Button>
        </CardActions>
      }

    </Card>
  );
}

export default EventCard;
