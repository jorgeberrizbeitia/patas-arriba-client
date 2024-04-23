import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "@service/config";

import validateField from "@utils/validateField";

// MUI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

function EventEditForm({ event }) {
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    value: event.category,
    error: null,
    hasUserInteracted: true,
  });

  const [title, setTitle] = useState({
    value: event.title,
    error: null,
    hasUserInteracted: true,
  });

  const [location, setLocation] = useState({
    value: event.location,
    error: null,
    hasUserInteracted: true,
  });

  // Extract date
  const dateInputValue = new Date(event.date).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }) // Get YYYY-MM-DD format
  const [date, setDate] = useState({
    value: dateInputValue,
    error: null,
    hasUserInteracted: true,
  });

  // Extract time
  const localTimeInputValue = new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get HH:MM format
  const [time, setTime] = useState({
    value: localTimeInputValue,
    error: null,
    hasUserInteracted: true,
  });

  const [hasCarOrganization, setHasCarOrganization] = useState({
    value: event.hasCarOrganization,
    error: null,
    hasUserInteracted: true,
  });

  const [hasTaskAssignments, setHasTaskAssignments] = useState({
    value: event.hasTaskAssignments,
    error: null,
    hasUserInteracted: true,
  });

  //* NOTE. no need for hasUserInteracted on edit, however, validate fields function adds it
  //todo modify validateField to remove hasUserInteracted, perhaps do it individually on each field. Check all 6 forms.

  const [serverError, setServerError] = useState();
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    // this useEffect CDU will verify when all fields have no errors and allow submit
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
    const updatedstate = validateField(e.target.value, date, true);
    setDate(updatedstate);
  };

  const handleTime = (e) => {
    const updatedstate = validateField(e.target.value, time, true);
    setTime(updatedstate);
  };

  const handleCategory = (e) => {
    const updatedstate = validateField(e.target.value, category, true);
    setCategory(updatedstate);
  };

  const handleHasCarOrganization = (e) => {
    const updatedstate = validateField(e.target.value, hasCarOrganization, true);
    setHasCarOrganization(updatedstate);
  };

  const handleHasTaskAssignments = (e) => {
    const updatedstate = validateField(e.target.value, hasTaskAssignments, true);
    setHasTaskAssignments(updatedstate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateWithTime = new Date(`${date.value}T${time.value}:00`)
    try {
      await service.put(`/event/${event._id}`, {
        title: title.value,
        location: location.value,
        date: dateWithTime,
        category: category.value,
        hasCarOrganization: hasCarOrganization.value,
        hasTaskAssignments: hasTaskAssignments.value
      });
      navigate(`/event/${event._id}`);
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

      <TextField
        select
        label="Categoria"
        variant="outlined"
        value={category.value}
        fullWidth
        onChange={handleCategory}
        margin="normal"
        required
        sx={{textAlign: "start"}}
        error={category.hasUserInteracted && category.error !== null} // can display and any error exists
        helperText={title.error}
      >
        <MenuItem value={"protectora"}>Protectora</MenuItem>
        <MenuItem value={"recogida"}>Recogida</MenuItem>
        <MenuItem value={"mercadillo"}>Mercadillo</MenuItem>
        <MenuItem value={"otro"}>Otro</MenuItem>
      </TextField>

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
        value={new Date(date.value).toISOString().split("T")[0]}
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

      {category.value === "no-car-group" && (
        <Alert sx={{ my: 1 }} severity="warning">
          Con esta categoria no se podrán ver ni crear grupos de coche para ir al evento
        </Alert>
      )}

      <Box sx={{ marginTop: "8px", marginBottom: "8px" }}>
        <TextField
          select
          sx={{textAlign: "start"}}
          label="Requiere grupos de coches?"
          variant="outlined"
          value={hasCarOrganization.value}
          onChange={handleHasCarOrganization}
          fullWidth
          required
        >
          <MenuItem value={true}>Si, permitir organizarse en coches</MenuItem>
          <MenuItem value={false}>No, el evento será local</MenuItem>
        </TextField>

        {hasCarOrganization.value === false && (
          <Alert sx={{ my: 1 }} severity="warning">
            Esto significa que los participantes del evento no podrán ver ni crear grupos de coche para ir al evento, usar solo para eventos locales donde cada participante va por su cuenta.
          </Alert>
        )}
      </Box>

      <Box sx={{ marginTop: "8px", marginBottom: "8px" }}>
        <TextField
          select
          sx={{textAlign: "start"}}
          label="Requiere asignar tareas a participantes?"
          variant="outlined"
          value={hasTaskAssignments.value}
          onChange={handleHasTaskAssignments}
          fullWidth
          required
        >
          <MenuItem value={true}>Si, permitir asignar tareas</MenuItem>
          <MenuItem value={false}>No, el evento no requiere asignar tareas individuales</MenuItem>
        </TextField>

        {hasTaskAssignments.value === false && (
          <Alert sx={{ my: 1 }} severity="warning">
            Esto significa no podrá asignar tareas individuales a los participantes, usar solo cuando el evento no lo necesite.
          </Alert>
        )}
      </Box>

      <Button
        variant="contained"
        type="submit"
        disabled={!canSubmit}
        sx={{ my: 1 }}
      >
        Editar Evento
      </Button>

      {serverError && <Alert severity="error">{serverError}</Alert>}
    </Box>
  );
}

export default EventEditForm;
