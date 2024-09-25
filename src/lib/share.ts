import { type Writable } from "svelte/store";

export function generateShareUrl(
  backgroundColors: Writable<string[]>,
  foregroundColors: Writable<string[]>,
  criteria: string,
): string {
  let bgColors: string[];
  let fgColors: string[];

  backgroundColors.subscribe((value) => (bgColors = value))();
  foregroundColors.subscribe((value) => (fgColors = value))();

  const bgColorsEncoded = bgColors.map(encodeURIComponent).join(",");
  const fgColorsEncoded = fgColors.map(encodeURIComponent).join(",");
  const url = new URL(window.location.href);
  url.searchParams.set("bg", bgColorsEncoded);
  url.searchParams.set("fg", fgColorsEncoded);
  url.searchParams.set("criteria", criteria);
  return url.toString();
}

export async function copyToClipboard(
  backgroundColors: Writable<string[]>,
  foregroundColors: Writable<string[]>,
  criteria: string,
  showToast: Writable<boolean>,
): Promise<void> {
  const url = generateShareUrl(backgroundColors, foregroundColors, criteria);
  try {
    await navigator.clipboard.writeText(url);
    showToast.set(true);
    setTimeout(() => showToast.set(false), 3000);
  } catch (err) {
    console.error("Failed to copy URL: ", err);
  }
}

export function parseUrlParams(
  backgroundColors: Writable<string[]>,
  foregroundColors: Writable<string[]>,
  criteria: Writable<string>,
): void {
  try {
    const url = new URL(window.location.href);
    const bgColors = url.searchParams
      .get("bg")
      ?.split(",")
      .map(decodeURIComponent);
    const fgColors = url.searchParams
      .get("fg")
      ?.split(",")
      .map(decodeURIComponent);
    const urlCriteria = url.searchParams.get("criteria");

    if (bgColors) backgroundColors.set(bgColors);
    if (fgColors) foregroundColors.set(fgColors);
    if (urlCriteria) criteria.set(urlCriteria);

    url.searchParams.delete("bg");
    url.searchParams.delete("fg");
    url.searchParams.delete("criteria");
    history.replaceState(null, "", url.toString());
  } catch (error) {
    console.error("Error parsing URL parameters: ", error);
  }
}
