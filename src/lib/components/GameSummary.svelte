<script lang="ts">
  export let summaryData;
</script>

<p>You scored</p>
<p>{summaryData.correctQs.length}/{summaryData.numQuestions}</p>
{#if summaryData.skippedQs.length > 0}
  <p>You skipped {summaryData.skippedQs.length} questions.</p>
{/if}
<button type="button" class="pure-button"
  on:click={() => window.location.reload()} >
  Restart
</button>