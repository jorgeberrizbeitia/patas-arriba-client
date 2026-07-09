// The one way to log out, shared by every surface that offers it (the Más
// sheet and the profile page). The contract: drop the token, let
// AuthContext re-authenticate (which resets all role state), land on the
// public home. Living in one hook keeps the surfaces from drifting — a
// logout that forgets authenticateUser() leaves stale role state behind.

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth.context";

function useLogout() {
  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  return async () => {
    localStorage.removeItem("authToken");
    await authenticateUser();
    navigate("/");
  };
}

export default useLogout;
