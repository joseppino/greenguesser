<script lang="ts">
  import shuffleArray from "$lib/shuffleArray";

  //@ts-ignore
  import AutoComplete from "simple-svelte-autocomplete";
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";

  export let questionData: any;
  export let dataset: any[];
  export let optionSet: any[];
  export let mode: string = "Normal";
  export let currentQuestionIndex: number = 0;
  export let correctQs: any[] = [];
  export let incorrectQs: any[] = [];
  export let skippedQs: any[] = [];

  const basePath = "https://nuyavgdfgnfsizjcvrds.supabase.co/storage/v1/object/public";
  
  let options: any[];
  let selectedOption: any = [];
  let guessClicksCount: number = 0;
  $: if(guessClicksCount === 1) {
    // trigger guess and change button text
    if(handleGuess()) {
      btnGuess.innerText = "Next";
      btnSkip.disabled = true;
    } else {
      guessClicksCount -= 1;
      toast("Provide a valid guess", { icon: '⚠️'});
    }
  } else if(guessClicksCount > 1) {
    // move on to next question
    resetQuestion();
    currentQuestionIndex += 1;
  }

  let btnGuess: HTMLButtonElement;
  let btnSkip: HTMLButtonElement;

  onMount(() => options = shuffleArray(loadOptions()));

  function loadOptions() {
    let tempOptions = [];
    if(mode === "Normal") {
      for(const plant of dataset) {
        tempOptions.push(plant.common_name);
      }
    } else {
      for(const plant of dataset) {
        tempOptions.push(plant.latin_name);
      }
    }
    return tempOptions;
  }

  function handleGuess() {
    // check an option was selected
    if(selectedOption.length > 0) {
      if(mode === "Normal") {
        if(selectedOption === questionData.common_name) {
          toast.success("Correct!");
          correctQs.push(questionData);
        } else {
          toast.error(questionData.common_name);
          incorrectQs.push(questionData);
        }
      } else {
        if(selectedOption === questionData.latin_name) {
          toast.success("Correct!");
          correctQs.push(questionData);
        } else {
          toast.error(questionData.latin_name);
          incorrectQs.push(questionData);
        }
      }
      return true;
    } else {
      return false;
    }
  }

  function resetQuestion() {
    btnGuess.innerText = "Guess";
    // dunno why but this is the only way to reset the autocomplete's value
    selectedOption = [];
    guessClicksCount = 0;
    btnSkip.disabled = false;
  }

</script>

<Toaster />
<img src={basePath + questionData.image_path} alt="?"/>
{#if mode === "Normal"}
  <p class="photo-caption"><i>{questionData.latin_name}</i></p>
{/if}
<AutoComplete items={options} bind:selectedItem={selectedOption} hideArrow />

<div class="buttons">
  <button type="button" class="pure-button guess-btn"
    bind:this={btnGuess}
    on:click={() => guessClicksCount += 1}
    >Guess</button>
    <button type="button" class="pure-button skip-btn"
      bind:this={btnSkip}
      on:click={() => {
        skippedQs.push(questionData);
        currentQuestionIndex += 1;
        resetQuestion();
      }}
    >
    Skip</button>
</div>

<style>
  img {
    max-height: 360px;
    max-width: 540px;
    margin-bottom: 5px;
  }

  @media screen and (max-width: 450px) {
    img {
      max-width: 99vw;
    }
  }

  .buttons {
    width: 15rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 0.25rem;
  }

  .buttons button {
    width: 6rem;
  }
</style>