import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';

function GoBack({to}) {

  const navigate = useNavigate()

  return (
    <Box display="flex" justifyContent="flex-start" width="100%" paddingLeft={2}>
      <IconButton onClick={() => navigate(to)} sx={{width: "50px", height: "50px"}} color="primary">
        <ArrowBackIcon />
        <Typography variant="caption">volver</Typography>
      </IconButton>
    </Box>
  )
}

export default GoBack