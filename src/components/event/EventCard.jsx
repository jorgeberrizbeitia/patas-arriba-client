import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import Link from '@mui/material/Link';

import EditIcon from '@mui/icons-material/Edit';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import capitalizeAll from '@utils/capitalizeAll';


function EventCard({event, fromDetails, totalRoomAvailableInCarGroups}) {

  const navigate = useNavigate()
  const {loggedUserId, isOrganizerOrAdmin} = useContext(AuthContext)

  const eventDateStartOfDay = new Date(event.date)
  eventDateStartOfDay.setHours(0, 0, 0, 0);
  const todayStartOfDay = new Date()
  todayStartOfDay.setHours(0, 0, 0, 0);

  const hasUserJoined =
    event.attendees.includes(loggedUserId) ||
    event.attendees.some((attendee) => attendee?.user?._id === loggedUserId);

  const isUpcoming = eventDateStartOfDay > todayStartOfDay;
  const isToday = eventDateStartOfDay.toDateString() === todayStartOfDay.toDateString();
  const isPast = !isUpcoming && !isToday;

  const chipSx = { size: 'small', variant: 'outlined', sx: { fontSize: '0.7rem', fontWeight: 600, height: 30, borderRadius: '999px', border: '1.5px solid', '& .MuiChip-label': { px: 1.5 } } };

  const cardBody = (
    <CardContent sx={{ p: 2, pb: '16px !important' }}>

      {/* Chips + organizer */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {isUpcoming  && <Chip label="Próximo"   {...chipSx} color="primary" />}
          {isToday     && <Chip label="Hoy"        {...chipSx} color="info" />}
          {isPast      && <Chip label="Pasado"     {...chipSx} />}
          {event.status === 'open'      && !isPast && <Chip label="Abierto"   {...chipSx} color="primary" />}
          {event.status === 'closed'               && <Chip label="Cerrado"   {...chipSx} color="warning" />}
          {event.status === 'cancelled'            && <Chip label="Cancelado" {...chipSx} color="error" />}
          {hasUserJoined                           && <Chip label="Apuntado"  {...chipSx} color="success" />}
        </Box>
        {event.owner?.username && (
          <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
            por{' '}
            <Link
              color="info.main"
              onClick={(e) => { e.stopPropagation(); navigate(`/user/${event.owner._id}`); }}
              sx={{ cursor: 'pointer', fontSize: 'inherit' }}
            >
              {event.owner.username}
            </Link>
          </Typography>
        )}
      </Box>

      {/* Title + edit */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 1.25 }}>
        <Typography fontWeight={700} sx={{ fontSize: '1.1rem', lineHeight: 1.3 }}>
          {event.title}
        </Typography>
        {fromDetails && isOrganizerOrAdmin && (
          <IconButton
            onClick={(e) => { e.stopPropagation(); navigate(`/event/${event._id}/edit`); }}
            size="small"
            sx={{ color: 'text.secondary', flexShrink: 0, mt: -0.25 }}
          >
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>

      {/* Location */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.6 }}>
        <PlaceIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
        <Typography variant="body2" color="text.secondary">{event.location}</Typography>
      </Box>

      {/* Date + Time on same line */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.6 }}>
        <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
        <Typography variant="body2" color="text.secondary">
          {new Date(event.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}
          {' · '}
          {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Box>

      {/* Participants */}
      {event.status !== 'cancelled' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.6 }}>
          <PeopleIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
          <Typography variant="body2" color="text.secondary">{event.attendees.length} participantes</Typography>
        </Box>
      )}

      {/* Car spots */}
      {totalRoomAvailableInCarGroups !== undefined && event.status !== 'cancelled' && event.hasCarOrganization && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.6 }}>
          <DirectionsCarIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
          <Typography variant="body2" color="text.secondary">{totalRoomAvailableInCarGroups} plazas en coche disponibles</Typography>
        </Box>
      )}

    {/* Details link */}
      {!fromDetails && (
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ mt: 1.5, textAlign: 'center', color: 'primary.darker', cursor: 'pointer' }}
        >
          Ver más detalles
        </Typography>
      )}

    </CardContent>
  );

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        mb: 2,
        borderRadius: 4,
        border: '1.5px solid',
        borderColor: 'divider',
      }}
    >
      {fromDetails ? cardBody : (
        <CardActionArea onClick={() => navigate(`/event/${event._id}`)}>
          {cardBody}
        </CardActionArea>
      )}
    </Card>
  );
}

export default EventCard;
