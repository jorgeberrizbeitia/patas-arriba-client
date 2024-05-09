import { Player } from '@lottiefiles/react-lottie-player';
import animationNotFound from "@assets/animations/animation-not-found.json"
import GoBack from '@components/navigation/GoBack';
import Typography from '@mui/material/Typography';

function NotFound() {
  return (
    <>

      <GoBack to={-1} caption="Inicio"/> 

      <Typography variant='h3'>Página no encontrada</Typography>

      <br />

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

export default NotFound