<script lang="ts">
  import Menu from "$lib/components/Menu.svelte";
import "../global.css";
  import "purecss";
</script>

<Menu />
<main>
  <slot />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 700px;
    max-width: 100vw;
    height: 100vh;
    min-height: 600px;
    background-color: var(--colour5);
    box-shadow: 5px 5px 5px var(--colour4);
  }
</style>