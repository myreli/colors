import { render, fireEvent, cleanup } from "@testing-library/svelte";
import ForegroundSection from "../../src/lib/ForegroundSection.svelte";
import { describe, it, expect, afterEach } from "vitest";
import { writable } from "svelte/store";

describe("ForegroundSection Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly with initial colors", () => {
    const initialColors = writable(["#2E5090", "#4A412B"]);
    const { getAllByRole } = render(ForegroundSection, {
      foregroundColors: initialColors,
    });

    const colorInputs = getAllByRole("textbox");
    expect(colorInputs.length).toBe(2);
    expect(colorInputs[0].value).toBe("#2E5090");
    expect(colorInputs[1].value).toBe("#4A412B");
  });

  it("adds a new color when the add button is clicked", async () => {
    const initialColors = writable(["#2E5090", "#4A412B"]);
    const { getAllByRole, getByText } = render(ForegroundSection, {
      foregroundColors: initialColors,
    });

    const addButton = getByText("+");
    await fireEvent.click(addButton);

    const colorInputs = getAllByRole("textbox");
    expect(colorInputs.length).toBe(3);
    expect(colorInputs[2].value).toBe("#000000");
  });

  it("removes a color when the remove button is clicked", async () => {
    const initialColors = writable(["#2E5090", "#4A412B"]);
    const { getAllByRole, getAllByLabelText } = render(ForegroundSection, {
      foregroundColors: initialColors,
    });

    const removeButtons = getAllByLabelText("Remove selected color fg-1");
    await fireEvent.click(removeButtons[0]);

    const colorInputs = getAllByRole("textbox");
    expect(colorInputs.length).toBe(1);
    expect(colorInputs[0].value).toBe("#4A412B");
  });
});
