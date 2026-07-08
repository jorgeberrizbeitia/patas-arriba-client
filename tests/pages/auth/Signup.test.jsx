// Acceptance tests for mobile keyboard hints on the signup form (issue #34,
// spec FR-8): inputMode is what makes a phone show the @ keyboard for email
// and the digit pad for the phone number. jsdom can't show keyboards, but
// the attribute contract is exactly what the browser keys off, so that is
// what we pin.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "@pages/auth/Signup";

function renderSignup() {
  return render(
    <MemoryRouter initialEntries={["/signup"]}>
      <Signup />
    </MemoryRouter>
  );
}

describe("Signup — mobile keyboard hints", () => {
  it("asks for the email keyboard on the email field", () => {
    renderSignup();

    expect(screen.getByLabelText(/correo electronico/i)).toHaveAttribute(
      "inputmode",
      "email"
    );
  });

  it("asks for the phone keypad on the phone number field", () => {
    renderSignup();

    expect(screen.getByLabelText(/número de móvil/i)).toHaveAttribute(
      "inputmode",
      "tel"
    );
  });
});
