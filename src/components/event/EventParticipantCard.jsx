import { useEffect, useState, useContext } from "react"
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import {  useNavigate, useParams } from "react-router-dom";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import Typography from '@mui/material/Typography';
import Loading from "@components/ui/Loading";
import service from "@service/config"
import { AuthContext } from "@context/auth.context"

function EventParticipantCard({getEventDetails}) {

  const navigate = useNavigate()

  const { loggedUserId } = useContext(AuthContext)
  const { eventId } = useParams()
  
  const [isLoading, setIsLoading] = useState(true);
  const [carGroups, setCarGroups] = useState(null)
  
  useEffect(() => {
    getCarGroupsList()
  }, [])

  const getCarGroupsList = async () => {
    setIsLoading(true)

    try {
      const response = await service.get(`/car-group/list/${eventId}`)
      console.log(response.data)
      setCarGroups(response.data)
  
      setTimeout(() => setIsLoading(false), 700)
      
    } catch (error) {
      console.log(error)
      
    }
  }

  // const handleLeaveEvent = async () => {

  //   try {
      
  //     await service.patch(`/event/${eventId}/leave`)
  //     getEventDetails()

  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  if (isLoading) {
    return <Loading />
  }

  const myCarGroup = carGroups.find((eachCarGroup) => {
    return eachCarGroup.members.includes(loggedUserId) || eachCarGroup.owner._id == loggedUserId
  })

  return (
    <Container>

      {/* //todo asigned car Card here */}
      {myCarGroup ? <Box>
        <Typography>Ya tienes un coche asignado!</Typography>
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
      </Box> : <Box>
        <Typography color="error">No tienes coche asignado para ir al evento</Typography>
        <Alert sx={{my:2}} severity="error">Si 48 horas antes del evento no tienes como ir, es posible que seas removido. Asegurate de buscar coche disponible!</Alert>
        <Box display="flex" justifyContent="space-evenly" >
          <Button size="small" variant="contained" color="info" sx={{width: "40%"}} onClick={() => navigate(`/event/${eventId}/add-car-group`)}>
            Voy con mi coche y puedo llevar gente
          </Button>
          <Button size="small" variant="contained" color="info" sx={{width: "40%"}} onClick={() => navigate(`/event/${eventId}/search-car-group`)}>
            Buscar coche
          </Button>
        </Box>
      </Box>}

      <hr />

      


    </Container>
  )
}

export default EventParticipantCard