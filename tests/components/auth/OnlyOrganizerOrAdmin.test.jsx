import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import OnlyOrganizerOrAdmin from "@components/auth/OnlyOrganizerOrAdmin";

function renderWithAuth({ isLoggedIn, isOrganizerOrAdmin }) {
  return render(
    <AuthContext.Provider value={{ isLoggedIn, isOrganizerOrAdmin }}>
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <OnlyOrganizerOrAdmin>
                <div>Admin Content</div>
              </OnlyOrganizerOrAdmin>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("OnlyOrganizerOrAdmin", () => {
  it("renders children for logged-in organizer", () => {
    renderWithAuth({ isLoggedIn: true, isOrganizerOrAdmin: true });

    expect(screen.getByText("Admin Content")).toBeInTheDocument();
  });

  it("redirects regular user to /login", () => {
    renderWithAuth({ isLoggedIn: true, isOrganizerOrAdmin: false });

    expect(screen.queryByText("Admin Content")).not.toBeInTheDocument();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects anonymous user to /login", () => {
    renderWithAuth({ isLoggedIn: false, isOrganizerOrAdmin: false });

    expect(screen.queryByText("Admin Content")).not.toBeInTheDocument();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});