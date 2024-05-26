import logo from "@assets/images/logo.png";
import { useState, useEffect, useContext } from "react";
import validateField from "@utils/validateField";
import service from "@service/config";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth.context";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import GoBack from "@components/navigation/GoBack";

function Login() {
  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  const [credential, setCredential] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: null,
    hasUserInteracted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState();
  const [canSubmit, setCanSubmit] = useState(false);

  const handleCredential = (e) => {
    const updatedstate = validateField(e.target.value, credential, true);
    setCredential(updatedstate);
  };

  const handlePassword = (e) => {
    const updatedstate = validateField(e.target.value, password, true);
    setPassword(updatedstate);
  };

  useEffect(() => {
    // this useEffect CDU will verify when all fields were touched and have no errors and allow submit

    const allFormStates = [credential, password];

    const allStatesInteracted = allFormStates.every((e) => e.hasUserInteracted);
    const allStatesWithoutErrors = allFormStates.every((e) => !e.error);

    if (allStatesInteracted && allStatesWithoutErrors) {
      if (canSubmit === false) setCanSubmit(true);
    } else {
      if (canSubmit === true) setCanSubmit(false);
    }
  }, [credential, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await service.post("/auth/login", {
        credential: credential.value,
        password: password.value,
      });

      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      navigate("/");
    } catch (error) {
      const errorCode = error?.response?.status;
      const errorMessage = error?.response?.data?.errorMessage;
      const errorField = error?.response?.data?.errorField;
      if (errorCode === 400 || errorCode === 401) {
        setServerError(errorMessage);
        if (errorField === "credential") {
          setCredential({ ...credential, error: errorMessage });
        } else if (errorField === "password") {
          setPassword({ ...password, error: errorMessage });
        }
        setTimeout(() => setServerError(null), 5000);
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
          Acceso
        </Typography>

        <TextField
          label="Correo Electronico o Nombre de Usuario"
          variant="outlined"
          value={credential.value}
          onChange={handleCredential}
          sx={{ width: "100%" }}
          margin="normal"
          required
          error={credential.hasUserInteracted && credential.error !== null} // can display and any error exists
          helperText={credential.error}
        />

        <TextField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password.value}
          onChange={handlePassword}
          margin="normal"
          fullWidth
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

        <Button variant="contained" type="submit" disabled={!canSubmit}>
          Accede
        </Button>

        {serverError && <Alert sx={{mt: 2}} severity="error">{serverError}</Alert>}
      </Box>

      <br />

      <Link style={{marginBottom: "20px"}} to="/password-forget">Olvidaste tu contraseña?</Link>
      <Link style={{marginBottom: "20px"}} to="/signup">Si no tienes cuenta, registrate aqui</Link>
    </>
  );
}

export default Login;
