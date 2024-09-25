<script lang="ts">
    import { onMount } from "svelte";
    import BackgroundSection from "./lib/BackgroundSection.svelte";
    import ForegroundSection from "./lib/ForegroundSection.svelte";
    import ContrastSection from "./lib/ContrastSection.svelte";
    import Notification from "./lib/components/Notification.svelte";
    import { writable } from "svelte/store";
    import { copyToClipboard, parseUrlParams } from "./lib/share";

    const backgroundColors = writable<string[]>(["#000000", "#FFFFFF"]);
    const foregroundColors = writable<string[]>(["#2E5090", "#4A412B"]);
    let criteria = writable<string>("AAA");
    let showToast = writable<boolean>(false);

    onMount(() => {
        parseUrlParams(backgroundColors, foregroundColors, criteria);
    });

    function handleShare(): void {
        copyToClipboard(
            backgroundColors,
            foregroundColors,
            $criteria,
            showToast,
        );
    }
</script>

<header>
    <nav>
        ↩ Return to <a href="https://myreli.dev" target="_blank">Myreli</a>
    </nav>

    <h1>Color Contrast Checker</h1>
    <p>
        Easily verify the color contrast ratios for multiple background and
        foreground colors to ensure compliance with <a
            href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast#related_wcag_success_criteria"
            target="_blank">WCAG</a
        >.
    </p>
</header>

<main>
    <BackgroundSection {backgroundColors} />
    <ForegroundSection {foregroundColors} />
    <ContrastSection
        {backgroundColors}
        {foregroundColors}
        {criteria}
        on:share={handleShare}
    />
</main>

<footer>
    Built with ♥ by <a href="https://myreli.dev" target="_blank">Myreli</a>
    using Vite + Svelte. Inspired by
    <a href="https://multiple-contrast-checker.netlify.app/" target="_blank"
        >multiple contrast checker</a
    >.
</footer>

<Notification message="Copied to clipboard" visible={$showToast} />

<style>
    nav {
        border-bottom: 1px solid var(--accent-color);
        padding: var(--padding-medium);
    }

    footer {
        margin-top: var(--margin-medium);
        border-top: 1px solid var(--accent-color);
        padding: var(--padding-medium);
    }
</style>
