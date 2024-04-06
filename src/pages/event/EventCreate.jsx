import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { useEffect, useState } from "react";
import service from "@service/config";

import validateField from "@utils/validateField";

function EventCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });
  const [location, setLocation] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });
  // const [ coordinates, setCoordinates ] = useState({value: [], error: null, hasUserInteracted: false}) //! pending leaflet implementation
  const [date, setDate] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });
  const [time, setTime] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });
  const [category, setCategory] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });

  const [serverError, setServerError] = useState();
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    // this useEffect CDU will verify when all fields were touched and have no errors and allow submit
    const allFormStates = [title, location, date, time, category];

    const allStatesInteracted = allFormStates.every((e) => e.hasUserInteracted);
    const allStatesWithoutErrors = allFormStates.every((e) => !e.error);

    if (allStatesInteracted && allStatesWithoutErrors) {
      if (canSubmit === false) setCanSubmit(true);
    } else {
      if (canSubmit === true) setCanSubmit(false);
    }
  }, [title, location, date, time, category]);

  const handleTitle = (e) => {
    const regex = /^.{0,50}$/;
    const updatedstate = validateField(
      e.target.value,
      title,
      true,
      regex,
      "Título no puede contener más de 50 caracteres"
    );
    setTitle(updatedstate);
  };

  const handleLocation = (e) => {
    const regex = /^.{0,50}$/;
    const updatedstate = validateField(
      e.target.value,
      location,
      true,
      regex,
      "Lugar no puede contener más de 50 caracteres"
    );
    setLocation(updatedstate);
  };

  const handleDate = (e) => {
    //todo validate date format
    const updatedstate = validateField(e.target.value, location, true);
    setDate(updatedstate);
  };

  const handleTime = (e) => {
    //todo validate date format
    const updatedstate = validateField(e.target.value, location, true);
    setTime(updatedstate);
  };

  const handleCategory = (e) => {
    const updatedstate = validateField(e.target.value, location, true);
    setCategory(updatedstate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.post("/event", {
        title: title.value,
        location: location.value,
        date: date.value,
        time: time.value,
        category: category.value,
      });
      navigate("/");
    } catch (error) {
      navigate("/server-error");
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="on"
      display="flex"
      flexDirection="column"
      width="100%"
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" gutterBottom>
        Crear Evento
      </Typography>

      <TextField
        label="Título"
        variant="outlined"
        value={title.value}
        fullWidth
        onChange={handleTitle}
        margin="normal"
        required
        error={title.hasUserInteracted && title.error !== null} // can display and any error exists
        helperText={title.error}
      />

      <TextField
        label="Lugar"
        variant="outlined"
        value={location.value}
        onChange={handleLocation}
        fullWidth
        margin="normal"
        required
        error={location.hasUserInteracted && location.error !== null}
        helperText={location.error}
      />

      <TextField
        label="Fecha"
        variant="outlined"
        value={date.value}
        onChange={handleDate}
        fullWidth
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
        value={time.value}
        onChange={handleTime}
        fullWidth
        margin="normal"
        type="time"
        required
        error={time.hasUserInteracted && time.error !== null}
        // helperText={time.error}
        InputLabelProps={{ shrink: true }}
      />

      <Box sx={{ marginTop: "8px", marginBottom: "8px" }}>
        <TextField
          select
          label="categoria"
          variant="outlined"
          value={category.value}
          onChange={handleCategory}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value={"car-group"}>Con organización en coches</MenuItem>
          <MenuItem value={"no-car-group"}>Sin organización en coches</MenuItem>
        </TextField>

        {category.value === "no-car-group" && (
          <Alert sx={{ my: 1 }} severity="warning">
            Con esta categoria no se podrán ver ni crear grupos de coche para ir al evento
          </Alert>
        )}
      </Box>

      <Button
        variant="contained"
        type="submit"
        disabled={!canSubmit}
        sx={{ my: 1 }}
      >
        Crear Evento
      </Button>

      {serverError && <Alert severity="error">{serverError}</Alert>}
    </Box>
  );
}

export default EventCreate;
