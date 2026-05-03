import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import OnlyPrivate from "@components/auth/OnlyPrivate";

function renderWithAuth(isLoggedIn, initialRoute = "/private") {
  return render(
    <AuthContext.Provider value={{ isLoggedIn }}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route
            path="/private"
            element={
              <OnlyPrivate>
                <div>Private Content</div>
              </OnlyPrivate>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("OnlyPrivate", () => {
  it("renders children when user is logged in", () => {
    renderWithAuth(true);

    expect(screen.getByText("Private Content")).toBeInTheDocument();
  });

  it("redirects to /login when user is not logged in", () => {
    renderWithAuth(false);

    expect(screen.queryByText("Private Content")).not.toBeInTheDocument();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});