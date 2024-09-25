import { render, fireEvent, cleanup } from "@testing-library/svelte";
import App from "../../src/App.svelte";
import { describe, it, expect, afterEach, vi } from "vitest";

describe("App Component Integration Test", () => {
  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the app correctly", () => {
    const { getByText, getByRole } = render(App);

    expect(getByText("Color Contrast Checker")).not.toBeNull();
    expect(getByRole("button", { name: "Share results" })).not.toBeNull();
  });

  it("allows adding and removing background colors", async () => {
    const { getByText, getAllByLabelText, container } = render(App);

    const addButton = getByText("+", {
      selector: "button[aria-label='Add background color']",
    });
    await fireEvent.click(addButton);

    const bgColorInputs = container.querySelectorAll(
      "[aria-label='Hex color code'][id^='color-hex-bg']",
    );
    expect(bgColorInputs.length).toBeGreaterThan(2);

    let removeButtons = getAllByLabelText(/Remove selected color bg-/);
    await fireEvent.click(removeButtons[0]);

    const bgColorInputsAfter = container.querySelectorAll(
      "[aria-label='Hex color code'][id^='color-hex-bg']",
    );
    expect(bgColorInputsAfter.length).toBe(2);
  });

  it("allows adding and removing foreground colors", async () => {
    const { getByText, getAllByLabelText, container } = render(App);

    const addButton = getByText("+", {
      selector: "button[aria-label='Add foreground color']",
    });
    await fireEvent.click(addButton);

    const fgColorInputs = container.querySelectorAll(
      "[aria-label='Hex color code'][id^='color-hex-fg']",
    );
    expect(fgColorInputs.length).toBeGreaterThan(2);

    let removeButtons = getAllByLabelText(/Remove selected color fg-/);
    await fireEvent.click(removeButtons[0]);

    const fgColorInputsAfter = container.querySelectorAll(
      "[aria-label='Hex color code'][id^='color-hex-fg']",
    );
    expect(fgColorInputsAfter.length).toBe(2);
  });

  it("updates contrast criteria", async () => {
    const { getByLabelText } = render(App);

    const criteriaSelect = getByLabelText("Select contrast criteria:");
    await fireEvent.change(criteriaSelect, { target: { value: "AA" } });

    expect(criteriaSelect.value).toBe("AA");
  });

  it("displays notification when link is copied to clipboard", async () => {
    const { getByText, queryByText } = render(App);

    const shareButton = getByText("Share");
    await fireEvent.click(shareButton);

    expect(queryByText("Copied to clipboard")).not.toBeNull();
  });
});
