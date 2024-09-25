<script lang="ts">
    import ColorSelector from "./components/ColorSelector.svelte";
    import type { Writable } from "svelte/store";

    export let backgroundColors: Writable<string[]>;

    function removeColor(index: number): void {
        backgroundColors.update((colors) =>
            colors.filter((_, i) => i !== index),
        );
    }
</script>

<section>
    <h2>
        Background
        <button
            on:click={() =>
                backgroundColors.update((colors) => [...colors, "#000000"])}
            aria-label="Add background color"
        >
            +
        </button>
    </h2>
    <div class="color-grid">
        {#each $backgroundColors as color, index}
            <ColorSelector
                key={`bg-${index + 1}`}
                on:remove={() => removeColor(index)}
                bind:color_hex={$backgroundColors[index]}
            />
        {/each}
    </div>
</section>
