import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from "@mui/material/Alert";

import { useEffect, useState } from "react";
import service from "@service/config";

import validateField from "@utils/validateField";

function EventCreate() {
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });

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

  const [hasCarOrganization, setHasCarOrganization] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });

  const [hasTaskAssignments, setHasTaskAssignments] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });

  const [serverError, setServerError] = useState();
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // this useEffect CDU will verify when all fields were touched and have no errors and allow submit
    const allFormStates = [category, title, location, date, time, hasCarOrganization, hasTaskAssignments];

    const allStatesInteracted = allFormStates.every((e) => e.hasUserInteracted);
    const allStatesWithoutErrors = allFormStates.every((e) => !e.error);

    if (allStatesInteracted && allStatesWithoutErrors) {
      if (canSubmit === false) setCanSubmit(true);
    } else {
      if (canSubmit === true) setCanSubmit(false);
    }
  }, [category, title, location, date, time, hasCarOrganization, hasTaskAssignments]);

  const handleCategory = (e) => {
    //todo validate date format
    const updatedstate = validateField(e.target.value, category, true);
    setCategory(updatedstate);
  };

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
    setIsSending(true)

    const dateWithTime = new Date(`${date.value}T${time.value}:00`)

    try {
      const response = await service.post("/event", {
        title: title.value,
        location: location.value,
        date: dateWithTime,
        category: category.value,
        hasCarOrganization: hasCarOrganization.value,
        hasTaskAssignments: hasTaskAssignments.value
      });
      navigate(`/event/${response.data.createdEventId}`);
    } catch (error) {
      //todo handle server validations
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
            Esto significa que los usuarios no podrán ver ni crear grupos de coche para ir al evento, usar solo para eventos locales donde cada participante va por su cuenta.
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
            Esto significa que el admin no podrá asignar tareas individuales a los participantes, usar solo cuando el evento no lo necesite.
          </Alert>
        )}
      </Box>

      <LoadingButton
        loading={isSending}
        variant="contained"
        type="submit"
        disabled={!canSubmit}
        sx={{ my: 1 }}
      >
        Crear Evento
      </LoadingButton>

      {serverError && <Alert severity="error">{serverError}</Alert>}
    </Box>
  );
}

export default EventCreate;
