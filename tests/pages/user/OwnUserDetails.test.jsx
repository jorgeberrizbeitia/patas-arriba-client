// Acceptance test for logging out from the profile (issue #34, pre-PR
// round): the profile is where users think about their account, so it
// carries a Cerrar Sesión button with the same contract as the Más sheet's —
// clear the token, re-authenticate, land on the public home.
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import OwnUserDetails from "@pages/user/OwnUserDetails";

// Push-notification settings talk to service workers — irrelevant to the
// logout contract and unavailable in jsdom.
vi.mock("@components/user/NotificationSettings", () => ({
  default: () => <div data-testid="notification-settings" />,
}));

const loggedUser = {
  _id: "u1",
  username: "lucia_vol",
  fullName: "Lucia Voluntaria",
  email: "lucia@demo.test",
  phoneCode: 34,
  phoneNumber: "600000001",
  createdAt: "2026-01-15T10:00:00.000Z",
  icon: "",
  iconColor: "#3E9B95",
};

describe("OwnUserDetails — logout", () => {
  it("clears the token and re-authenticates from the profile", async () => {
    const user = userEvent.setup();
    localStorage.setItem("authToken", "fake-token");
    const authenticateUser = vi.fn();
    render(
      <AuthContext.Provider
        value={{ isLoggedIn: true, isOrganizerOrAdmin: false, loggedUser, authenticateUser }}
      >
        <MemoryRouter initialEntries={["/user/own"]}>
          <OwnUserDetails />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await user.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    expect(localStorage.getItem("authToken")).toBeNull();
    expect(authenticateUser).toHaveBeenCalled();
  });
});
