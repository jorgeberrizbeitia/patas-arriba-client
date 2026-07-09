import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from "@mui/material/IconButton";
import Link from '@mui/material/Link';

import { useNavigate } from 'react-router-dom';
import useTransitionNavigate from '@utils/useTransitionNavigate';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import CornerChip from '@components/ui/CornerChip';
import capitalizeAll from '@utils/capitalizeAll';
import formatDate from "@utils/formatDate.js"



function EventCard({event, fromDetails, totalRoomAvailableInCarGroups}) {

  const navigate = useNavigate()
  const transitionNavigate = useTransitionNavigate()
  const {loggedUserId, isOrganizerOrAdmin} = useContext(AuthContext)

  const eventDateStartOfDay = new Date(event.date)
  eventDateStartOfDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
  const todayStartOfDay = new Date()
  todayStartOfDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

  const hasUserJoinedFromList = event.attendees.includes(loggedUserId) // attendees without populate (from event list) 
  const hasUserJoinedFromDetails = event.attendees.some((attendee) => attendee?.user?._id == loggedUserId) // attendees with populate (from event details)
  //todo improve above code

  let statusChip;
  if (event.status === "open" && eventDateStartOfDay >= todayStartOfDay) {
    statusChip = <Chip label="Abierto" variant='outlined' color="success"/>
  } else if (event.status === "closed") {
    statusChip = <Chip label="Cerrado" variant='outlined' color="warning"/>
  } else if (event.status === "cancelled") {
    statusChip = <Chip label="Cancelado" variant='filled' color="error"/>
  }

  // let categoryChip = <Chip label={`Categoria: ${capitalizeAll(event.category)}`} variant='outlined' color="info"/>

  let joinedChip;
  if (hasUserJoinedFromList || hasUserJoinedFromDetails) {
    joinedChip = <Chip label="Apuntado" variant='filled' color="success"/>
  }

  let cornerTimeFrameChip;
  if (eventDateStartOfDay > todayStartOfDay) {
    cornerTimeFrameChip = <CornerChip label="Próximo" bgcolor="brand.tealDeep" color="white" side={"left"}/>
  } else if (eventDateStartOfDay.toDateString() === todayStartOfDay.toDateString()) {
    cornerTimeFrameChip = <CornerChip label="Es Hoy" bgcolor="info.main" color="white" side={"left"}/>
  } else {
    cornerTimeFrameChip = <CornerChip label="Pasado" bgcolor="grey.600" color="white" side={"left"}/>
  }

  // On the list the WHOLE card opens the details — the biggest tap target
  // on the screen, instead of a small text button. Details mode renders the
  // same body unwrapped (it contains its own interactive elements).
  const cardBody = (
    <>
      <CardHeader
        sx={{ pl: (fromDetails && isOrganizerOrAdmin) ? 7.5 : 2}}
        // * above is to account for the icon on the right side when user is organizer or admin
        title={<Typography variant="h4" sx={{px: "8%"}}>{event.title}</Typography>}
        action={(fromDetails && isOrganizerOrAdmin) && 
          <IconButton 
            aria-label="Editar evento"
            onClick={() => navigate(`/event/${event._id}/edit`)} 
            color="primary"
            sx={{width: "50px", height: "50px"}}
          ><EditIcon/>
            <Typography variant="icon">editar</Typography>
          </IconButton>}
      />
      {/* Wider symmetric padding on the list keeps centered text clear of
          the chevron without shifting its axis. */}
      <CardContent sx={{ px: fromDetails ? 2 : 5 }}>

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

        {/* owner can be null (deleted user / legacy row) — render nothing
            rather than a blank link */}
        {fromDetails && event.owner && <Typography variant="body2" color="text.secondary" gutterBottom>
          <Typography variant="span" color="initial" fontWeight="bold">Organizado por:</Typography>
          <Link color="info.main" onClick={() => navigate(`/user/${event.owner._id}`)}> {event.owner.username}</Link>
        </Typography>}

        <br />

        <Box display="flex" justifyContent="center" gap="5px">
          {statusChip}
          {joinedChip}
        </Box>

      </CardContent>
    </>
  );

  return (
    <Card
      raised={fromDetails ? false : true}
      sx={{
        minHeight: "230px",
        width: "100%",
        position: 'relative',
        mb: "20px",
        // Same name on the list card and its details card: browsers with the
        // View Transitions API morph one into the other on navigation.
        viewTransitionName: `event-card-${event._id}`,
      }}
    >

      {cornerTimeFrameChip}

      {fromDetails ? (
        cardBody
      ) : (
        <CardActionArea onClick={() => transitionNavigate(`/event/${event._id}`)}>
          {cardBody}
          {/* Disclosure affordance: the whole card navigates, the chevron
              says so. */}
          <ChevronRightIcon
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              color: "text.secondary",
            }}
          />
        </CardActionArea>
      )}

    </Card>
  );
}

export default EventCard;
