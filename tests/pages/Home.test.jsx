// Acceptance tests for the merged landing (issue #34, v6 "video direction"):
// the anonymous home IS the login screen — brand wordmark, credential +
// password fields and Accede right there, with exactly one Regístrate path
// and the forgot-password link. No extra taps between arriving and logging
// in, no duplicated CTAs.
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import Home from "@pages/Home";

vi.mock("@service/config", () => ({
  default: { post: vi.fn(), get: vi.fn() },
}));

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderHome() {
  return render(
    <AuthContext.Provider value={{ isLoggedIn: false, authenticateUser: vi.fn() }}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
        <LocationProbe />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("Home — landing with login (anonymous)", () => {
  it("shows the login form directly on the landing", () => {
    renderHome();

    expect(screen.getByLabelText(/correo electronico o nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /accede/i })).toBeInTheDocument();
  });

  it("offers exactly one Regístrate path, to /signup", async () => {
    const user = userEvent.setup();
    renderHome();

    const registers = screen.getAllByRole("link", { name: /regístrate|registrate/i });
    expect(registers).toHaveLength(1);

    await user.click(registers[0]);

    expect(screen.getByTestId("location")).toHaveTextContent("/signup");
  });

  it("links to password recovery", async () => {
    const user = userEvent.setup();
    renderHome();

    await user.click(screen.getByRole("link", { name: /olvidaste tu contraseña/i }));

    expect(screen.getByTestId("location")).toHaveTextContent("/password-forget");
  });
});
