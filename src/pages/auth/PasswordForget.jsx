import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from "@mui/material/Alert";

import validateField from "@utils/validateField";
import GoBack from "@components/navigation/GoBack";

import service from "@service/config";

function PasswordForget() {

  const [email, setEmail] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });

  const [serverError, setServerError] = useState();
  const [canSubmit, setCanSubmit] = useState(false);
  const [showEmailSetAlert, setShowEmailSentAlert] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleEmail = (e) => {
    const updatedstate = validateField(e.target.value, email, true);
    setEmail(updatedstate);
  };

  useEffect(() => {
    if (email.hasUserInteracted && !email.error) {
      if (canSubmit === false) setCanSubmit(true);
    } else {
      if (canSubmit === true) setCanSubmit(false);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true)

    try {
      await service.post("/auth/password-forget", {
        email: email.value,
      });

      setShowEmailSentAlert(true)
      setIsSending(false)

    } catch (error) {
      const errorCode = error?.response?.status;
      const errorMessage = error?.response?.data?.errorMessage;
      if (errorCode === 400 || errorCode === 401) {
        setServerError(errorMessage);
        setEmail({ ...email, error: errorMessage });
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
          Solicitar recuperación de contraseña
        </Typography>

        <Typography variant="p" gutterBottom>
          Indica el correo electrónico de tu usuario. Ahí serán enviadas las instrucciones de recuperación de contraseña.
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

        <LoadingButton loading={isSending} variant="contained" type="submit" disabled={!canSubmit}>
          enviar
        </LoadingButton>

        {serverError && <Alert sx={{mt: 2}} severity="error">{serverError}</Alert>}

        {showEmailSetAlert && <Alert sx={{mt: 2}} severity="success">Revisa tu bandeja de entrada o bandeja de spam por un correo enviado desde: <Typography variant="span" fontWeight="bold">soporte.patasarriba@gmail.com</Typography> y sigue las instrucciones. Este correo podría tardar unos minutos en ser enviado.</Alert>}

      </Box>
    
    </>
  )
}

export default PasswordForget