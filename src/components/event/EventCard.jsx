import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import Link from '@mui/material/Link';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import CornerChip from '@components/ui/CornerChip';
import capitalizeAll from '@utils/capitalizeAll';
import formatDate from "@utils/formatDate.js"



function EventCard({event, fromDetails, totalRoomAvailableInCarGroups}) {

  const navigate = useNavigate()
  const {loggedUserId, loggedUserRole} = useContext(AuthContext)

  const eventDateStartOfDay = new Date(event.date)
  eventDateStartOfDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
  const todayStartOfDay = new Date()
  todayStartOfDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

  const hasUserJoinedFromList = event.attendees.includes(loggedUserId) // attendees without populate (from event list) 
  const hasUserJoinedFromDetails = event.attendees.some((attendee) => attendee?.user?._id == loggedUserId) // attendees with populate (from event details)
  //todo improve above code

  let statusChip;
  if (event.status === "open" && eventDateStartOfDay >= todayStartOfDay) {
    statusChip = <Chip label="Estado: Abierto" variant='filled' color="primary"/>
  } else if (event.status === "closed") {
    statusChip = <Chip label="Estado: Cerrado" variant='filled' color="warning"/>
  } else if (event.status === "cancelled") {
    statusChip = <Chip label="Estado: Cancelado" variant='filled' color="error"/>
  }

  // let categoryChip = <Chip label={`Categoria: ${capitalizeAll(event.category)}`} variant='outlined' color="info"/>

  let joinedChip;
  if (hasUserJoinedFromList || hasUserJoinedFromDetails) {
    joinedChip = <Chip label="Apuntado" variant='filled' color="success"/>
  }

  let timeFrameChip;
  if (eventDateStartOfDay > todayStartOfDay) {
    timeFrameChip = <Chip label="Próximo" variant='filled' color="primary"/>
  } else if (eventDateStartOfDay.toDateString() === todayStartOfDay.toDateString()) {
    timeFrameChip = <Chip label="Hoy" variant='filled' color="info"/>
  } else {
    timeFrameChip = <Chip label="Pasado" variant='filled' sx={{bgcolor: "gray.main", color: "white"}}/>
  }

  let cornerTimeFrameChip;
  if (eventDateStartOfDay > todayStartOfDay) {
    cornerTimeFrameChip = <CornerChip label="Próximo" bgcolor="primary.main" color="black" side={"left"}/>
  } else if (eventDateStartOfDay.toDateString() === todayStartOfDay.toDateString()) {
    cornerTimeFrameChip = <CornerChip label="Es Hoy" bgcolor="info.main" color="white" side={"left"}/>
  } else {
    cornerTimeFrameChip = <CornerChip label="Pasado" bgcolor="gray.main" color="white" side={"left"}/>
  }

  return (
    <Card raised={fromDetails ? false : true} sx={{ minHeight: "230px", width: "100%", position: 'relative', mb: "20px" }}>
      
      {cornerTimeFrameChip}

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
          <Typography variant="span" color="initial" fontWeight="bold">Categoria:</Typography>
          <Typography variant="span" color="initial"> {capitalizeAll(event.category)}</Typography>
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <Typography variant="span" color="initial" fontWeight="bold">Lugar:</Typography>
          <Typography variant="span" color="initial"> {event.location}</Typography>
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <Typography variant="span" color="initial" fontWeight="bold">Fecha:</Typography>
          <Typography variant="span" color="initial"> {formatDate(event.date, "event")}</Typography>
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <Typography variant="span" color="initial" fontWeight="bold">Hora:</Typography>
          <Typography variant="span" color="initial"> {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Typography>

        {event.status !== "cancelled" && <Typography variant="body2" color="text.secondary" gutterBottom>
          <Typography variant="span" color="initial" fontWeight="bold">Participantes:</Typography>
          <Typography variant="span" color="initial"> {event.attendees.length}</Typography>
        </Typography>}

        {(totalRoomAvailableInCarGroups !== undefined && event.status !== "cancelled" && event.hasCarOrganization)&& 
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Typography variant="span" color="initial" fontWeight="bold">Plazas en coche disponibles:</Typography>
            <Typography variant="span" color="initial"> {totalRoomAvailableInCarGroups}</Typography>
          </Typography>}

        {fromDetails && <Typography variant="body2" color="text.secondary" gutterBottom>
          <Typography variant="span" color="initial" fontWeight="bold">Organizado por:</Typography>
          <Link color="info.main" onClick={() => navigate(`/user/${event.owner._id}`)}> {event.owner?.username}</Link>
        </Typography>}

        <br />

        <Box display="flex" justifyContent="center" gap="5px">
          {timeFrameChip}
          {statusChip}
          {joinedChip}
        </Box>

      </CardContent>

      {!fromDetails && 
        <CardActions sx={{ justifyContent: 'center'}}>
          <Button onClick={() => navigate(`/event/${event._id}`)}>ver mas detalles</Button>
        </CardActions>
      }

    </Card>
  );
}

export default EventCard;
