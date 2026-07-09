// Acceptance tests for the event card's tap behavior (issue #34 sweep):
// on the list, the WHOLE card is the touch target for opening details —
// a full-width card with a small "ver mas detalles" text button wastes the
// biggest tap area on the screen. Also pins the null-owner guard: events
// whose owner was deleted (or legacy rows) must not render a blank link on
// the details view.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import EventCard from "@components/event/EventCard";

const baseEvent = {
  _id: "e1",
  title: "Visita a la protectora",
  category: "protectora",
  location: "Protectora Municipal",
  date: "2027-01-01T10:00:00.000Z",
  status: "open",
  attendees: [],
  hasCarOrganization: false,
  owner: { _id: "u2", username: "organizadora" },
};

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderCard(props) {
  return render(
    <AuthContext.Provider value={{ loggedUserId: "u1", isOrganizerOrAdmin: false }}>
      <MemoryRouter initialEntries={["/event"]}>
        <EventCard event={baseEvent} {...props} />
        <LocationProbe />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("EventCard — list mode", () => {
  it("navigates to the event details when the card itself is tapped", async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByText("Visita a la protectora"));

    expect(screen.getByTestId("location")).toHaveTextContent("/event/e1");
  });
});

describe("EventCard — details mode", () => {
  it("links to the organizer when the event has one", () => {
    renderCard({ event: baseEvent, fromDetails: true });

    expect(screen.getByText(/organizadora/)).toBeInTheDocument();
  });

  it("renders no organizer row at all when the owner is gone (deleted user)", () => {
    renderCard({ event: { ...baseEvent, owner: null }, fromDetails: true });

    expect(screen.queryByText(/organizado por/i)).not.toBeInTheDocument();
  });
});
