import { render, fireEvent } from "@testing-library/svelte";
import ColorSelector from "../../src/lib/components/ColorSelector.svelte";
import { describe, it, expect, vi } from "vitest";

describe("ColorSelector Component", () => {
  it("renders correctly with initial color", () => {
    const { getByLabelText } = render(ColorSelector, {
      key: "1",
      color_hex: "#FF0000",
    });

    const colorInput = getByLabelText("Hex color code") as HTMLInputElement;
    expect(colorInput.value).toBe("#FF0000");
  });

  it("updates color when input changes", async () => {
    const { getByLabelText } = render(ColorSelector, {
      key: "1",
      color_hex: "#FF0000",
    });

    const colorInput = getByLabelText("Hex color code") as HTMLInputElement;
    await fireEvent.input(colorInput, { target: { value: "#00FF00" } });

    expect(colorInput.value).toBe("#00FF00");
  });

  it("dispatches remove event on button click", async () => {
    const { getByRole, component } = render(ColorSelector, {
      key: "1",
      color_hex: "#FF0000",
    });

    const removeButton = getByRole("button", {
      name: "Remove selected color 1",
    });
    const removeHandler = vi.fn();
    component.$on("remove", removeHandler);

    await fireEvent.click(removeButton);

    expect(removeHandler).toHaveBeenCalled();
  });
});
