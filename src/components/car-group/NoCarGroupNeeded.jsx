import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function NoCarGroupNeeded() {
  return (
    <>
      <Alert severity="info">
        Si cambias de opinion, luego podras buscar coches disponibles
      </Alert>
      <Button sx={{ margin: "30px" }} variant="contained">
        Unirse al evento y volver a detalles!
      </Button>
    </>
  );
}

export default NoCarGroupNeeded;
