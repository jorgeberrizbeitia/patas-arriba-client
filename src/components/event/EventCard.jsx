import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import CornerChip from '@components/ui/CornerChip';

function EventCard({event}) {

  const {loggedUserId} = useContext(AuthContext)

  //todo change styles if: isUpcoming, isJoined, isCancelled 

  const eventDateStartOfDay = new Date(event.date)
  eventDateStartOfDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
  const todayStartOfDay = new Date()
  todayStartOfDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
  console.log(todayStartOfDay, eventDateStartOfDay)

  return (
    <Card raised sx={{ minHeight: "250px", mt: "20px", position: 'relative' }}>
      {/* { eventDateStartOfDay > todayStartOfDay && <Chip sx={{m: 1}} label="Próximo Evento" color="primary"/> } */}
      {/* { eventDateStartOfDay.toDateString() === todayStartOfDay.toDateString() && <Chip sx={{m: 1}} label="Hoy!" color="info"/> } */}
      {/* { event.participants.includes(loggedUserId) && <Chip sx={{m: 1}} label="Ya te has apuntado!" color="success" />} */}
      
      { event.participants.includes(loggedUserId) && <CornerChip label="Apuntado" color="#2ECC71" side={"right"} />}
      { event.status === "cancelled" && <CornerChip label="Cancelado" color="#E74C3C" side={"right"}/> }
      { eventDateStartOfDay > todayStartOfDay && <CornerChip label="Próximo" color="#EFB665" side={"left"}/> }
      { eventDateStartOfDay.toDateString() === todayStartOfDay.toDateString() && <CornerChip label="Es Hoy" color="#3498DB" side={"left"}/> }

      {/* //todo find out how to use mui color palette */}

      <CardHeader title={event.title} sx={{pl: 10, pr: 10}}/>
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
        <Link to={`/event/${event._id}`}>
          <Button size="small">ver mas detalles</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default EventCard;
