import { describe, it, expect } from "vitest";
import validateField from "@utils/validateField";

const emptyState = { value: "", error: null, hasUserInteracted: false };

describe("validateField", () => {
  it("sets error for empty required field", () => {
    const result = validateField("", emptyState, true);

    expect(result.error).toBe("Campo obligatorio");
    expect(result.value).toBe("");
    expect(result.hasUserInteracted).toBe(true);
  });

  it("clears error for valid required field", () => {
    const result = validateField("hello", emptyState, true);

    expect(result.error).toBeNull();
    expect(result.value).toBe("hello");
  });

  it("sets custom error when regex fails", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const result = validateField(
      "not-email",
      emptyState,
      true,
      emailRegex,
      "Formato incorrecto"
    );

    expect(result.error).toBe("Formato incorrecto");
  });

  it("clears error when regex passes", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const result = validateField(
      "test@example.com",
      emptyState,
      true,
      emailRegex,
      "Formato incorrecto"
    );

    expect(result.error).toBeNull();
  });

  it("marks hasUserInteracted on first call", () => {
    const result = validateField("x", emptyState, false);

    expect(result.hasUserInteracted).toBe(true);
  });

  it("does not reset hasUserInteracted if already true", () => {
    const interactedState = { ...emptyState, hasUserInteracted: true };
    const result = validateField("", interactedState, true);

    expect(result.hasUserInteracted).toBe(true);
  });

  it("does not mutate the original state", () => {
    const original = { ...emptyState };
    validateField("test", original, true);

    expect(original.hasUserInteracted).toBe(false);
    expect(original.value).toBe("");
  });
});