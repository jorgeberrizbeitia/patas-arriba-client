// Contract test for the login form, extracted from the old /login page so
// the landing can embed it (issue #34): a successful submit must store the
// token, re-authenticate the context, and land on "/" — the same contract
// the standalone page honored. Pinned here because the extraction moved
// previously untested logic.
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import LoginForm from "@components/auth/LoginForm";
import service from "@service/config";

vi.mock("@service/config", () => ({
  default: { post: vi.fn() },
}));

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

beforeEach(() => {
  localStorage.removeItem("authToken");
  vi.clearAllMocks();
});

describe("LoginForm", () => {
  it("stores the token, re-authenticates and lands on / on success", async () => {
    const user = userEvent.setup();
    const authenticateUser = vi.fn();
    service.post.mockResolvedValue({ data: { authToken: "jwt-123" } });

    render(
      <AuthContext.Provider value={{ authenticateUser }}>
        <MemoryRouter initialEntries={["/somewhere"]}>
          <LoginForm />
          <Routes>
            <Route path="*" element={<LocationProbe />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await user.type(screen.getByLabelText(/correo electronico o nombre/i), "lucia_vol");
    await user.type(screen.getByLabelText(/contraseña/i), "Demo1234!");
    await user.click(screen.getByRole("button", { name: /accede/i }));

    expect(service.post).toHaveBeenCalledWith("/auth/login", {
      credential: "lucia_vol",
      password: "Demo1234!",
    });
    expect(localStorage.getItem("authToken")).toBe("jwt-123");
    expect(authenticateUser).toHaveBeenCalled();
    expect(screen.getByTestId("location")).toHaveTextContent(/^\/$/);
  });

  it("surfaces a 401 as a field/server error instead of navigating away", async () => {
    const user = userEvent.setup();
    service.post.mockRejectedValue({
      response: { status: 401, data: { errorMessage: "Credenciales incorrectas", errorField: "password" } },
    });

    render(
      <AuthContext.Provider value={{ authenticateUser: vi.fn() }}>
        <MemoryRouter initialEntries={["/"]}>
          <LoginForm />
          <Routes>
            <Route path="*" element={<LocationProbe />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await user.type(screen.getByLabelText(/correo electronico o nombre/i), "lucia_vol");
    await user.type(screen.getByLabelText(/contraseña/i), "wrong");
    await user.click(screen.getByRole("button", { name: /accede/i }));

    expect(await screen.findAllByText(/credenciales incorrectas/i)).not.toHaveLength(0);
    expect(localStorage.getItem("authToken")).toBeNull();
    expect(screen.getByTestId("location")).toHaveTextContent(/^\/$/);
  });
});
