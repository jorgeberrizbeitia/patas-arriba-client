// Acceptance tests for the per-screen header (issue #34, O4 resolution):
// the v6 mockup has no global top bar — each main screen owns a header with
// a first-name greeting, a display-face title, and the avatar as a profile
// shortcut. The behavior worth pinning: who the greeting names and where
// the avatar tap lands.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import PageHeader from "@components/ui/PageHeader";

const loggedUser = {
  _id: "u1",
  username: "maria_v",
  fullName: "Maria Vega",
  icon: "",
  iconColor: "#3E9B95",
};

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderHeader(user = loggedUser) {
  return render(
    <AuthContext.Provider value={{ isLoggedIn: !!user, loggedUser: user }}>
      <MemoryRouter initialEntries={["/event"]}>
        <PageHeader title="Eventos" />
        <Routes>
          <Route path="*" element={<LocationProbe />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("PageHeader", () => {
  it("greets the user by first name and shows the screen title", () => {
    renderHeader();

    expect(screen.getByText("Hola, Maria")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Eventos" })).toBeInTheDocument();
  });

  it("navigates to the own profile when the avatar shortcut is tapped", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: /ver perfil/i }));

    expect(screen.getByTestId("location")).toHaveTextContent("/user/own");
  });

  it("renders title but no greeting or shortcut without a logged user", () => {
    renderHeader(null);

    expect(screen.getByRole("heading", { name: "Eventos" })).toBeInTheDocument();
    expect(screen.queryByText(/hola,/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /ver perfil/i })).not.toBeInTheDocument();
  });
});
