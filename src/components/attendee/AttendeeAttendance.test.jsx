// Tests for AttendeeAttendance — the list view that renders one
// AttendeeAttendanceCard per attendee.
//
// What this file pins down: after flipping the server-side attendance default
// from "pending" to "show" (see ../../../specs/attendance-default.md), the
// component must NOT render the legacy "still pending" warning Alert. The
// warning was meaningful only when "pending" was the default; with the new
// default it would either never fire or alarm organizers about historical
// records they already know about. We assert the absence of that Alert in
// both the "all attended" case and the "legacy pending record present" case,
// because both are reachable in production.
//
// What this file does NOT cover: the dropdown behaviour inside
// AttendeeAttendanceCard, the network call wiring, or the colour mapping —
// those are the card's concern, not the list's.

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AttendeeAttendance from "./AttendeeAttendance";

// AttendeeAttendanceCard is rendered as a child but is irrelevant to the
// list-level assertions in this file. Stubbing it avoids pulling in MUI
// TextField, the service module, and react-router — none of which are part
// of the contract we are asserting here.
vi.mock("./AttendeeAttendanceCard", () => ({
  default: ({ attendee }) => (
    <div data-testid="attendee-card">{attendee._id}</div>
  ),
}));

const buildAttendee = (id, attendance) => ({
  _id: id,
  attendance,
  user: { _id: `u-${id}`, username: `user-${id}`, fullName: `User ${id}`, role: "user" },
});

const renderList = (attendees) =>
  render(
    <MemoryRouter>
      <AttendeeAttendance attendees={attendees} setAttendees={() => {}} />
    </MemoryRouter>
  );

describe("AttendeeAttendance — pending-warning Alert is gone", () => {
  it("renders no pending-attendees warning when everyone is marked show", () => {
    renderList([
      buildAttendee("1", "show"),
      buildAttendee("2", "show"),
    ]);

    // The legacy warning was the only Alert in this component. Asserting on
    // its substring keeps the test resilient to MUI Alert internals.
    expect(screen.queryByText(/pendientes por marcar asistencia/i)).toBeNull();
  });

  it("renders no pending-attendees warning even when a legacy 'pending' record exists", () => {
    renderList([
      buildAttendee("1", "show"),
      buildAttendee("2", "pending"),
      buildAttendee("3", "no-show"),
    ]);

    expect(screen.queryByText(/pendientes por marcar asistencia/i)).toBeNull();
  });

  it("still renders one card per attendee", () => {
    renderList([
      buildAttendee("1", "show"),
      buildAttendee("2", "pending"),
    ]);

    expect(screen.getAllByTestId("attendee-card")).toHaveLength(2);
  });
});
