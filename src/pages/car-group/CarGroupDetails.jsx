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

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import mapExample from "@assets/images/map-example.png"
import Loading from "@components/ui/Loading";

import { useParams } from 'react-router-dom';

import service from "@service/config"
import UserCard from '@components/user/UserCard';
import { AuthContext } from '@context/auth.context';
import EventMessageBoard from '@components/messages/EventMessageBoard';
import CarGroupActions from '@components/car-group/CarGroupActions';



function CarGroupDetails() {

  const { loggedUserId } = useContext(AuthContext)

  const { carGroupId } = useParams()

  const [ carGroup, setCarGroup ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ showMap, setShowMap ] = useState(false)
  const [ showActions, setShowActions ] = useState(false)
  const [ showMembers, setShowMembers ] = useState(false)

  useEffect(() => {

    getCarGroupDetails()

  }, [])

  const getCarGroupDetails = async () => {

    try {
      
      const response = await service.get(`/car-group/${carGroupId}`)
      console.log(response.data)

      setCarGroup(response.data)
      // setTimeout(() => {
        setIsLoading(false)
      // }, 700)

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }

  const {pickupLocation, pickupCoordinates, roomAvailable, pickupTime, owner, members, event} = carGroup


  return (
    <>

      <GoBack to={`/event/${event}`}/> 
      
      <Typography variant="h4" color="initial" gutterBottom>Detalles del grupo de coche</Typography>

      {/* //todo organize below cards into components */}

      <Card raised sx={{ minHeight: "230px", width: "100%", position: 'relative', mb: "20px" }}>

        <CardHeader
          sx={{ '& .MuiCardHeader-avatar': { marginRight: 0 }  }}
          avatar={<IconButton sx={{ height: "24px", width: "24px" }} disabled>
            <DirectionsCarIcon />
          </IconButton>}
          title={<Typography variant="h4" sx={{px: "8%"}}>{owner._id == loggedUserId ? "Tu coche" : `Coche de ${owner.username}`}</Typography>}
          action={<IconButton sx={{ mr: 0.5 ,height: "24px", width: "24px" }} disabled>
            <DirectionsCarIcon />
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
            <Typography variant="span" color="initial" fontWeight="bold">Plazas disponibles:</Typography>
            <Typography variant="span" color="initial"> {roomAvailable - members.length}</Typography>
          </Typography>

        </CardContent>
      </Card>

      <hr />

      <Card sx={{width: "100%"}}>
        <CardHeader
          subheader={`Mapa de recogida`}
          action={
            <IconButton onClick={() => setShowMap(!showMap)}>
              {showMap ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showMap}>
          <CardMedia
            component="img"
            image={mapExample}
            alt="mapa-coche"
          />
        </Collapse>
      </Card>

      <hr />

      <Card sx={{width: "100%"}}>
        <CardHeader
          subheader={`Miembros`}
          action={
            <IconButton onClick={() => setShowMembers(!showMembers)}>
              {showMembers ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showMembers}>
        
          <UserCard user={owner}/>
          {members.map((eachMember) => <UserCard key={eachMember._id} user={eachMember}/>)}

        </Collapse>
      </Card>

      <hr />

      <Card sx={{width: "100%"}}>
        <CardHeader
          subheader={`Acciones`}
          action={
            <IconButton onClick={() => setShowActions(!showActions)}>
              {showActions ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showActions}>
          <CarGroupActions carGroup={carGroup}/>
        </Collapse>
      </Card>

      <EventMessageBoard type="car-group" eventOrCarGroup={carGroup}/>

    </>
  )
}

export default CarGroupDetails 