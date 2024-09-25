import { describe, it, expect } from "vitest";
import { ratio } from "../../src/lib/color_wcag";

describe("Color WCAG Utilities", () => {
  it("calculateContrastRatio should calculate correct contrast ratio", () => {
    expect(ratio("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
    expect(ratio("#FFFFFF", "#000000")).toBeCloseTo(21, 1);
    expect(ratio("#FF0000", "#00FF00")).toBeCloseTo(2.91, 1);
  });
});
