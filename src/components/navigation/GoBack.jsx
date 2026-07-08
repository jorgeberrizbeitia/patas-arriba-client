// The in-page back control: a plain arrow + label at the start of the line,
// where every mobile app puts it. The old version flanked the button with
// two <hr> rules, which read as decoration and squeezed the target between
// them (issue #34, Change 10). A text Button gives the 48px touch height
// from the theme for free.

import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';

function GoBack({to, caption}) {

  const navigate = useNavigate()

  return (
    <Box display="flex" justifyContent="flex-start" width="100%" mb={1}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(to)}
        variant="text"
        color="primary"
      >
        {caption || "volver"}
      </Button>
    </Box>
  )
}

export default GoBack
