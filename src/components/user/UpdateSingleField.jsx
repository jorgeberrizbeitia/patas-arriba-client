import { useContext, useState } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import service from '@service/config';
import { AuthContext } from '@context/auth.context';
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';


function UpdateSingleField({value, setPropertyToEdit, propertyToEdit}) {

  const { loggedUser, setLoggedUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [ input, setInput ] = useState({value: value, error: null})
  const [ isUpdating, setIsUpdating ] = useState(false)

  const handleSubmit = async () => {
    setIsUpdating(true)

    try {
      const response = await service.patch(`/user/${propertyToEdit}`, {[propertyToEdit]: input.value})
        
      setLoggedUser(response.data)
      setIsUpdating(false)
      setPropertyToEdit(null)

    } catch (error) {
      const errorCode = error?.response?.status
      const errorMessage = error?.response?.data?.errorMessage
      if (errorCode === 400) {
        setInput({...input, error: errorMessage})
        setIsUpdating(false)
      } else {
        navigate("/server-error")
      }
      
    }

  }

  return (
    <Box >
      <TextField
        label=""
        value={input.value}
        onChange={(e) => setInput({value: e.target.value, error: null})}
        error={input.error !== null}
        helperText={input.error}
        InputProps={{
          endAdornment: isUpdating && <CircularProgress size={35} />,
        }}
      />
      <Box>
        <IconButton color={"success"} onClick={handleSubmit} disabled={isUpdating}>
          <CheckIcon />
          <Typography variant="icon">aceptar</Typography>
        </IconButton>
        <IconButton color={"error"} onClick={() => setPropertyToEdit(null)} disabled={isUpdating}>
          <CloseIcon />
          <Typography variant="icon">cancelar</Typography>
        </IconButton>
      </Box>
    </Box>
  )
}

export default UpdateSingleField