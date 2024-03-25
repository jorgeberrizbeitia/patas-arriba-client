import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom"

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

import { useState } from "react";
import service from "@services/config";

function Signup() {
  
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    internationalDialingCode: 34,
    localPhoneNumber: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  // function countNonNullProperties(obj) {
  //   let count = 0;
  //   for (let key in obj) {
  //     if (obj[key] !== null) {
  //       count++;
  //     }
  //   }
  //   return count;
  // }
  
  const handleEmail = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!e.target.value) {
      setErrors({...errors, email: "Campo obligatorio"})
    } else if(!regex.test(e.target.value)) {
      setErrors({...errors, email: "Correo electrónico con formato incorrecto"})
    } else {
      setErrors({...errors, email: null})
    }
    setFormData({...formData, email: e.target.value});
  };

  const handleFirstName = (e) => {
    const regex = /^[a-zA-Z ]{2,20}$/;
    if (!e.target.value) {
      setErrors({...errors, firstName: "Campo obligatorio"})
    } else if(!regex.test(e.target.value)) {
      setErrors({...errors, firstName: "Nombre debe tener solo letras, espacios y de 2 a 20 caracteres"})
    } else {
      setErrors({...errors, firstName: null})
    }
    setFormData({...formData, firstName: e.target.value});  
  };

  const handleLastName = (e) => {
    const regex = /^[a-zA-Z ]{2,20}$/;
    if (!e.target.value) {
      setErrors({...errors, lastName: "Campo obligatorio"})
    } else if(!regex.test(e.target.value)) {
      setErrors({...errors, lastName: "Apellido debe tener solo letras, espacios y de 2 a 20 caracteres"})
    } else {
      setErrors({...errors, lastName: null})
    }
    setFormData({...formData, lastName: e.target.value});  
  };

  const handleInternationalDialingCode = (e) => {
    setFormData({...formData, internationalDialingCode: e.target.value});
  };

  const handleLocalPhoneNumber = (e) => {
    const regex = /^[0-9]{4,20}$/;
    if (!e.target.value) {
      setErrors({...errors, localPhoneNumber: "Campo obligatorio"})
    } else if(!regex.test(e.target.value)) {
      setErrors({...errors, localPhoneNumber: "Número telefónico solo debe contener dígitos numericos y de 4 a 20 dígitos"})
    } else {
      setErrors({...errors, localPhoneNumber: null})
    }
    setFormData({...formData, localPhoneNumber: e.target.value});
  };

  const handlePassword = (e) => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!e.target.value) {
      setErrors({...errors, password: "Campo obligatorio"})
    } else if(!regex.test(e.target.value)) {
      setErrors({...errors, password: "Contraseña debe tener al menos 6 caractéres, un número, una minúscula y una mayúscula"})
    } else {
      setErrors({...errors, password: null})
    }
    setFormData({...formData, password: e.target.value});
  };

  const handleConfirmPassword = (e) => {
    console.log(e.target.value)
    if (!e.target.value) {
      setErrors({...errors, confirmPassword: "Campo obligatorio"})
    } else if (e.target.value !== formData.password) {
      setErrors({...errors, confirmPassword: "Campos de contraseña no concuerdan"})
    } else {
      setErrors({...errors, confirmPassword: null})
    }
    setFormData({...formData, confirmPassword: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await service.post("/auth/signup", formData)
      navigate("/login")

    } catch (error) {
      console.log(error)
      navigate("/server-error")
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
          value={formData.email}
          onChange={handleEmail}
          margin="normal"
          required
          error={errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Nombre"
          variant="outlined"
          value={formData.firstName}
          onChange={handleFirstName}
          margin="normal"
          required
          error={errors.firstName}
          helperText={errors.firstName}
        />

        <TextField
          label="Apellido"
          variant="outlined"
          value={formData.lastName}
          onChange={handleLastName}
          margin="normal"
          required
          error={errors.lastName}
          helperText={errors.lastName}
        />

        <Box sx={{ marginTop: '8px', marginBottom: '8px' }}>
          <TextField
            select
            label="Código"
            variant="outlined"
            value={formData.internationalDialingCode}
            onChange={handleInternationalDialingCode}
            sx={{ width: '45%' }}
            required
          >
            {countryPhoneCode.map((e, i) => <MenuItem key={i} value={e.code}>{e.country} +{e.code}</MenuItem>)}
          </TextField>

          {/* //TODO. Make it a button with flags, then it will update the code on a box on the side */}

          <TextField
            label="Número de Móvil"
            variant="outlined"
            value={formData.localPhoneNumber}
            onChange={handleLocalPhoneNumber}
            sx={{ width: '55%' }}
            required
            error={errors.localPhoneNumber}
            helperText={errors.localPhoneNumber}
          />
        </Box>

        <TextField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={formData.password}
          onChange={handlePassword}
          margin="normal"
          required
          error={errors.password}
          helperText={errors.password}
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
          value={formData.confirmPassword}
          onChange={handleConfirmPassword}
          margin="normal"
          required
          error={errors.confirmPassword}
          helperText={errors.confirmPassword}
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

        >registrarse</Button>
      </Box>
    </Box>
  );
}

export default Signup;
