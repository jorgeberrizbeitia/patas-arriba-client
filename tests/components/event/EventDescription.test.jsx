// Accessibility contract for the event-description disclosure (issue #34,
// spec FR-9): the expand arrow is icon-only, so it needs an accessible name,
// and aria-expanded must track the collapse state so assistive tech can tell
// whether tapping will open or close it. One test covers both halves of the
// disclosure pattern because they only make sense together.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventDescription from "@components/event/EventDescription";

describe("EventDescription — disclosure semantics", () => {
  it("names the toggle and tracks open state via aria-expanded", async () => {
    const user = userEvent.setup();
    render(<EventDescription event={{ description: "Traer ropa cómoda." }} />);

    const toggle = screen.getByRole("button", { name: /información del evento/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});
