import { useState, useEffect } from "react"

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import CardMedia from "@mui/material/CardMedia";

import mapExample from "@assets/images/map-example.png"

import { Link } from "react-router-dom";

function CarGroupAddForm({joinEvent}) {

  const [ roomAvailable, setRoomAvailable ] = useState({value: "", error: null, hasUserInteracted: false})
  const [ pickupLocation, setPickupLocation ] = useState({value: "", error: null, hasUserInteracted: true})
  const [ pickupTime, setPickupTime ] = useState({value: "", error: null, hasUserInteracted: true})
  const [ pickupCoordinates, setPickupCoordinates ] = useState({value: "", error: null, hasUserInteracted: true})

  const [ canSubmit, setCanSubmit ] = useState(false)
  const [ serverError, setServerError] = useState();

  const handleRoomAvailable = (e) => {
    //todo validate number
    setRoomAvailable({...roomAvailable, value: e.target.value, hasUserInteracted: true})
  }

  const handlePickupLocation = (e) => {
    //todo validate length
    setPickupLocation({...pickupLocation, value: e.target.value})
  }

  const handlePickupTime = (e) => {
    //todo validate time format
    setPickupTime({...pickupTime, value: e.target.value})
  }

  useEffect(() => {
    const allFormStates = [roomAvailable]

    const allStatesInteracted = allFormStates.every((e) => e.hasUserInteracted)
    const allStatesWithoutErrors = allFormStates.every((e) => !e.error)

    if (allStatesInteracted && allStatesWithoutErrors) {
      if (canSubmit === false) setCanSubmit(true)
    } else {
      if (canSubmit === true) setCanSubmit(false)
    }
  }, [roomAvailable])

  const handleSubmit = (e) => {
    e.preventDefault()

    joinEvent({
      // pickupCoordinates: pickupCoordinates.value,
      roomAvailable: roomAvailable.value,
      pickupLocation: pickupLocation.value,
      pickupTime: pickupTime.value
    })
  }

  return (
    <Box  display="flex" flexDirection="column" alignItems="center">

    <Box component="form" noValidate autoComplete="on" display="flex" flexDirection="column" onSubmit={handleSubmit} sx={{maxWidth:"320px"}}>

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
      >Crear Grupo de coche y unirse al evento</Button>

      {serverError && <Alert severity="error">{serverError}</Alert>}

    </Box>

  </Box>
  )
}

export default CarGroupAddForm