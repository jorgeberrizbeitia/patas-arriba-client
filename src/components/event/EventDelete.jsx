import Box from '@mui/material/Box'
import React from 'react'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import service from '@service/config'
import { useNavigate } from 'react-router-dom'

function EventDelete({event}) {

  const navigate = useNavigate()

  const handleDelete = async () => {

    try {
      
      await service.delete(`/event/${event._id}`)
      navigate("/")

    } catch (error) {
      console.log(error)
    }

  }
  return (
    <Box>

      <Alert severity='error'>Al borrar el evento se eliminarán tambien todos los grupos de coche y mensajes creados</Alert>

      <Alert severity='warning'>Si el evento fue cancelado quizas es mejor cambiar su estado</Alert>

      <Typography variant="body1" color="error">Estas seguro que quieres borrar el Evento?</Typography>

      <Button onClick={handleDelete} variant="contained" color="error">
        Si, borralo!
      </Button>

    </Box>
  )
}

export default EventDelete