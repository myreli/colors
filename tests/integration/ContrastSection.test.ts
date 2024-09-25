import { render, fireEvent, cleanup } from "@testing-library/svelte";
import ContrastSection from "../../src/lib/ContrastSection.svelte";
import { describe, it, expect, afterEach, vi } from "vitest";
import { writable } from "svelte/store";

describe("ContrastSection Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly with initial colors and criteria", () => {
    const backgroundColors = writable(["#000000", "#FFFFFF"]);
    const foregroundColors = writable(["#2E5090", "#4A412B"]);
    const criteria = writable("AAA");

    const { getByLabelText, getAllByRole, getAllByText } = render(
      ContrastSection,
      {
        backgroundColors,
        foregroundColors,
        criteria,
      },
    );

    const criteriaSelect = getByLabelText("Select contrast criteria:");
    expect(criteriaSelect.value).toBe("AAA");

    const bgColorHeaders = getAllByText("#000000");
    const fgColorHeaders = getAllByText("#2E5090");
    expect(bgColorHeaders.length).toBe(1);
    expect(fgColorHeaders.length).toBe(1);
  });

  it("updates criteria when select changes", async () => {
    const backgroundColors = writable(["#000000", "#FFFFFF"]);
    const foregroundColors = writable(["#2E5090", "#4A412B"]);
    const criteria = writable("AAA");

    const { getByLabelText } = render(ContrastSection, {
      backgroundColors,
      foregroundColors,
      criteria,
    });

    const criteriaSelect = getByLabelText("Select contrast criteria:");
    await fireEvent.change(criteriaSelect, { target: { value: "AA" } });

    expect(criteriaSelect.value).toBe("AA");
  });

  it("dispatches share event when share button is clicked", async () => {
    const backgroundColors = writable(["#000000", "#FFFFFF"]);
    const foregroundColors = writable(["#2E5090", "#4A412B"]);
    const criteria = writable("AAA");

    const handleShare = vi.fn();

    const { getByText, component } = render(ContrastSection, {
      backgroundColors,
      foregroundColors,
      criteria,
    });

    component.$on("share", handleShare);

    const shareButton = getByText("Share");
    await fireEvent.click(shareButton);

    expect(handleShare).toHaveBeenCalled();
  });
});
