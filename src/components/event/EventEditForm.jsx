import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import service from "@service/config";

import validateField from "@utils/validateField";

// MUI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';

function EventEditForm({event}) {
  
  const navigate = useNavigate()

  const [ title, setTitle ] = useState({value: event.title, error: null, hasUserInteracted: true})
  const [ location, setLocation ] = useState({value: event.location, error: null, hasUserInteracted: true})
  // const [ coordinates, setCoordinates ] = useState({value: event.coordinates, error: null, hasUserInteracted: true}) 
  //! pending leaflet implementation
  const [ date, setDate ] = useState({value: event.date, error: null, hasUserInteracted: true})
  const [ time, setTime ] = useState({value: event.time, error: null, hasUserInteracted: true})
  const [ category, setCategory ] = useState({value: event.category, error: null, hasUserInteracted: true})
  //* NOTE. no need for hasUserInteracted on edit, however, validate fields function adds it

  //todo modify validateField to remove hasUserInteracted, perhaps do it individually on each field. Check all 6 forms.

  const [ serverError, setServerError] = useState();
  const [ canSubmit, setCanSubmit ] = useState(false)

  useEffect(() => {
    // this useEffect CDU will verify when all fields were touched and have no errors and allow submit
    const allFormStates = [title, location, date, time, category]

    const allStatesInteracted = allFormStates.every((e) => e.hasUserInteracted)
    const allStatesWithoutErrors = allFormStates.every((e) => !e.error)

    if (allStatesInteracted && allStatesWithoutErrors) {
      if (canSubmit === false) setCanSubmit(true)
    } else {
      if (canSubmit === true) setCanSubmit(false)
    }
  }, [title, location, date, time, category])

  const handleTitle = (e) => {
    const regex = /^.{0,50}$/;
    const updatedstate = validateField(e.target.value, title, true, regex, "Título no puede contener más de 50 caracteres")
    setTitle(updatedstate);
  };

  const handleLocation = (e) => {
    const regex = /^.{0,50}$/; 
    const updatedstate = validateField(e.target.value, location, true, regex, "Lugar no puede contener más de 50 caracteres")
    setLocation(updatedstate);
  };

  const handleDate = (e) => {
    //todo validate date format
    const updatedstate = validateField(e.target.value, location, true)
    setDate(updatedstate);
  };

  const handleTime = (e) => {
    //todo validate date format
    const updatedstate = validateField(e.target.value, location, true)
    console.log(updatedstate)
    setTime(updatedstate)
  };

  const handleCategory = (e) => {
    const updatedstate = validateField(e.target.value, location, true)
    setCategory(updatedstate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await service.put(`/event/${event._id}`, {
        title: title.value, 
        location: location.value, 
        date: date.value, 
        time: time.value, 
        category: category.value, 

      })
      navigate(`/event/${event._id}`)
    } catch (error) {
      navigate("/server-error")
    }

  }

  return (

      <Box component="form" fullWidth noValidate autoComplete="on" display="flex" flexDirection="column" alignItems="center" onSubmit={handleSubmit} sx={{maxWidth:"320px"}}>

        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          value={title.value}
          onChange={handleTitle}
          margin="normal"
          required
          error={title.hasUserInteracted && title.error !== null} // can display and any error exists
          helperText={title.error}
        />

        <TextField
          label="Lugar"
          variant="outlined"
          fullWidth
          value={location.value}
          onChange={handleLocation}
          margin="normal"
          required
          error={location.hasUserInteracted && location.error !== null}
          helperText={location.error}
        />

        <TextField
          label="Fecha"
          variant="outlined"
          fullWidth
          value={new Date(date.value).toISOString().split('T')[0]}
          //* input requires specific format YYYY-MM-DD
          onChange={handleDate}
          margin="normal"
          type="date"
          required
          error={date.hasUserInteracted && date.error !== null}
          // helperText={date.error}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Hora"
          variant="outlined"
          fullWidth
          value={time.value}
          onChange={handleTime}
          margin="normal"
          type="time"
          required
          error={time.hasUserInteracted && time.error !== null}
          // helperText={time.error}
          InputLabelProps={{ shrink: true }}
        />

        <Box sx={{ marginTop: '8px', marginBottom: '8px' }}>
          <TextField
            select
            label="categoria"
            variant="outlined"
            fullWidth
            value={category.value}
            onChange={handleCategory}
            required
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value={"car-group"}>Con organización en coches</MenuItem>
            <MenuItem value={"no-car-group"}>Sin organización en coches</MenuItem>
          </TextField>

        </Box>

        <Button 
          variant="contained" 
          type="submit"
          disabled={!canSubmit}
        >Editar Evento</Button>

        {serverError && <Alert severity="error">{serverError}</Alert>}

      </Box>

  );
}

export default EventEditForm;