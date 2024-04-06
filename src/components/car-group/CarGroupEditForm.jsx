import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import service from "@service/config";

import mapExample from "@assets/images/map-example.png"

// MUI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import CardMedia from "@mui/material/CardMedia";

function CarGroupEditForm({carGroup}) {

  const navigate = useNavigate()

  const [ roomAvailable, setRoomAvailable ] = useState({value: carGroup.roomAvailable, error: null, hasUserInteracted: true})
  const [ pickupLocation, setPickupLocation ] = useState({value: carGroup.pickupLocation, error: null, hasUserInteracted: true})
  const [ pickupTime, setPickupTime ] = useState({value: carGroup.pickupTime, error: null, hasUserInteracted: true})
  // const [ pickupCoordinates, setPickupCoordinates ] = useState({value: carGroup.pickupCoordinates, error: null, hasUserInteracted: true})
  //! pending leaflet implementation
  //* NOTE. no need for hasUserInteracted on edit, however, validate fields function adds it
  
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
    setRoomAvailable({...roomAvailable, value: e.target.value})
  }

  const handlePickupLocation = (e) => {
    //todo validate length
    setPickupLocation({...pickupLocation, value: e.target.value})
  }

  const handlePickupTime = (e) => {
    //todo validate time format
    setPickupTime({...pickupTime, value: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await service.put(`/car-group/${carGroup._id}`, {
        roomAvailable: roomAvailable.value,
        pickupLocation: pickupLocation.value,
        pickupTime: pickupTime.value,
        // pickupCoordinates: pickupCoordinates.value,
      })
      navigate(`/car-group/${carGroup._id}`)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>

    <Box component="form" noValidate autoComplete="on" display="flex" flexDirection="column">

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

      <Typography variant="h5" gutterBottom>
        Selecciona punto de encuentro
      </Typography>
      <CardMedia
          component="img"
          image={mapExample}
          alt="mapa-selección"
        />

      <Button 
        variant="contained" 
        type="submit"
        disabled={!canSubmit}
        onClick={handleSubmit}
        sx={{my: 2}}
      >Actualizar</Button>

      {serverError && <Alert severity="error">{serverError}</Alert>}

    </Box>

  </>
  )
}

export default CarGroupEditForm