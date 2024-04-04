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

function EventCard({event, fromDetails}) {

  const navigate = useNavigate()
  const {loggedUserId, loggedUserRole} = useContext(AuthContext)

  const eventDateStartOfDay = new Date(event.date)
  eventDateStartOfDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
  const todayStartOfDay = new Date()
  todayStartOfDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

  const hasUserJoined = event.participants.some((e) => e._id == loggedUserId) // participants without populate (from event list)
  const hasUserJoined2 = event.participants.includes(loggedUserId) // participants with populate (from event details)
  //todo improve above code

  return (
    <Card raised sx={{ minHeight: "250px", mt: "20px", position: 'relative' }}>

      {/* //* Dont delete, this is another way to show chips */}
      {/* { eventDateStartOfDay > todayStartOfDay && <Chip sx={{m: 1}} label="Próximo Evento" color="primary"/> } */}
      {/* { eventDateStartOfDay.toDateString() === todayStartOfDay.toDateString() && <Chip sx={{m: 1}} label="Hoy!" color="info"/> } */}
      {/* { event.participants.includes(loggedUserId) && <Chip sx={{m: 1}} label="Ya te has apuntado!" color="success" />} */}
      
      { (hasUserJoined || hasUserJoined2) && <CornerChip label="Apuntado" color="#2ECC71" side={"right"} />}
      { event.status === "cancelled" && <CornerChip label="Cancelado" color="#E74C3C" side={"right"}/> }
      { eventDateStartOfDay > todayStartOfDay && <CornerChip label="Próximo" color="#EFB665" side={"left"}/> }
      { eventDateStartOfDay.toDateString() === todayStartOfDay.toDateString() && <CornerChip label="Es Hoy" color="#3498DB" side={"left"}/> }

      {/* //todo find out how to use mui color palette */}

      <CardHeader 
        title={event.title}
        sx={{pl: (fromDetails && loggedUserRole === "admin") ? 7.5 : 2}}
        // * above is to account for the icon on the right side when user is admin
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
          Lugar: {event.location}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Fecha: {new Date(event.date).toDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Participantes: {event.participants.length}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center'}}>
        {!fromDetails && <Button size="small" onClick={() => navigate(`/event/${event._id}`)}>ver mas detalles</Button>}
      </CardActions>
    </Card>
  );
}

export default EventCard;
