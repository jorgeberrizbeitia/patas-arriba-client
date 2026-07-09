// The root-route gate: logged-in users never see the Home landing, because
// it duplicated the events list (issue #34, nav revision 2026-07-09) —
// "Eventos" IS home for them, so "/" redirects there. Anonymous visitors
// still get the landing page (logo + Regístrate / Inicia Sesión), which is
// the app's public face.

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@context/auth.context";

function HomeGate({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Navigate to="/event" replace />;
  }

  return children;
}

export default HomeGate;
