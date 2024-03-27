import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

import { Link } from 'react-router-dom';

function EventCard({event}) {

  //todo change styles if: isUpcoming, isJoined, isCancelled 

  return (
    <Card raised sx={{ height: "230px", marginTop: "20px" }}>
      <CardHeader title={event.title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Lugar: {event.location}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Apuntados: {event.participants.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Fecha: {event.participants.length}
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
