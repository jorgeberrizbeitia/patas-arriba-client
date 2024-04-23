import { useEffect, useRef, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import service from "@service/config";
import { useNavigate } from "react-router-dom";

function CarGroupLeaveButton({carGroup}) {

  const [ showAreYouSureButtons, setShowAreYouSureButtons ] = useState(false)
  const navigate = useNavigate()

  const cardRef = useRef(null)

  const handleShowLeaveCard = () => {
    setShowAreYouSureButtons(!showAreYouSureButtons)
  }

  useEffect(() => {
    if (showAreYouSureButtons && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showAreYouSureButtons]);

  const handleLeaveCarGroup = async () => {
    
    try {
      
      service.patch(`/car-group/${carGroup._id}/leave`)
      navigate(`/event/${carGroup.event._id}`)

    } catch (error) {
      navigate("/server-error")
    }

  }

  return (
    <>
      <hr />

      {<Button
        variant="outlined"
        color="error"
        onClick={handleShowLeaveCard}
      >Salir del grupo de coche</Button>}

      <br />

      {showAreYouSureButtons && (
        <Card ref={cardRef} raised sx={{width: "100%"}}>

          <Alert severity="warning">
            Estas seguro que deseas salir de este grupo de coche?
          </Alert>

          <Button color="error" onClick={handleLeaveCarGroup}>
            Si
          </Button>

          <Button color="primary" onClick={() => setShowAreYouSureButtons(false)}>
            No
          </Button>

        </Card>
      )}

    </>
  );
}

export default CarGroupLeaveButton;