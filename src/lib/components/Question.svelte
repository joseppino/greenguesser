<script lang="ts">
  //@ts-ignore
  import AutoComplete from "simple-svelte-autocomplete";
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";

  export let questionData: any;
  export let optionSet: any[];
  export let mode: string = "Normal";
  export let currentQuestionIndex: number = 0;
  export let correctQs: any[] = [];
  export let incorrectQs: any[] = [];
  export let skippedQs: any[] = [];

  const basePath = "https://nuyavgdfgnfsizjcvrds.supabase.co/storage/v1/object/public";
  
  let options: any[];
  let selectedOption: any;
  let guessClicksCount: number = 0;
  $: if(guessClicksCount === 1) {
    // trigger guess and change button text
    if(handleGuess()) {
      btnGuess.innerText = "Next";
      btnSkip.disabled = true;
    } else {
      guessClicksCount -= 1;
      toast.
    }
  } else if(guessClicksCount > 1) {
    // move on to next question
    currentQuestionIndex += 1;
    resetQuestion();
  }

  let btnGuess: HTMLButtonElement;
  let btnSkip: HTMLButtonElement;

  onMount(() => options = loadOptions());

  function loadOptions() {
    let tempOptions = [];
    if(mode === "Normal") {
      for(const plant of optionSet) {
        tempOptions.push(plant.common_name);
      }
    } else {
      for(const plant of optionSet) {
        tempOptions.push(plant.latin_name);
      }
    }
    return tempOptions;
  }

  function handleGuess() {
    // check an option was selected
    if(selectedOption) {
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
  <p><i>{questionData.latin_name}</i></p>
{/if}
<AutoComplete items={options} bind:selectedItem={selectedOption} hideArrow />

<div class="buttons">
  <button type="button" class="pure-button"
    bind:this={btnGuess}
    on:click={() => guessClicksCount += 1}
    >Guess</button>
    <button type="button" class="pure-button"
      bind:this={btnSkip}
      on:click={() => {
        skippedQs.push(questionData);
        currentQuestionIndex += 1;
        resetQuestion();
      }}
    >
    Skip</button>
</div>