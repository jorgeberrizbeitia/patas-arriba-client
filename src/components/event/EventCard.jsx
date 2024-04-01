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

function EventCard({event}) {

  const {loggedUserId} = useContext(AuthContext)

  //todo change styles if: isUpcoming, isJoined, isCancelled 

  const eventDate = new Date(event.date)
  const today = new Date()

  return (
    <Card raised sx={{ minHeight: "250px", mt: "20px" }}>
      { eventDate > today && <Chip sx={{m: 1}} label="Próximo Evento" color="primary"/> }
      { event.participants.includes(loggedUserId) && <Chip sx={{m: 1}} label="Te has apuntado!" color="success" />}
      <CardHeader title={event.title} />
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
