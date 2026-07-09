// Acceptance tests for the root-route gate (issue #34, nav revision
// 2026-07-09): Home and Eventos were near-duplicates for logged-in users,
// so "/" sends them straight to the events list; anonymous visitors still
// get the Home landing (logo + CTAs).
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import HomeGate from "@components/navigation/HomeGate";

function renderGate(isLoggedIn) {
  return render(
    <AuthContext.Provider value={{ isLoggedIn, loggedUser: null }}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomeGate><div>Home landing</div></HomeGate>} />
          <Route path="/event" element={<div>Events screen</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("HomeGate", () => {
  it("redirects logged-in users from / to /event", () => {
    renderGate(true);

    expect(screen.getByText("Events screen")).toBeInTheDocument();
    expect(screen.queryByText("Home landing")).not.toBeInTheDocument();
  });

  it("shows the Home landing to anonymous visitors", () => {
    renderGate(false);

    expect(screen.getByText("Home landing")).toBeInTheDocument();
    expect(screen.queryByText("Events screen")).not.toBeInTheDocument();
  });
});
