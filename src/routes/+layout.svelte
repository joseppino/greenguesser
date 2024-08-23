<script lang="ts">
  import { navigating } from "$app/stores";
  import Menu from "$lib/components/Menu.svelte";
  import { onMount } from "svelte";
  import "../global.css";
  import "purecss";


  // this is a hacky way of getting the cursor to indicate loading
  // when navigating between pages and waiting for page load
  let wrapper: HTMLDivElement;
  
  $: if($navigating) {
   if(wrapper) wrapper.style.cursor = "wait";
  } else {
    if(wrapper) wrapper.style.cursor = "default";
  }
</script>

<div class="wrapper"
bind:this={wrapper}>
  <Menu />
  <main>
    <slot />
  </main>
</div>

<style>
  .wrapper {
    display: contents;
  }

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