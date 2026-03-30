import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import OnlyAnon from "@components/auth/OnlyAnon";

function renderWithAuth(isLoggedIn, initialRoute = "/anon") {
  return render(
    <AuthContext.Provider value={{ isLoggedIn }}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route
            path="/anon"
            element={
              <OnlyAnon>
                <div>Anon Content</div>
              </OnlyAnon>
            }
          />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("OnlyAnon", () => {
  it("renders children when user is not logged in", () => {
    renderWithAuth(false);

    expect(screen.getByText("Anon Content")).toBeInTheDocument();
  });

  it("redirects to / when user is logged in", () => {
    renderWithAuth(true);

    expect(screen.queryByText("Anon Content")).not.toBeInTheDocument();
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});