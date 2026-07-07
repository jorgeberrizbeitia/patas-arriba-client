// Tests for EventDescription — the card that renders an event's free-text
// organizer description, auto-linking any URLs the organizer typed.
//
// What this file pins down: an event WITH a description must render that
// description as real DOM (issue #31). The previous `react-linkify@1.0.0-alpha`
// default import resolved to an object under the React 19 / Vite 8 toolchain,
// so `<Linkify>` threw React error #130 at mount and the whole event-detail
// page went blank for admins and attendees of any described event. These tests
// would have caught that: rendering the component at all reproduces the crash,
// and we additionally assert the auto-link behaviour the dependency exists to
// provide — a bare URL in the description becomes a clickable anchor.
//
// What this file does NOT cover: the collapse toggle interaction (the text is
// mounted regardless of open/closed state) or the no-description branch, which
// renders a plain Alert and never touched the broken dependency.

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EventDescription from "./EventDescription";

describe("EventDescription", () => {
  it("renders an event description without crashing", () => {
    render(<EventDescription event={{ description: "Nos vemos en la entrada" }} />);

    expect(screen.getByText("Nos vemos en la entrada")).toBeInTheDocument();
  });

  it("turns a bare URL in the description into a clickable link", () => {
    render(
      <EventDescription
        event={{ description: "Detalles en https://patas-arriba.netlify.app" }}
      />
    );

    const link = screen.getByText("https://patas-arriba.netlify.app").closest("a");
    expect(link).toHaveAttribute("href", "https://patas-arriba.netlify.app");
  });
});
