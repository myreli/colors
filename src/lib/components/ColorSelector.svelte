<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { scale } from "svelte/transition";

    export let key: string;
    export let color_hex: string;
    const dispatch = createEventDispatcher();

    function handleRemove(): void {
        dispatch("remove");
    }
</script>

<fieldset class="color-card" in:scale={{ duration: 200 }}>
    <label for="color-hex-{key}" class="visually-hidden">Hex Color</label>
    <input
        id="color-hex-{key}"
        class="color-card-header"
        type="text"
        bind:value={color_hex}
        pattern="^#[0-9A-Fa-f]{6}$"
        title="Please enter a valid hex color code (e.g., #FA8982)"
        aria-label="Hex color code"
    />
    <label for="color-picker-{key}" class="visually-hidden">Color Picker</label>
    <input
        id="color-picker-{key}"
        class="color-card-main"
        type="color"
        name="color"
        bind:value={color_hex}
        aria-label="Color picker"
    />
    <button
        class="color-card-footer"
        on:click={handleRemove}
        aria-label={`Remove selected color ${key}`}
    >
        Remove
    </button>
</fieldset>

<style>
    :root {
        --border-radius: 8px;
        --padding-small: 0.25rem;
        --padding-medium: 1rem;
        --margin-small: 0.5rem;
        --font-size-small: 0.75rem;
        --font-size-medium: 1rem;
        --width-max-content: max-content;
    }

    .color-card {
        border-radius: var(--border-radius);
        padding: var(--padding-medium);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: var(--width-max-content);
        margin: 0 auto;
        position: relative;
    }

    .color-card-header {
        margin-bottom: var(--margin-small);
        font-weight: bold;
        text-align: center;
        padding: var(--padding-small);
        width: 80px;
        text-transform: uppercase;
    }

    .color-card-main {
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
    }

    .color-card-main::-webkit-color-swatch-wrapper {
        padding: 0;
        border-radius: var(--border-radius);
    }

    .color-card-main::-webkit-color-swatch {
        border: none;
        border-radius: var(--border-radius);
    }

    .color-card-main::-moz-color-swatch {
        border: none;
        border-radius: var(--border-radius);
    }

    .color-card-footer {
        padding: var(--padding-small);
        margin-top: var(--margin-small);
        font-size: var(--font-size-small);
    }
</style>
