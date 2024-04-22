<script lang="ts">
  let speed: number = $state(5);
  let isSimpleView: boolean = $state(false);

  $effect(() => {
    const gameHeight = document.querySelector('[name="game_height"]') as HTMLInputElement;
    const gameWidth = document.querySelector('[name="game_width"]') as HTMLInputElement;

    if (gameWidth.valueAsNumber * 15 > window.innerWidth - 100) {
      gameWidth.valueAsNumber = Math.floor((window.innerWidth - 100) / 15);
    }
    
    if (gameHeight.valueAsNumber * 15 > window.innerHeight - 100) {
      gameHeight.valueAsNumber = Math.floor((window.innerHeight - 100) / 15);
    }
  })
</script>

{#snippet colorPicker(deafultColor, name)}
  <input type="color" value={deafultColor} class="h-5 w-10" {name} disabled={!isSimpleView}/>
{/snippet}

{#snippet numberInput(deafulValue, name)}
  <input type="number" {name} value={deafulValue} class="bg-slate-700 border border-black mb-1 rounded-md text-white w-10"/> 
{/snippet}

<main class="flex flex-col items-center overflow-hidden">
  <h1 class="font-extrabold font-sans text-7xl">Snake</h1>
  <br />
  <form action="/mainGame">
     <div class="flex items-center space-x-2">
      <span class="whitespace-nowrap">Simple view</span>
      <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input type="checkbox" name="simple_view" bind:checked={isSimpleView} class="hidden" id="simple_view" />
        <label for="simple_view" class="block overflow-hidden h-6 rounded-full cursor-pointer"
          class:bg-blue-500={isSimpleView} class:bg-gray-300={!isSimpleView}>
           <span class="block absolute h-4 w-4 m-1 rounded-full shadow-inner transition-transform duration-200 ease-in"
             class:bg-white={isSimpleView} class:bg-gray-600={!isSimpleView}
             class:translate-x-full={isSimpleView}></span>
        </label>
      </div>
    </div>
    <label for="snake_color">Snake color</label>
    {@render colorPicker('#00ff00', 'snake_color')}
    <br />
    <label for="bg_color">Background color</label>
    {@render colorPicker('#000000', 'bg_color')}
    <br />
    <lable for="food_color">Food color</lable>
    {@render colorPicker('#ff0000', 'food_color')}
    <br />
    <lable for="border_color">Border color</lable>
    {@render colorPicker('#ffffff', 'border_color')}
    <br />
    <label for="speed">Speed (5=normal)</label>
    <input type="range" min="2" max="10" bind:value={speed} name="speed"/>
    <span>({speed})</span>
    <br />
    <label>Game height</label>
    {@render numberInput('30', 'game_height')}
    <br />
    <label>Game width</label>
    {@render numberInput('30', 'game_width')}
    <br />
    <div class="justify-center flex">
      <button type="submit" class="right-0  mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start!</button>
    </div>
  </form>
</main>
