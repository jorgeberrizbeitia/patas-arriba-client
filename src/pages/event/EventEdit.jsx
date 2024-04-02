import logo from "@assets/images/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom"

import countryPhoneCode from "@data/country-phone-code.json"

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';

import Loading from "@components/ui/Loading"

import { useEffect, useState } from "react";
import service from "@service/config";

import validateField from "@utils/validateField";
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EventEditForm from "@components/event/EventEditForm";
import EventEditStatus from "@components/event/EventEditStatus";



function EventEdit() {
  
  const navigate = useNavigate()
  const {eventId} = useParams()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ event, setEvent ] = useState(null)
  const [ editType, setEditType ] = useState(null)
  // editType 1: normal fields, 2: change status, 3: delete event

  useEffect(() => {
    getEventDetails()
  }, [])

  const getEventDetails = async () => {

    if (!isLoading) setIsLoading(true)

    try {
      
      const response = await service.get(`/event/${eventId}`)
      console.log(response.data)

      setEvent(response.data)
      setTimeout(() => setIsLoading(false), 700)

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>

      <Typography variant="h5" color="initial" gutterBottom>Como quieres editar el evento?</Typography>

      <Box  display="flex" flexDirection="row" justifyContent="space-evenly">

        <Button onClick={() => setEditType(1)} variant={editType === 1 ? "contained" : "outlined"} color="info" sx={{width: 80, height: 80}}>
          Editar info
        </Button>

        <Button onClick={() => setEditType(2)} variant={editType === 2 ? "contained" : "outlined"} color="primary" sx={{width: 80, height: 80}}>
          Cambiar Estado
        </Button>

        <Button onClick={() => setEditType(3)} variant={editType === 3 ? "contained" : "outlined"} color="error" sx={{width: 80, height: 80}}>
          Borrar
        </Button>
      </Box>

      <hr />

      <Box display="flex" flexDirection="column" alignItems="center">
        {editType === 1 && <EventEditForm event={event}/>}
        {editType === 2 && <EventEditStatus event={event}/>}
        {editType === 3 && <EventEditForm event={event}/>}
      </Box>




    </>
  );
}

export default EventEdit;