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
      <>
        <hr />

        <Typography sx={{width: "100%", pb: 1}} color="success.main">
          ¡Ya tienes un coche asignado!
        </Typography>

        <Card sx={{bgcolor: "gray.transparent", width: "100%"}}>
        <CardHeader
          avatar={<DirectionsCarIcon color="success"/>}
          title={myCarGroup.owner._id == loggedUserId ? "Tu coche" : `Coche de ${myCarGroup.owner.username}`}
          action={
            <IconButton 
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} 
              onClick={() => navigate(`/car-group/${myCarGroup._id}`)}
            >
              <ReadMoreIcon />
              <Typography variant="icon">Ver info</Typography>
            </IconButton>
            }
          />
        </Card>
      </>
    )
  } else {
    return (
      <>

        <hr />
        <Typography color="error" sx={{width: "100%"}}>
          No tienes coche asignado para ir al evento
        </Typography>

        <Alert sx={{my:2, width: "100%"}} severity="error" >
          Si 48 horas antes del evento no has seleccionado la forma de ir al evento, es posible que seas removido. ¡Asegurate de buscar coche disponible o indicar que vas en tu coche!
        </Alert>

        <Box display="flex" justifyContent="space-evenly" width="100%">

          <Button size="medium" variant="contained" color="info" sx={{width: "40%"}} onClick={() => navigate(`/event/${eventId}/add-car-group`)}>
            Voy con mi coche
          </Button>

          <Button size="medium" variant="contained" color="info" sx={{width: "40%"}} onClick={() => navigate(`/event/${eventId}/search-car-group`)}>
            Buscar coche
          </Button>
          
        </Box>
      </>
    )
  }
}

export default EventCarGroupInfoCard