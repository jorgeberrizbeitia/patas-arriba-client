// Acceptance tests for the top app bar (issue #34, choice-story S5): a
// plain MUI AppBar carrying ONLY the current screen's title — deliberately
// no identity, role badge, avatar shortcut, or overflow menu, all of which
// live in the bottom nav / Perfil. The behavior worth pinning: which title
// each route shows, and that the bar stays free of identity chrome even
// for a logged-in admin.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import TopBar from "@components/navigation/TopBar";

const admin = {
  _id: "u1",
  username: "maria_v",
  fullName: "Maria Vega",
  icon: "",
  iconColor: "#3E9B95",
};

function renderAt(path, user = admin) {
  return render(
    <AuthContext.Provider
      value={{ isLoggedIn: !!user, isAdmin: true, isOrganizerOrAdmin: true, loggedUser: user }}
    >
      <MemoryRouter initialEntries={[path]}>
        <TopBar />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("TopBar — screen titles", () => {
  it.each([
    ["/", "Patas Arriba"],
    ["/event", "Eventos"],
    ["/event/create", "Crear Evento"],
    ["/event/abc123", "Evento"],
    ["/user/own", "Perfil"],
    ["/user", "Usuarios"],
    ["/glossary", "Glosario"],
    ["/login", "Acceso"],
    ["/signup", "Registro"],
    ["/somewhere/unknown", "Patas Arriba"],
  ])("shows %s as “%s”", (path, title) => {
    renderAt(path);

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});

describe("TopBar — no identity chrome", () => {
  it("never shows username, role, avatar shortcut or overflow, even for an admin", () => {
    renderAt("/event");

    expect(screen.queryByText(/maria_v/)).not.toBeInTheDocument();
    expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
