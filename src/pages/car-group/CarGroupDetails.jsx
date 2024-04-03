import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import profilePicExample from "@assets/images/profile-pic-example.jpg"
import { useContext, useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import mapExample from "@assets/images/map-example.png"
import Loading from "@components/ui/Loading";

import capitalizeAll from "@utils/capitalizeAll"
import { useNavigate, useParams } from 'react-router-dom';

import service from "@service/config"
import ProfileCard from '@components/profile/ProfileCard';
import { AuthContext } from '@context/auth.context';
import EventMessageBoard from '@components/messages/EventMessageBoard';

function CarGroupDetails() {

  const navigate = useNavigate()
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
      setTimeout(() => setIsLoading(false), 700)

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }

  const {pickupLocation, pickupCoordinates, roomAvailable, pickupTime, owner, members, event} = carGroup


  return (
    <Container>

      <Box sx={{display:"flex", justifyContent: "space-between"}}>
        <IconButton onClick={() => navigate(`/event/${event}`)}><ArrowBackIcon/></IconButton>
      </Box>

      <Card>
        <CardHeader
          avatar={
            <DirectionsCarIcon />
            // <Tooltip title={owner.username}>
            //   <Avatar sx={{ bgcolor: "primary" }}>
            //     {owner.username}
            //   </Avatar>
            // </Tooltip>
          }
          
          title={owner._id == loggedUserId ? "Tu coche" : `Coche de ${owner.username}`}
        />
        <CardContent>
          <Box>
            <Typography variant="body2">
              Lugar de recogida:
            </Typography>
            <Typography variant="body2">
              {pickupLocation}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2">
              Hora de recogida:
            </Typography>
            <Typography variant="body2">
              {pickupTime}
            </Typography>
          </Box>

        </CardContent>
      </Card>

      <Card>
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
            alt="mapa-ubicación"
          />
        </Collapse>
      </Card>

      <Card>
        <CardHeader
          subheader={`Miembros`}
          action={
            <IconButton onClick={() => setShowMembers(!showMembers)}>
              {showMembers ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showMembers}>
        
          <ProfileCard profile={owner}/>
          {members.map((eachMember) => <ProfileCard key={eachMember._id} profile={eachMember}/>)}

        </Collapse>
      </Card>

      <Card>
        <CardHeader
          subheader={`Acciones`}
          action={
            <IconButton onClick={() => setShowActions(!showActions)}>
              {showActions ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        />
        <Collapse in={showActions}>
        <CardActions sx={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
            <IconButton color="warning">
              <ChangeCircleIcon />
              <Typography variant="caption">Cambiar de coche</Typography>
            </IconButton> 
            <IconButton color="error" className='remove-margin'>
              <ExitToAppIcon sx={{margin: 0}}/>
              <Typography variant="caption">Salir del coche</Typography>
            </IconButton> 
          </CardActions>
        </Collapse>
      </Card>

      <EventMessageBoard type="car-group" eventOrCarGroup={carGroup}/>

    </Container>
  )
}

export default CarGroupDetails 