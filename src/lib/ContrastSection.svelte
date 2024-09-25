<script lang="ts">
    import ContrastChecker from "./components/ContrastChecker.svelte";
    import type { Writable } from "svelte/store";
    import { createEventDispatcher } from "svelte";

    export let backgroundColors: Writable<string[]>;
    export let foregroundColors: Writable<string[]>;
    export let criteria: Writable<string>;

    const dispatch = createEventDispatcher();

    function handleShare(): void {
        dispatch("share");
    }
</script>

<section>
    <h2>
        Contrast
        <button on:click={handleShare} aria-label="Share results">
            Share
        </button>
        <label for="criteria" class="visually-hidden"
            >Select contrast criteria:</label
        >
        <select bind:value={$criteria} id="criteria">
            <option value="AA">Minimum contrast (WCAG AA)</option>
            <option value="AAA">Enhanced contrast (WCAG AAA)</option>
        </select>
    </h2>
    <table>
        <thead>
            <tr>
                <th scope="col"></th>
                {#each $foregroundColors as fg}
                    <th scope="col">{fg}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each $backgroundColors as bg}
                <tr>
                    <th scope="row">{bg}</th>
                    {#each $foregroundColors as fg}
                        <td>
                            <ContrastChecker {bg} {fg} criteria={$criteria} />
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</section>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: var(--margin-medium);
    }

    th,
    td {
        border: var(--border-width) solid var(--accent-color);
        padding: var(--padding-medium);
        text-align: center;
    }
</style>
