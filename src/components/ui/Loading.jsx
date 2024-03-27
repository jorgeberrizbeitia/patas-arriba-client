import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

function Loading() {
  return (
    <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "150px"}}>
      <CircularProgress size={70}/>
    </Container>
  )
}

export default Loading