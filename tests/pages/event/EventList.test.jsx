// Acceptance tests for the "Crear Evento" FAB on the event list (issue #34,
// spec FR-7): creating an event is the primary organizer action, so it gets
// a floating action button — and it must never leak to volunteers, whose
// role cannot use the /event/create route. The list itself (fetching,
// upcoming/past filtering) is not under test here; the API is stubbed empty.
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import EventList from "@pages/event/EventList";

vi.mock("@service/config", () => ({
  default: { get: vi.fn(async () => ({ data: [] })) },
}));

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderEventList({ isOrganizerOrAdmin }) {
  return render(
    <AuthContext.Provider
      value={{ isLoggedIn: true, isOrganizerOrAdmin, isAdmin: false, loggedUser: null }}
    >
      <MemoryRouter initialEntries={["/event"]}>
        <Routes>
          <Route path="*" element={<EventList />} />
        </Routes>
        <LocationProbe />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("EventList — Crear Evento FAB", () => {
  it("shows the FAB to organizers/admins and navigates to /event/create", async () => {
    const user = userEvent.setup();
    renderEventList({ isOrganizerOrAdmin: true });

    const fab = await screen.findByRole("button", { name: /crear evento/i });
    await user.click(fab);

    expect(screen.getByTestId("location")).toHaveTextContent("/event/create");
  });

  it("never renders the FAB for volunteers", async () => {
    renderEventList({ isOrganizerOrAdmin: false });

    // Wait for the stubbed fetch to settle so the assertion covers the
    // loaded state, not just the initial loading spinner.
    expect(await screen.findByText("No se han encontrado eventos")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /crear evento/i })).not.toBeInTheDocument();
  });
});
