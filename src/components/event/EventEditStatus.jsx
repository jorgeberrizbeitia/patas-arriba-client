import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import validateField from "@utils/validateField";
import Button from '@mui/material/Button'
import service from "@service/config";
import { useNavigate } from "react-router-dom";

function EventEditStatus({event}) {

  const navigate = useNavigate()

  const [ status, setStatus ] = useState({value: event.status, error: null, hasUserInteracted: true})

  const handleStatus = (e) => {
    const updatedstate = validateField(e.target.value, status, true)
    setStatus(updatedstate);
  };

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {
      
      await service.patch(`event/${event._id}/status`, {status: status.value})
      navigate(`/event/${event._id}`)

    } catch (error) {
      navigate("/server-error")
    }

  }

  return (
    <Box       
      component="form"
      noValidate
      autoComplete="on"
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%" // because css is weird
      onSubmit={handleSubmit}
    >
      <TextField
        select
        label="status"
        fullWidth
        variant="outlined"
        value={status.value}
        onChange={handleStatus}
        required
        sx={{mb: "8px"}}
        InputLabelProps={{ shrink: true }}
      >
        <MenuItem value={"open"}>Abierto</MenuItem>
        <MenuItem value={"closed"}>Cerrado</MenuItem>
        <MenuItem value={"cancelled"}>Cancelado</MenuItem>
      </TextField>

      {status.value === "closed" && <Alert severity="warning">Si el evento es cerrado, nadie nuevo se podrá apuntar. Los participantes actuales podrán seguir enviando mensajes y gestionando grupos de coche</Alert>}
      {status.value === "cancelled" && <Alert severity="warning">Si el evento es cancelado, todos los participantes serán removidos del evento, adicionalmente nadie se podrá apuntar, gestionar coches o ver/crear mensajes en el evento</Alert>}

      <Button type="submit" variant="contained" color="primary" sx={{mt: "8px"}}>
        Cambiar Estado
      </Button>

    </Box>

  
  )
}

export default EventEditStatus