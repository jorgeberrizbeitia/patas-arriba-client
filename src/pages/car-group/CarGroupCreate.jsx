import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import service from "@service/config";

import GoBack from "@components/navigation/GoBack";

import mapExample from "@assets/images/map-example.png"

// MUI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import CardMedia from "@mui/material/CardMedia";

function CarGroupCreate() {

  const { eventId } = useParams()

  const navigate = useNavigate()

  const [ roomAvailable, setRoomAvailable ] = useState({value: "", error: null, hasUserInteracted: false})
  const [ pickupLocation, setPickupLocation ] = useState({value: "", error: null, hasUserInteracted: false})
  const [ pickupTime, setPickupTime ] = useState({value: "", error: null, hasUserInteracted: false})
  const [ pickupCoordinates, setPickupCoordinates ] = useState({value: "", error: null, hasUserInteracted: true}) // true as it is not required

  const [ canSubmit, setCanSubmit ] = useState(false)
  const [ serverError, setServerError] = useState();

  useEffect(() => {
    // this useEffect CDU will verify when all fields were touched and have no errors and allow submit
    const allFormStates = [roomAvailable, pickupLocation, pickupTime]

    const allStatesInteracted = allFormStates.every((e) => e.hasUserInteracted)
    const allStatesWithoutErrors = allFormStates.every((e) => !e.error)

    if (allStatesInteracted && allStatesWithoutErrors) {
      if (canSubmit === false) setCanSubmit(true)
    } else {
      if (canSubmit === true) setCanSubmit(false)
    }
  }, [roomAvailable, pickupLocation, pickupTime])

  const handleRoomAvailable = (e) => {
    //todo validate number
    setRoomAvailable({...roomAvailable, value: e.target.value, hasUserInteracted: true})
  }

  const handlePickupLocation = (e) => {
    //todo validate length
    setPickupLocation({...pickupLocation, value: e.target.value, hasUserInteracted: true})
  }

  const handlePickupTime = (e) => {
    //todo validate time format
    setPickupTime({...pickupTime, value: e.target.value, hasUserInteracted: true})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await service.post(`/car-group/${eventId}`, {
        roomAvailable: roomAvailable.value,
        pickupLocation: pickupLocation.value,
        pickupTime: pickupTime.value,
        pickupCoordinates: pickupCoordinates.value,
      })
      navigate(`/event/${eventId}`)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* //todo check if we be changed to Container */}

    <GoBack to={`/event/${eventId}`}/>      

    <Box component="form" noValidate autoComplete="on" display="flex" flexDirection="column" sx={{maxWidth:"320px"}}>

      <Typography variant="h6" gutterBottom>
        Crea un grupo de coche
      </Typography>

      <TextField
        label="Plazas disponibles"
        variant="outlined"
        value={roomAvailable.value}
        onChange={handleRoomAvailable}
        margin="normal"
        type="number"
        required
        error={roomAvailable.hasUserInteracted && roomAvailable.error !== null}
        helperText={roomAvailable.error}
      />

      <TextField
        label="Dirección de recogida"
        variant="outlined"
        value={pickupLocation.value}
        onChange={handlePickupLocation}
        margin="normal"
        required
        error={pickupLocation.hasUserInteracted && pickupLocation.error !== null}
        // helperText={pickupLocation.error}
      />

      <TextField
        label="Hora de recogida"
        variant="outlined"
        value={pickupTime.value}
        onChange={handlePickupTime}
        margin="normal"
        type="time"
        required
        error={pickupTime.hasUserInteracted && pickupTime.error !== null}
        // helperText={pickupTime.error}
        helperText="La fecha será la del evento"
        InputLabelProps={{ shrink: true }}
      />

      <Typography variant="body1" gutterBottom>
        Selecciona punto de encuentro
      </Typography>
      <CardMedia
          component="img"
          image={mapExample}
          alt="mapa-selección"
        />

      <Alert severity="info">Todos los campos se pueden modificar luego</Alert>

      <Button 
        variant="contained" 
        type="submit"
        disabled={!canSubmit}
        onClick={handleSubmit}
      >Crear Grupo de coche y unirse al evento</Button>

      {serverError && <Alert severity="error">{serverError}</Alert>}

    </Box>

  </Box>
  )
}

export default CarGroupCreate