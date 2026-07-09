import { Player } from '@lottiefiles/react-lottie-player';
import animationNotFound from "@assets/animations/animation-not-found.json"
import Typography from '@mui/material/Typography';

function NotFound() {
  return (
    <>

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