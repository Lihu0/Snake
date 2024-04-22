<script>
  import "../app.css";
  let { children } = $props();
</script>

<svelte:head>
    <title>Snake</title>
</svelte:head>

{@render children()}

<footer class="absolute bottom-0 md:h-14 w-full bg-slate-800 text-white text-center flex justify-center items-center text-2xl font-bold font-heebo">
  המשחק של ליהוא לויט
</footer>
