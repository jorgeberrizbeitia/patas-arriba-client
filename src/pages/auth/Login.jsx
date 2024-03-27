import logo from "@assets/images/logo.png"
import { useState, useEffect, useContext } from "react";
import validateField from "@utils/validateField";
import service from "@service/config"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "@context/auth.context";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';

function Login() {

  const navigate = useNavigate()
  const { authenticateUser } = useContext(AuthContext)

  const [ email, setEmail ] = useState({value: "", error: null, hasUserInteracted: false})
  const [ password, setPassword ] = useState({value: "", error: null, hasUserInteracted: false})

  const [ showPassword, setShowPassword] = useState(false);
  const [ serverError, setServerError] = useState();
  const [ canSubmit, setCanSubmit ] = useState(false)

  const handleEmail = (e) => {
    const updatedstate = validateField(e.target.value, email, true)
    setEmail(updatedstate);
  };

  const handlePassword = (e) => {
    const updatedstate = validateField(e.target.value, password, true)
    setPassword(updatedstate);
  };

  useEffect(() => {
    const allFormStates = [email, password]

    const allStatesInteracted = allFormStates.every((e) => e.hasUserInteracted)
    const allStatesWithoutErrors = allFormStates.every((e) => !e.error)

    if (allStatesInteracted && allStatesWithoutErrors) {
      if (canSubmit === false) setCanSubmit(true)
    } else {
      if (canSubmit === true) setCanSubmit(false)
    }
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await service.post("/auth/login", {
        email: email.value, 
        password: password.value
      })

      localStorage.setItem("authToken", response.data.authToken)

      await authenticateUser()

      navigate("/")

    } catch (error) {
      console.log(error)
      const errorCode = error?.response?.status
      const errorMessage = error?.response?.data?.errorMessage
      const errorField = error?.response?.data?.errorField
      if (errorCode === 400 || errorCode === 401) {
        setServerError(errorMessage)
        if (errorField === "email") {
          setEmail({...email, error: errorMessage})
        } else if (errorField === "password") {
          setPassword({...password, error: errorMessage})
        }
        setTimeout(() => setServerError(null), 5000)
      } else {
        navigate("/server-error")
      }
    }

  }

  return (
    <Box  display="flex" flexDirection="column" alignItems="center">

      <img src={logo} alt="logo" width={"300px"} />

      <Box component="form" noValidate autoComplete="on" display="flex" flexDirection="column" onSubmit={handleSubmit} sx={{maxWidth:"320px"}}>

        <Typography variant="h4" gutterBottom>
          Acceso
        </Typography>

        <TextField
          label="Correo Electronico"
          variant="outlined"
          value={email.value}
          onChange={handleEmail}
          margin="normal"
          required
          error={email.hasUserInteracted && email.error !== null} // can display and any error exists
          helperText={email.error}
        />

        <TextField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password.value}
          onChange={handlePassword}
          margin="normal"
          required
          error={password.hasUserInteracted && password.error !== null}
          helperText={password.error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button 
          variant="contained" 
          type="submit"
          disabled={!canSubmit}
        >Acceder</Button>

          {serverError && <Alert severity="error">{serverError}</Alert>}

      </Box>
    </Box>
  )
}

export default Login