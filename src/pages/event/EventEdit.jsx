import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import service from "@service/config";

import GoBack from "@components/navigation/GoBack";
import Loading from "@components/ui/Loading"
import EventEditForm from "@components/event/EventEditForm";
import EventEditStatus from "@components/event/EventEditStatus";
import EventDelete from "@components/event/EventDelete";

// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function EventEdit() {
  
  const { eventId } = useParams()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ event, setEvent ] = useState(null)
  const [ editType, setEditType ] = useState(null)
  // editType 1: normal fields, 2: change status, 3: delete event

  useEffect(() => {
    getEventDetails()
  }, [])

  const getEventDetails = async () => {

    try {
      
      const response = await service.get(`/event/${eventId}/edit`)

      setEvent(response.data)
      setIsLoading(false)

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>

      <GoBack to={`/event/${event._id}`}/> 

      <Typography variant="h5" color="initial" gutterBottom>Como quieres editar el evento?</Typography>

      <Box display="flex" flexDirection="row" justifyContent="space-evenly">

        <Button 
          onClick={() => setEditType(1)} 
          variant={editType === 1 ? "contained" : "outlined"} 
          color="info" 
          sx={{width: "25%", height: 80}}
        > Editar info </Button>

        <Button 
          onClick={() => setEditType(2)} 
          variant={editType === 2 ? "contained" : "outlined"} 
          color="primary" 
          sx={{width: "25%", height: 80}}
        >Cambiar Estado</Button>

        <Button 
          onClick={() => setEditType(3)} 
          variant={editType === 3 ? "contained" : "outlined"} 
          color="error" 
          sx={{width: "25%", height: 80}}
        >Eliminar</Button>

      </Box>

      <hr />

      {editType === 1 && <EventEditForm event={event}/>}
      {editType === 2 && <EventEditStatus event={event}/>}
      {editType === 3 && <EventDelete event={event}/>}

    </>
  );
}

export default EventEdit;