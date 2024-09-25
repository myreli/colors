<script lang="ts">
    import { fly } from "svelte/transition";

    export let message: string;
    export let visible: boolean;
</script>

{#if visible}
    <div
        class="toast"
        role="alert"
        aria-live="assertive"
        in:fly={{ y: -20, duration: 300 }}
        out:fly={{ y: -20, duration: 300 }}
    >
        {message}
    </div>
{/if}

<style>
    :root {
        --padding-small: 0.5rem 1rem;
        --border-radius-small: 4px;
        --z-index-toast: 1000;
        --toast-top: 1rem;
        --toast-right: 1rem;
    }

    .toast {
        position: fixed;
        top: var(--toast-top);
        right: var(--toast-right);
        background-color: var(--success-color);
        color: var(--foreground-color);
        font-weight: bolder;
        padding: var(--padding-small);
        border-radius: var(--border-radius-small);
        z-index: var(--z-index-toast);
    }
</style>
