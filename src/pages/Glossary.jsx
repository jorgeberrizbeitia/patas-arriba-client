import wipImg from "../assets/images/wip.png"
import Typography from '@mui/material/Typography'


function Glossary() {
  return (
    <div>

      <hr style={{maxWidth:"initial"}} />

      <Typography variant="h1">Glosario</Typography>

      <br />
      
      <img src={wipImg} alt="wip" style={{width: "80vw"}}/>

      <br />
      <br />

      <Typography variant="h3">Página en construcción</Typography>

    </div>
  )
}

export default Glossary