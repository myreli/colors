<script lang="ts">
    import { ratio } from "../color_wcag";

    export let criteria: string = "AAA";
    export let bg: string;
    export let fg: string;

    $: contrast = ratio(bg, fg);
    $: pass_small_text = contrast >= (criteria === "AA" ? 4.5 : 7);
    $: pass_large_text = contrast >= (criteria === "AA" ? 3 : 4.5);
</script>

<div
    class="color-card"
    class:success={pass_small_text}
    class:warning={pass_large_text && !pass_small_text}
    class:error={!pass_large_text && !pass_small_text}
    role="status"
    aria-live="polite"
    aria-label={`Contrast ratio: ${contrast.toFixed(2)}`}
>
    <span class="color-card-main" style="background-color: {bg}; color: {fg};">
        {contrast.toFixed(2)}
    </span>
</div>

<style>
    .color-card {
        padding: var(--padding-medium);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: var(--width-max-content);
        margin: 0 auto;
        border: var(--border-width) solid;
    }

    .color-card-main {
        font-weight: bold;
        font-size: 15pt;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .error {
        border-color: var(--error-color);
    }

    .success {
        background-color: var(--success-color);
        border-color: var(--success-color);
    }

    .warning {
        border-color: var(--warning-color);
    }
</style>
