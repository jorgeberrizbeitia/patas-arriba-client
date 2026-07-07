import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animationNotFound from "@assets/animations/animation-not-found.json"
import GoBack from '@components/navigation/GoBack';
import Typography from '@mui/material/Typography';

function NotFound() {
  return (
    <>

      <GoBack to={-1} caption="Inicio"/> 

      <Typography variant='h3'>Página no encontrada</Typography>

      <br />

      <DotLottieReact
        autoplay
        loop
        data={animationNotFound}
        style={{ height: '250px', width: '300px' }}
      />

    </>
  )
}

export default NotFound