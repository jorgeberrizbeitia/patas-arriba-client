import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@context/auth.context";


function EventCarGroupInfoCard({myCarGroup}) {

  const { loggedUserId } = useContext(AuthContext)
  const navigate = useNavigate()
  const { eventId } = useParams()

  if (myCarGroup) {
    return (
      <Box>
        <hr />

        <Typography>
          Ya tienes un coche asignado!
        </Typography>

        <Card>
        <CardHeader
          avatar={<DirectionsCarIcon />}
          title={myCarGroup.owner._id == loggedUserId ? "Tu coche" : `Coche de ${myCarGroup.owner.username}`}
          action={
            <IconButton 
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} 
              onClick={() => navigate(`/car-group/${myCarGroup._id}`)}
            >
              <ReadMoreIcon />
              <Typography variant="caption">Ver info</Typography>
            </IconButton>
            }
          />
        </Card>
      </Box>
    )
  } else {
    return (
      <Box>
        <hr />

        <Typography color="error">
          No tienes coche asignado para ir al evento
        </Typography>

        <Alert sx={{my:2}} severity="error">
          Si 48 horas antes del evento no tienes como ir, es posible que seas removido. Asegurate de buscar coche disponible!
        </Alert>

        <Box display="flex" justifyContent="space-evenly" >

          <Button size="small" variant="contained" color="info" sx={{width: "40%"}} onClick={() => navigate(`/event/${eventId}/add-car-group`)}>
            Voy con mi coche y puedo llevar gente
          </Button>

          <Button size="small" variant="contained" color="info" sx={{width: "40%"}} onClick={() => navigate(`/event/${eventId}/search-car-group`)}>
            Buscar coche
          </Button>
          
        </Box>
      </Box>
    )
  }
}

export default EventCarGroupInfoCard