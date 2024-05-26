import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import validateField from "@utils/validateField";
import GoBack from "@components/navigation/GoBack";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function PasswordReset() {

  const params = useParams()
  const navigate = useNavigate()

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
  const [showEmailSetAlert, setShowEmailSentAlert] = useState(false);
  const [isSending, setIsSending] = useState(false);


  useEffect(() => {
    // this useEffect CDU will verify when all fields were touched and have no errors and allow submit

    const allFormStates = [
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
    password,
    confirmPassword,
  ]);

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
      //* not using services as the temporary token needs to be passed manually
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/password-reset`, {
        password: password.value,
      }, {
        headers: { authorization: `Bearer ${params.token}` }
      });

      setShowEmailSentAlert(true)
      setIsSending(false)

    } catch (error) {
      const errorCode = error?.response?.status;
      const errorMessage = error?.response?.data?.errorMessage;
      if (errorCode === 400 || errorCode === 401) {
        setServerError(errorMessage);
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

      <Typography variant="h4" gutterBottom>
        Recuperar contraseña
      </Typography>

      <Typography variant="p" gutterBottom>
        Indica tu nueva contraseña y confirmala. Recuerda almacenarla en un lugar seguro.
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="on"
        display="flex"
        flexDirection="column"
        width="100%" 
        onSubmit={handleSubmit}
      >

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
          enviar
        </LoadingButton>

        {serverError && <Alert sx={{mt: 2}} severity="error">{serverError}</Alert>}

        {showEmailSetAlert && <Alert sx={{mt: 2}} severity="success">Contraseña cambiada correctamente. Puedes ir a <Link to="/login">inicio de sesión</Link> con tu nueva contraseña</Alert>}

      </Box>
    
    </>
  )
}

export default PasswordReset