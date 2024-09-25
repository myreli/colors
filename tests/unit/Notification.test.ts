import { render, cleanup } from "@testing-library/svelte";
import Notification from "../../src/lib/components/Notification.svelte";
import { describe, it, expect, afterEach } from "vitest";

describe("Notification Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly when visible", () => {
    const { getByRole } = render(Notification, {
      message: "Test message",
      visible: true,
    });

    const notificationElement = getByRole("alert");
    expect(notificationElement).not.toBeNull();
    expect(notificationElement.textContent).to.contain("Test message");
  });

  it("does not render when not visible", () => {
    const { queryByRole } = render(Notification, {
      message: "Test message",
      visible: false,
    });

    const notificationElement = queryByRole("alert");
    expect(notificationElement).to.be.null;
  });
});
