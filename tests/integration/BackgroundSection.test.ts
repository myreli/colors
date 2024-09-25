import { render, fireEvent, cleanup } from "@testing-library/svelte";
import BackgroundSection from "../../src/lib/BackgroundSection.svelte";
import { describe, it, expect, afterEach } from "vitest";
import { writable } from "svelte/store";

describe("BackgroundSection Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly with initial colors", () => {
    const initialColors = writable(["#000000", "#FFFFFF"]);
    const { getAllByRole } = render(BackgroundSection, {
      backgroundColors: initialColors,
    });

    const colorInputs = getAllByRole("textbox");
    expect(colorInputs.length).toBe(2);
    expect(colorInputs[0].value).toBe("#000000");
    expect(colorInputs[1].value).toBe("#FFFFFF");
  });

  it("adds a new color when the add button is clicked", async () => {
    const initialColors = writable(["#000000", "#FFFFFF"]);
    const { getAllByRole, getByText } = render(BackgroundSection, {
      backgroundColors: initialColors,
    });

    const addButton = getByText("+");
    await fireEvent.click(addButton);

    const colorInputs = getAllByRole("textbox");
    expect(colorInputs.length).toBe(3);
    expect(colorInputs[2].value).toBe("#000000");
  });

  it("removes a color when the remove button is clicked", async () => {
    const initialColors = writable(["#000000", "#FFFFFF"]);
    const { getAllByRole, getAllByLabelText } = render(BackgroundSection, {
      backgroundColors: initialColors,
    });

    const removeButtons = getAllByLabelText("Remove selected color bg-1");
    await fireEvent.click(removeButtons[0]);

    const colorInputs = getAllByRole("textbox");

    expect(colorInputs.length).toBe(1);
    expect(colorInputs[0].value).toBe("#FFFFFF");
  });
});
