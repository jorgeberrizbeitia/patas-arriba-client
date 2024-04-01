import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function NoCarGroupNeeded({joinEvent}) {
  return (
    <>
      <Alert severity="info">
        Si cambias de opinion, luego podras buscar coches disponibles
      </Alert>
      <Button sx={{ margin: "30px" }} variant="contained" onClick={() => joinEvent()}>
        {/* //* IMPORTANT: above onClick needs to be () => joinEvent() without arguments. See joinEvent function */}
        Unirse al evento y volver a detalles!
      </Button>
    </>
  );
}

export default NoCarGroupNeeded;
