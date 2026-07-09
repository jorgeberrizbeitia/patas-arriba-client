// Acceptance tests for the mobile-first primary navigation (issue #34,
// spec FR-6): a fixed BottomNavigation replaces the hamburger drawer as the
// way to reach primary destinations, with role-dependent items and a "Más"
// overflow for the secondary ones. These tests pin down WHICH destinations
// each kind of visitor sees and where each tap lands — the regression that
// matters when navigation is rebuilt.
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import BottomNav from "@components/navigation/BottomNav";

// The tests assert on the URL the nav produces, not on page components —
// pages have their own tests; the nav's contract is the destination path.
function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderNav(auth) {
  const authValue = {
    isLoggedIn: false,
    isOrganizerOrAdmin: false,
    isAdmin: false,
    authenticateUser: vi.fn(),
    loggedUser: null,
    ...auth,
  };
  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter initialEntries={["/"]}>
        <BottomNav />
        <Routes>
          <Route path="*" element={<LocationProbe />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("BottomNav — anonymous visitor", () => {
  it("shows exactly Inicio, Acceso, Registro", () => {
    renderNav({ isLoggedIn: false });

    expect(screen.getByRole("button", { name: "Inicio" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Acceso" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Registro" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Eventos" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Perfil" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Más" })).not.toBeInTheDocument();
  });

  it("navigates to /login when Acceso is tapped", async () => {
    const user = userEvent.setup();
    renderNav({ isLoggedIn: false });

    await user.click(screen.getByRole("button", { name: "Acceso" }));

    expect(screen.getByTestId("location")).toHaveTextContent("/login");
  });
});

describe("BottomNav — logged-in volunteer", () => {
  it("shows Eventos, Glosario, Perfil, Más — no Inicio and no anon items", () => {
    renderNav({ isLoggedIn: true });

    expect(screen.getByRole("button", { name: "Eventos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Glosario" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Perfil" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Más" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Inicio" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Acceso" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Registro" })).not.toBeInTheDocument();
  });

  it("navigates to /event when Eventos is tapped", async () => {
    const user = userEvent.setup();
    renderNav({ isLoggedIn: true });

    await user.click(screen.getByRole("button", { name: "Eventos" }));

    expect(screen.getByTestId("location")).toHaveTextContent("/event");
  });

  it("navigates to /glossary when Glosario is tapped", async () => {
    const user = userEvent.setup();
    renderNav({ isLoggedIn: true });

    await user.click(screen.getByRole("button", { name: "Glosario" }));

    expect(screen.getByTestId("location")).toHaveTextContent("/glossary");
  });

  it("offers only Cerrar Sesión in Más — Glosario lives in the bar now", async () => {
    const user = userEvent.setup();
    renderNav({ isLoggedIn: true });

    await user.click(screen.getByRole("button", { name: "Más" }));

    // Scope to the sheet's list — "Glosario" also exists as a bar tab.
    const sheet = within(await screen.findByRole("list"));
    expect(sheet.getByText("Cerrar Sesión")).toBeInTheDocument();
    expect(sheet.queryByText("Glosario")).not.toBeInTheDocument();
    expect(sheet.queryByText("Ver Usuarios")).not.toBeInTheDocument();
    expect(sheet.queryByText("Crear Evento")).not.toBeInTheDocument();
  });

  it("logs out from Más: clears the token and re-authenticates", async () => {
    const user = userEvent.setup();
    localStorage.setItem("authToken", "fake-token");
    const authenticateUser = vi.fn();
    renderNav({ isLoggedIn: true, authenticateUser });

    await user.click(screen.getByRole("button", { name: "Más" }));
    await user.click(await screen.findByText("Cerrar Sesión"));

    expect(localStorage.getItem("authToken")).toBeNull();
    expect(authenticateUser).toHaveBeenCalled();
  });
});

describe("BottomNav — organizer/admin", () => {
  it("offers Ver Usuarios in Más — Crear Evento lives on the events FAB", async () => {
    const user = userEvent.setup();
    renderNav({ isLoggedIn: true, isOrganizerOrAdmin: true });

    await user.click(screen.getByRole("button", { name: "Más" }));

    const sheet = within(await screen.findByRole("list"));
    expect(sheet.getByText("Ver Usuarios")).toBeInTheDocument();
    expect(sheet.getByText("Cerrar Sesión")).toBeInTheDocument();
    expect(sheet.queryByText("Crear Evento")).not.toBeInTheDocument();
    expect(sheet.queryByText("Glosario")).not.toBeInTheDocument();
  });
});
