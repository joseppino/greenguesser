<script lang="ts">
  import GameSummary from "$lib/components/GameSummary.svelte";
  import Question from "$lib/components/Question.svelte";
  import shuffleArray from "$lib/shuffleArray";

  export let data;

  let questionSet: any[] = [];
  let currentQuestionIndex = 0;

  let mode: string = "Normal";
  let gameStarted: boolean = false;
  let gameOver: boolean = false;
  let numQuestionsString = "10";
  $: numQuestions =  Number(numQuestionsString)

  let correctQs: any[] = [];
  let incorrectQs: any[] = [];
  let skippedQs: any[] = [];

  let btnSurrender: HTMLButtonElement;
  let surrenderClicks: number = 0;

  $: if(surrenderClicks === 1 && !gameOver) {
      btnSurrender.innerText = "Sure?";
      // give 2 seconds to confirm
      setTimeout(() => {
        if(!gameOver) {
          btnSurrender.innerText = "Give Up";
          surrenderClicks = 0;
        }
      }, 2000);
  } else if(surrenderClicks === 2 && !gameOver) {

      // hacky way to work out the remaining number of questions and "skip" them
      for(let i=currentQuestionIndex; i < numQuestions; i++) {
        skippedQs.push([]);
      }
      endGame();
  
  }

  $: if(gameStarted) {
    questionSet = generateQuestionSet();
  }

  $: if(currentQuestionIndex >= numQuestions) {
    endGame();
  }

  function generateQuestionSet() {
    const shuffledDataset = shuffleArray(data.dataset);
    return shuffledDataset.slice(numQuestions);
  }

  function endGame() {
    gameStarted = false;
    gameOver = true;
  }
</script>

<h2>{data.title}</h2>
{#if !gameStarted && !gameOver}
  <form class="pure-form pure-form-stacked">
    <fieldset>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <label for="checkbox-radio-option-two" class="pure-radio"
      on:click={() => mode = "Normal"}>
        <input bind:group={mode} type="radio" id="checkbox-radio-option-one" name="optionsRadios" value="Normal" /> Normal Mode
      </label>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <label for="checkbox-radio-option-three" class="pure-radio"
      on:click={() => mode = "Expert"}>
        <input bind:group={mode} type="radio" id="checkbox-radio-option-one" name="optionsRadios" value="Expert" /> Expert Mode
      </label>
      <label for="stacked-qnum"># Questions</label>
        <select bind:value={numQuestionsString} id="stacked-qnum">
            <option>5</option>
            <option>10</option>
            <option>20</option>
        </select>
      <button type="button" class="pure-button"
      on:click={() => gameStarted = true}
      >Start</button>
    </fieldset>
  </form>
{:else if gameStarted}
  {#if questionSet.length > 0}
    <p class="question-counter">
      Question {currentQuestionIndex+1}/{numQuestions}
    </p>
    <Question
      questionData={questionSet[currentQuestionIndex]}
      dataset={data.dataset}
      optionSet={questionSet}
      bind:currentQuestionIndex={currentQuestionIndex}
      bind:correctQs={correctQs}
      bind:incorrectQs={incorrectQs}
      bind:skippedQs={skippedQs}
      {mode}
    />
    <div class="surrenderBtn-wrapper">
      <button type="button" class="pure-button button-warning"
      bind:this={btnSurrender}
      on:click={() => surrenderClicks += 1}>
        Give Up
      </button>
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
{/if}
{#if gameOver}
  <GameSummary summaryData={
    {
      numQuestions: numQuestions,
      correctQs: correctQs,
      skippedQs: skippedQs,
    }
  }/>
{/if}

<style>
  fieldset {
    display: flex;
    flex-direction: column;
  }

  label:hover {
    cursor: pointer;
  }

  .button-warning {
    width: 6rem;
  }

  .question-counter {
    margin-top: 1px;
  }

  .surrenderBtn-wrapper {
    margin-top: 2rem;
  }
</style>