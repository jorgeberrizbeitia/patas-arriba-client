import { Player } from '@lottiefiles/react-lottie-player';
import animationNotFound from "@assets/animations/animation-error.json"
import GoBack from '@components/navigation/GoBack';
import Typography from '@mui/material/Typography';

function ServerError() {
  return (
    <>

    <GoBack to={-1} caption="Volver"/> 

    <Typography variant='h3'>Error de Servidor</Typography>

    <br />

    <Typography variant='body'>Intenta nuevamente, si el problema persiste, contacta a un admin</Typography>

    <Player
      autoplay
      loop
      src={animationNotFound}
      style={{ height: '250px', width: '300px' }}
    >
    </Player>
  
  </>
  )
}

export default ServerError