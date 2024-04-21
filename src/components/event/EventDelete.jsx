import { useNavigate } from 'react-router-dom'
import service from '@service/config'

// MUI Componentes
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'


function EventDelete({event}) {

  const navigate = useNavigate()

  const handleDelete = async () => {

    try {
      
      await service.delete(`/event/${event._id}`)
      navigate(`/`)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>

      <Alert sx={{width: "100%", mb: 2}} severity='error'>Solo borrar si el evento fue creado por error. Al eliminar el evento se eliminará permanentemente toda la información del evento, incluyendo grupos de coche y mensajes</Alert>

      <Alert sx={{width: "100%", mb: 2}} severity='warning'>Si el evento fue cancelado, considerar cambiar el estado a cancelado</Alert>

      <Alert sx={{width: "100%", mb: 2}} severity='error'>
        <Typography variant="body2" color="error">
          Estas seguro que quieres eliminar el evento
          <Typography variant="span" fontWeight="bold"> {event.title} </Typography>
          de fecha 
          <Typography variant="span" fontWeight="bold"> {new Date(event.date).toLocaleDateString('es-ES', {
            weekday: 'long', // Display the full name of the weekday (e.g., "lunes")
            year: 'numeric', // Display the year (e.g., "2024")
            month: 'long', // Display the full name of the month (e.g., "abril")
            day: 'numeric' // Display the day of the month (e.g., "21")
          }).replace(/^\w|\s\w/g, c => c.toUpperCase())}</Typography>
          ?
        </Typography>
        <Button onClick={handleDelete} variant="contained" color="error" sx={{my: 2}}>
          Si, ¡eliminalo!
        </Button>
      </Alert>

    </>
  )
}

export default EventDelete