import { useState } from "react"
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";

import service from "@service/config"


function EventParticipantCard({getEventDetails}) {

  const { eventId } = useParams()

  const [showAreYouSureButtons, setShowAreYouSureButtons] = useState(false)

  const handleLeaveEvent = async () => {

    try {
      
      await service.patch(`/event/${eventId}/leave`)
      getEventDetails()

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Container>
      
      <Button color="error"onClick={() => setShowAreYouSureButtons(!showAreYouSureButtons)}>Salir del evento</Button>
      {showAreYouSureButtons && (
        <Card raised sx={{}}>
          <Alert severity="warning">Estas seguro que deseas salir? Si tienes un grupo de coche creado, esto eliminará el grupo.</Alert>
          <Button color="error" onClick={handleLeaveEvent}>Si</Button>
          <Button color="primary"onClick={() => setShowAreYouSureButtons(false)}>No</Button>
        </Card>
      )}

    </Container>
  )
}

export default EventParticipantCard