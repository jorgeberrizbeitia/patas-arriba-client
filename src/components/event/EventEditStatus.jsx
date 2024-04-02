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
    console.log(updatedstate)
    setStatus(updatedstate);
  };

  const handleSubmit = async () => {

    try {
      
      await service.patch(`event/${event._id}/status`, {status: status.value})
      navigate(`/event/${event._id}`)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Box sx={{ marginTop: '8px', marginBottom: '8px' }}>
      <TextField
        select
        label="status"
        fullWidth
        variant="outlined"
        value={status.value}
        onChange={handleStatus}
        required
        InputLabelProps={{ shrink: true }}
      >
        <MenuItem value={"open"}>Activo</MenuItem>
        <MenuItem value={"closed"}>Cerrado</MenuItem>
        <MenuItem value={"cancelled"}>Cancelado</MenuItem>
      </TextField>

      {status.value === "closed" && <Alert severity="warning">Si el evento es cerrado, nadie nuevo se podrá apuntar. Los participantes actuales podrán seguir buscando y gestionando grupos de coche</Alert>}
  {   status.value === "cancelled" && <Alert severity="warning">Si el evento es cancelado, nadie se podrá apuntar ni gestionar grupos de coche</Alert>}

      <Button onClick={handleSubmit} variant="contained" color="primary">
        Cambiar Estado
      </Button>

    </Box>

  
  )
}

export default EventEditStatus