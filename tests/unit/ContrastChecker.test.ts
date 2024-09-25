import { render, cleanup } from "@testing-library/svelte";
import ContrastChecker from "../../src/lib/components/ContrastChecker.svelte";
import { describe, it, expect, afterEach } from "vitest";

describe("ContrastChecker Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly with given colors and criteria", () => {
    const { container } = render(ContrastChecker, {
      bg: "#000000",
      fg: "#FFFFFF",
      criteria: "AAA",
    });

    const contrastElement = container.querySelector(
      ".color-card-main",
    ) as HTMLElement;
    expect(contrastElement).not.toBeNull();
    expect(contrastElement.textContent?.trim()).toBe("21.00");
    expect(
      contrastElement.closest(".color-card")?.classList.contains("success"),
    ).toBe(true);
  });

  it("applies correct classes based on contrast ratio", () => {
    const { container, rerender } = render(ContrastChecker, {
      bg: "#FF0000",
      fg: "#00FF00",
      criteria: "AAA",
    });

    let contrastElement = container.querySelector(
      ".color-card-main",
    ) as HTMLElement;
    expect(contrastElement).not.toBeNull();
    expect(contrastElement.textContent?.trim()).toBe("2.91");
    expect(
      contrastElement.closest(".color-card")?.classList.contains("error"),
    ).toBe(true);
  });
});
