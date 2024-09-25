<script lang="ts">
    import ColorSelector from "./components/ColorSelector.svelte";
    import type { Writable } from "svelte/store";

    export let foregroundColors: Writable<string[]>;

    function removeColor(index: number): void {
        foregroundColors.update((colors) =>
            colors.filter((_, i) => i !== index),
        );
    }
</script>

<section>
    <h2>
        Foreground
        <button
            on:click={() =>
                foregroundColors.update((colors) => [...colors, "#000000"])}
            aria-label="Add foreground color"
        >
            +
        </button>
    </h2>
    <div class="color-grid">
        {#each $foregroundColors as color, index}
            <ColorSelector
                key={`fg-${index + 1}`}
                on:remove={() => removeColor(index)}
                bind:color_hex={$foregroundColors[index]}
            />
        {/each}
    </div>
</section>
