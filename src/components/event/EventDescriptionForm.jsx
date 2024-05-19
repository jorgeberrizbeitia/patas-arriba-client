import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "@service/config";

import validateField from "@utils/validateField";

// MUI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

function EventDescriptionForm({ event }) {

  const navigate = useNavigate();

  const [description, setDescription] = useState({
    value: event.description,
    error: null,
  });

  const [serverError, setServerError] = useState();

  const handleDescription = (e) => {
    setDescription({...description, value: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.patch(`/event/${event._id}/description`, {
        description: description.value,
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

      <Alert severity="info">Añade aqui información adicional sobre la organización del evento. Puedes agregar cualquier cantidad de texto y será visible a todos los participantes.</Alert>

      <TextField
        label="Info organización del evento"
        multiline
        maxRows={15}
        variant="outlined"
        fullWidth
        value={description.value}
        onChange={handleDescription}
        margin="normal"
        error={description.hasUserInteracted && description.error !== null} // can display and any error exists
        helperText={description.error}
      />

      <Button
        variant="contained"
        type="submit"
        sx={{ my: 1 }}
      >
        Editar información
      </Button>

      {serverError && <Alert severity="error">{serverError}</Alert>}
    </Box>
  );
}

export default EventDescriptionForm;