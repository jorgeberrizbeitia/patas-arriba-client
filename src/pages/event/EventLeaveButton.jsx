import { useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";

function EventLeaveButton({handleLeaveEvent}) {

  const [ showAreYouSureButtons, setShowAreYouSureButtons ] = useState(false)

  return (
    <>
      <hr />

      <Button
        variant="outlined"
        color="error"
        onClick={() => setShowAreYouSureButtons(!showAreYouSureButtons)}
      >Salir del evento</Button>

      {showAreYouSureButtons && (
        <Card raised sx={{}}>

          <Alert severity="warning">
            Estas seguro que deseas salir? Si tienes un grupo de coche creado,
            esto eliminará el grupo.
          </Alert>

          <Button color="error" onClick={handleLeaveEvent}>
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

export default EventLeaveButton;
