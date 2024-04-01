import { useEffect, useState, useContext } from "react"
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate, useParams } from "react-router-dom";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import Typography from '@mui/material/Typography';

import Loading from "@components/ui/Loading";

import service from "@service/config"
import { AuthContext } from "@context/auth.context"

import capitalizeAll from "@utils/capitalizeAll"

function EventParticipantCard({getEventDetails}) {

  const navigate = useNavigate()

  const { loggedUserId } = useContext(AuthContext)
  const { eventId } = useParams()
  
  const [showAreYouSureButtons, setShowAreYouSureButtons] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [carGroups, setCarGroups] = useState(null)
  
  useEffect(() => {
    getCarGroupsList()
  }, [])

  const getCarGroupsList = async () => {

    const response = await service.get(`/car-group/list/${eventId}`)
    console.log(response.data)
    setCarGroups(response.data)

    setTimeout(() => setIsLoading(false), 700)
  }

  const handleLeaveEvent = async () => {

    try {
      
      await service.patch(`/event/${eventId}/leave`)
      getEventDetails()

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }

  const myCarGroup = carGroups.find((eachCarGroup) => {
    return eachCarGroup.members.includes(loggedUserId) || eachCarGroup.owner == loggedUserId
  })

  return (
    <Container>

      <Typography variant="h5">Estas apuntado a este evento!</Typography>

      <hr />

      {myCarGroup ? <Box>
        <Typography>Ya tienes un coche asignado!</Typography>
          <Card>
          <CardHeader
            avatar={<DirectionsCarIcon />}
            title={`Coche de ${capitalizeAll(myCarGroup.owner.firstName)}`}
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
      </Box> : <Box>
        <Typography>No tienes coche asignado para ir al evento</Typography>
        <Button>Busca un coche disponible</Button>
      </Box>}

      <hr />

      <Button color="error"onClick={() => setShowAreYouSureButtons(!showAreYouSureButtons)}>Salir del evento</Button>
      {showAreYouSureButtons && (
        <Card raised sx={{}}>
          <Alert severity="warning">Estas seguro que deseas salir? Si tienes un grupo de coche creado, esto eliminará el grupo.</Alert>
          <Button color="error" onClick={handleLeaveEvent}>Si</Button>
          <Button color="primary"onClick={() => setShowAreYouSureButtons(false)}>No</Button>
        </Card>
      )}

    </Container>
  )
}

export default EventParticipantCard