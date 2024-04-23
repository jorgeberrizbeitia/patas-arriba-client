import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import GoBack from "@components/navigation/GoBack";

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { useContext, useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import mapExample from "@assets/images/map-example.png"
import Loading from "@components/ui/Loading";

import { useNavigate, useParams } from 'react-router-dom';

import service from "@service/config"
import UserCard from '@components/user/UserCard';
import { AuthContext } from '@context/auth.context';
import EventMessageBoard from '@components/messages/EventMessageBoard';
import CarGroupActions from '@components/car-group/CarGroupActions';
import CarGroupLeaveButton from '@components/car-group/CarGroupLeaveButton';




function CarGroupDetails() {

  const { loggedUserId } = useContext(AuthContext)
  const navigate = useNavigate()

  const { carGroupId } = useParams()

  const [ carGroup, setCarGroup ] = useState(null)
  const [ carGroupMessages, setCarGroupMessages ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ showMap, setShowMap ] = useState(false)
  const [ showActions, setShowActions ] = useState(false)
  const [ showPassengers, setShowPassengers ] = useState(false)

  useEffect(() => {
    getCarGroupDetails()
  }, [])

  const getCarGroupDetails = async () => {

    try {
      
      const response = await service.get(`/car-group/${carGroupId}`)

      setCarGroup(response.data.carGroupDetails)
      setCarGroupMessages(response.data.messages)
      setIsLoading(false)

    } catch (error) {
      navigate("/server-error")
    }

  }

  if (isLoading) {
    return <Loading />
  }

  const {pickupLocation, roomAvailable, pickupTime, carBrand, carColor, owner, passengers, event} = carGroup

  const isOwner = owner._id == loggedUserId

  return (
    <>

      <GoBack to={`/event/${event._id}`} caption="evento"/> 
      
      <Typography variant="h4" color="initial" gutterBottom>Detalles del grupo de coche</Typography>

      {/* //todo organize below details into components */}

      <Card raised sx={{ minHeight: "230px", width: "100%", position: 'relative', mb: "20px" }}>

        <CardHeader
          sx={{ '& .MuiCardHeader-avatar': { marginRight: 0 }  }}
          avatar={<IconButton sx={{ height: "24px", width: "24px" }}>
            <DirectionsCarIcon />
          </IconButton>}
          title={<Typography variant="h4" sx={{pr: isOwner ? 0 : 3}}>{isOwner ? "Tu coche" : `Coche de ${owner.username}`}</Typography>}
          action={isOwner && 
          <IconButton 
            onClick={() => navigate(`/car-group/${carGroup._id}/edit`)}
            color="primary"
            sx={{width: "50px", height: "50px"}}
          ><EditIcon/>
            <Typography variant="icon">editar</Typography>
          </IconButton>}
        />
        <CardContent>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Typography variant="span" color="initial" fontWeight="bold">Lugar de recogida:</Typography>
            <Typography variant="span" color="initial"> {pickupLocation}</Typography>
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Typography variant="span" color="initial" fontWeight="bold">Hora de recogida:</Typography>
            <Typography variant="span" color="initial"> {pickupTime}</Typography>
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Typography variant="span" color="initial" fontWeight="bold">Marca de coche:</Typography>
            <Typography variant="span" color="initial"> {carBrand}</Typography>
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Typography variant="span" color="initial" fontWeight="bold">Color de coche</Typography>
            <Typography variant="span" color="initial"> {carColor}</Typography>
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Typography variant="span" color="initial" fontWeight="bold">Plazas aún disponibles:</Typography>
            <Typography variant="span" color="initial"> {roomAvailable - passengers.length}</Typography>
          </Typography>

        </CardContent>
      </Card>

      <hr />

      <Card sx={{width: "100%"}}>
        <CardHeader
          sx={{pl:7}}
          subheader={`Conductor y pasajeros: ${passengers.length+1}`}
          action={
            <IconButton onClick={() => setShowPassengers(!showPassengers)}>
              {showPassengers ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showPassengers}>

          <UserCard user={owner}/>
          {passengers.map((eachPassenger) => <UserCard key={eachPassenger._id} user={eachPassenger}/>)}

        </Collapse>
      </Card>

      <EventMessageBoard type="car-group" eventOrCarGroup={carGroup} messages={[]}/>

      {!isOwner && <CarGroupLeaveButton carGroup={carGroup}/>}

    </>
  )
}

export default CarGroupDetails 