<script>
  import "../app.css";
  let { children } = $props();
</script>

<svelte:head>
    <title>Snake</title>
</svelte:head>

{@render children()}