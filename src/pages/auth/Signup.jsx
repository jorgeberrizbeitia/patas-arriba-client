import logo from "@assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom"

import countryPhoneCode from "@data/country-phone-code.json"

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';

import { useEffect, useState } from "react";
import service from "@service/config";

import validateField from "@utils/validateField";

function Signup() {
  
  const navigate = useNavigate()

  const [ email, setEmail ] = useState({value: "", error: null, hasUserInteracted: false})
  const [ firstName, setFirstName ] = useState({value: "", error: null, hasUserInteracted: false})
  const [ lastName, setLastName ] = useState({value: "", error: null, hasUserInteracted: false})
  const [ phoneCode, setPhoneCode ] = useState({value: 34, error: null, hasUserInteracted: true}) // starts as true as there is default value
  const [ phoneNumber, setPhoneNumber ] = useState({value: "", error: null, hasUserInteracted: false})
  const [ password, setPassword ] = useState({value: "", error: null, hasUserInteracted: false})
  const [ confirmPassword, setConfirmPassword ] = useState({value: "", error: null, hasUserInteracted: false})

  const [ showPassword, setShowPassword] = useState(false);
  const [ serverError, setServerError] = useState();
  const [ canSubmit, setCanSubmit ] = useState(false)

  useEffect(() => {
    // this useEffect CDU will verify when all fields were touched and have no errors and allow submit
    
    const allFormStates = [email, firstName, lastName, phoneCode, phoneNumber, password, confirmPassword]

    const allStatesInteracted = allFormStates.every((e) => e.hasUserInteracted)
    const allStatesWithoutErrors = allFormStates.every((e) => !e.error)

    if (allStatesInteracted && allStatesWithoutErrors) {
      if (canSubmit === false) setCanSubmit(true)
    } else {
      if (canSubmit === true) setCanSubmit(false)
    }
  }, [email, firstName, lastName, phoneCode, phoneNumber, password, confirmPassword])

  const handleEmail = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const updatedstate = validateField(e.target.value, email, true, regex, "Correo electrónico con formato incorrecto")
    console.log(updatedstate)
    setEmail(updatedstate);
  };

  const handleFirstName = (e) => {
    const regex = /^[a-zA-ZÀ-ÖØ-öØ-ÿ\s']{1,20}$/; 
    const updatedstate = validateField(e.target.value, email, true, regex, "Nombre debe tener solo letras, espacios y de 2 a 20 caracteres")
    setFirstName(updatedstate);
  };

  const handleLastName = (e) => {
    const regex = /^[a-zA-ZÀ-ÖØ-öØ-ÿ\s']{1,20}$/;
    const updatedstate = validateField(e.target.value, email, true, regex, "Apellido debe tener solo letras, espacios y de 2 a 20 caracteres")
    setLastName(updatedstate);
  };

  const handlePhoneCode = (e) => {
    // no error verification
    setPhoneCode({...phoneCode, value: e.target.value})
  };

  const handlePhoneNumber = (e) => {
    const regex = /^[0-9]{4,20}$/;
    const updatedstate = validateField(e.target.value, email, true, regex, "Número telefónico solo debe contener dígitos numericos y de 4 a 20 dígitos")
    setPhoneNumber(updatedstate);
  };

  const handlePassword = (e) => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    const updatedstate = validateField(e.target.value, password, true, regex, "Contraseña debe tener al menos 6 caractéres, un número, una minúscula y una mayúscula")
    setPassword(updatedstate);
  };

  const handleConfirmPassword = (e) => {
    console.log(e.target.value)
    const clone = {...confirmPassword}
    if (!e.target.value) {
      clone.error =  "Campo obligatorio"
    } else if (e.target.value !== password.value) {
      clone.error = "Campos de contraseña no concuerdan"
    } else {
      clone.error = null
    }
    clone.value = e.target.value
    clone.hasUserInteracted = true
    setConfirmPassword(clone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await service.post("/auth/signup", {
        email: email.value, 
        firstName: firstName.value, 
        lastName: lastName.value, 
        phoneCode: phoneCode.value, 
        phoneNumber: phoneNumber.value, 
        password: password.value
      })

      navigate("/login")

    } catch (error) {
      console.log(error)
      const errorCode = error?.response?.status
      const errorMessage = error?.response?.data?.errorMessage
      const errorField = error?.response?.data?.errorField
      if (errorCode === 400) {
        setServerError(errorMessage)
        if (errorField === "email") {
          setEmail({...email, error: errorMessage})
        } else if (errorField === "phoneNumber") {
          setPhoneNumber({...phoneNumber, error: errorMessage})
        } else if (errorField === "fullName") {
          setFirstName({...firstName, error: errorMessage})
          setLastName({...lastName, error: errorMessage})
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
          Registro
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
          label="Nombre"
          variant="outlined"
          value={firstName.value}
          onChange={handleFirstName}
          margin="normal"
          required
          error={firstName.hasUserInteracted && firstName.error !== null}
          helperText={firstName.error}
        />

        <TextField
          label="Apellido"
          variant="outlined"
          value={lastName.value}
          onChange={handleLastName}
          margin="normal"
          required
          error={lastName.hasUserInteracted && lastName.error !== null}
          helperText={lastName.error}
        />

        <Box sx={{ marginTop: '8px', marginBottom: '8px' }}>
          <TextField
            select
            label="Código"
            variant="outlined"
            value={phoneCode.value}
            onChange={handlePhoneCode}
            sx={{ width: '45%' }}
            required
          >
            {countryPhoneCode.map((e, i) => <MenuItem key={i} value={e.code}>{e.country} +{e.code}</MenuItem>)}
          </TextField>

          {/* //TODO. Make it a button with flags, then it will update the code on a box on the side */}

          <TextField
            label="Número de Móvil"
            variant="outlined"
            value={phoneNumber.value}
            onChange={handlePhoneNumber}
            sx={{ width: '55%' }}
            required
            error={phoneNumber.hasUserInteracted && phoneNumber.error !== null}
            helperText={phoneNumber.error}
          />
        </Box>

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

        <TextField
          label="Confirmar Contraseña"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={confirmPassword.value}
          onChange={handleConfirmPassword}
          margin="normal"
          required
          error={confirmPassword.hasUserInteracted && confirmPassword.error !== null}
          helperText={confirmPassword.error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" >
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
        >registrarse</Button>

          {serverError && <Alert severity="error">{serverError}</Alert>}

      </Box>

      <Link to="/login">Si ya tienes cuenta accede aqui</Link>

    </Box>
  );
}

export default Signup;
