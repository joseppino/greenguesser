<script lang="ts">
  export let summaryData;
</script>

<p>You scored</p>
<p>{summaryData.correctQs.length}/{summaryData.numQuestions}</p>
<p>You skipped {summaryData.skippedQs.length} questions.</p>
<button type="button" class="pure-button"
  on:click={() => window.location.reload()} >
  Restart
</button>