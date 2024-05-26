import logo from "@assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";

import countryPhoneCode from "@data/country-phone-code.json";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";

import { useEffect, useState } from "react";
import service from "@service/config";

import validateField from "@utils/validateField";
import GoBack from "@components/navigation/GoBack";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });
  const [username, setUsername] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });
  const [fullName, setFullName] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });
  const [phoneCode, setPhoneCode] = useState({
    value: 34,
    error: null,
    hasUserInteracted: true,
  }); // starts as true as there is default value
  const [phoneNumber, setPhoneNumber] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState();
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // this useEffect CDU will verify when all fields were touched and have no errors and allow submit

    const allFormStates = [
      email,
      username,
      fullName,
      phoneCode,
      phoneNumber,
      password,
      confirmPassword,
    ];

    const allStatesInteracted = allFormStates.every((e) => e.hasUserInteracted);
    const allStatesWithoutErrors = allFormStates.every((e) => !e.error);

    if (allStatesInteracted && allStatesWithoutErrors) {
      if (canSubmit === false) setCanSubmit(true);
    } else {
      if (canSubmit === true) setCanSubmit(false);
    }
  }, [
    email,
    username,
    fullName,
    phoneCode,
    phoneNumber,
    password,
    confirmPassword,
  ]);

  const handleEmail = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const updatedstate = validateField(
      e.target.value,
      email,
      true,
      regex,
      "Formato incorrecto"
    );
    setEmail(updatedstate);
  };

  const handleUsername = (e) => {
    const regex = /^[^\s]{3,15}$/;
    e.target.value = e.target.value.replace(" ", ""); // removes all empty spaces
    const updatedstate = validateField(
      e.target.value,
      username,
      true,
      regex,
      "No debe tener espacios y de 3 a 15 characteres"
    );
    setUsername(updatedstate);
  };

  const handleFullName = (e) => {
    const regex = /^[a-zA-ZÀ-ÖØ-öØ-ÿ\s']{3,30}$/;
    const updatedstate = validateField(
      e.target.value,
      fullName,
      true,
      regex,
      "Solo letras, espacios y de 3 a 30 caracteres"
    );
    setFullName(updatedstate);
  };

  const handlePhoneCode = (e) => {
    // no error verification
    setPhoneCode({ ...phoneCode, value: e.target.value });
  };

  const handlePhoneNumber = (e) => {
    const regex = /^[0-9]{7,15}$/;
    e.target.value = e.target.value.replace(/\D/g, ""); // removes all non-digits
    const updatedstate = validateField(
      e.target.value,
      phoneNumber,
      true,
      regex,
      "Solo dígitos numericos y de 7 a 15 dígitos"
    );
    setPhoneNumber(updatedstate);
  };

  const handlePassword = (e) => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    const updatedstate = validateField(
      e.target.value,
      password,
      true,
      regex,
      "Al menos 6 caractéres, un número, una minúscula y una mayúscula"
    );
    setPassword(updatedstate);
  };

  const handleConfirmPassword = (e) => {
    const clone = { ...confirmPassword };
    if (!e.target.value) {
      clone.error = "Campo obligatorio";
    } else if (e.target.value !== password.value) {
      clone.error = "Campos de contraseña no concuerdan";
    } else {
      clone.error = null;
    }
    clone.value = e.target.value;
    clone.hasUserInteracted = true;
    setConfirmPassword(clone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true)

    try {
      await service.post("/auth/signup", {
        email: email.value,
        username: username.value,
        fullName: fullName.value,
        phoneCode: phoneCode.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
      });

      navigate("/login");
    } catch (error) {
      const errorCode = error?.response?.status;
      const errorMessage = error?.response?.data?.errorMessage;
      const errorField = error?.response?.data?.errorField;
      if (errorCode === 400) {
        setServerError(errorMessage);
        //* error handling for unique properties below
        if (errorField === "email") {
          setEmail({ ...email, error: errorMessage });
        } else if (errorField === "phoneNumber") {
          setPhoneNumber({ ...phoneNumber, error: errorMessage });
        } else if (errorField === "username") {
          setUsername({ ...username, error: errorMessage });
        }
        setTimeout(() => setServerError(null), 5000);
        setIsSending(false)
      } else {
        navigate("/server-error");
      }
    }
  };

  return (
    <>

      <GoBack to="/"/>

      <Box
        component="form"
        noValidate
        autoComplete="on"
        display="flex"
        flexDirection="column"
        width="100%" 
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom>
          Registro
        </Typography>

        <TextField
          label="Correo Electronico"
          variant="outlined"
          value={email.value}
          onChange={handleEmail}
          fullWidth
          margin="normal"
          required
          error={email.hasUserInteracted && email.error !== null} // can display and any error exists
          helperText={email.error}
        />

        <TextField
          label="Nombre de Usuario"
          variant="outlined"
          value={username.value}
          onChange={handleUsername}
          fullWidth
          margin="normal"
          required
          error={username.hasUserInteracted && username.error !== null}
          helperText={username.error}
        />

        <TextField
          label="Nombre Completo"
          variant="outlined"
          value={fullName.value}
          onChange={handleFullName}
          fullWidth
          margin="normal"
          required
          error={fullName.hasUserInteracted && fullName.error !== null}
          helperText={fullName.error}
        />

        <Box sx={{ marginTop: "8px", marginBottom: "8px" }}>
          <TextField
            select
            label="Código"
            variant="outlined"
            fullWidth
            value={phoneCode.value}
            onChange={handlePhoneCode}
            sx={{ width: "45%" }}
            required
          >
            {countryPhoneCode.map((e, i) => (
              <MenuItem key={i} value={e.code}>
                {e.country} +{e.code}
              </MenuItem>
            ))}
          </TextField>

          {/* //TODO. Make it a button with flags, then it will update the code on a box on the side */}

          <TextField
            label="Número de Móvil"
            variant="outlined"
            fullWidth
            value={phoneNumber.value}
            onChange={handlePhoneNumber}
            sx={{ width: "55%" }}
            required
            error={phoneNumber.hasUserInteracted && phoneNumber.error !== null}
            helperText={phoneNumber.error}
          />
        </Box>

        <Alert severity="warning">Tu número telefónico podrá ser compartido con otros voluntarios para ponerse en contacto al organizar eventos o grupos de coche</Alert>

        <TextField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
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
          fullWidth
          error={
            confirmPassword.hasUserInteracted && confirmPassword.error !== null
          }
          helperText={confirmPassword.error}
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

        <LoadingButton loading={isSending} variant="contained" type="submit" disabled={!canSubmit}>
          registrate
        </LoadingButton>

        {serverError && <Alert sx={{mt: 2}} severity="error">{serverError}</Alert>}

        <Alert sx={{mt: 2}} severity="info">Luego de registrarte deberas contactar a algún admin u organizador para habilitar tu usuario y poder acceder</Alert>
      </Box>

      <br />

      <Link style={{marginBottom: "20px"}} to="/login">Si ya tienes cuenta, accede aqui</Link>
    </>
  );
}

export default Signup;
