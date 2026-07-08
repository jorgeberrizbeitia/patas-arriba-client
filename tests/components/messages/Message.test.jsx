// Accessibility contract for a chat message's action menu (issue #34, spec
// FR-9): the three-dots button is icon-only, so without an aria-label a
// screen reader announces nothing useful for the ONLY way to delete a
// message. The test renders the message as its own sender sees it, since
// that is the only case where the button exists.
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import Message from "@components/messages/Message";

const SENDER_ID = "user-1";

const message = {
  _id: "msg-1",
  isDeleted: false,
  sender: { _id: SENDER_ID, username: "maria_v", role: "user", icon: "", iconColor: "#EA5347" },
  text: "Hola equipo",
  createdAt: "2026-07-01T10:00:00.000Z",
};

describe("Message — own message actions", () => {
  it("gives the actions menu button an accessible name", () => {
    render(
      <AuthContext.Provider value={{ loggedUserId: SENDER_ID }}>
        <MemoryRouter>
          <Message
            message={message}
            type="event"
            handleDelete={vi.fn()}
            eventOrCarGroup={{ owner: { _id: "someone-else" } }}
          />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(
      screen.getByRole("button", { name: /opciones del mensaje/i })
    ).toBeInTheDocument();
  });
});
