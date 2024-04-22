import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      strict: false,
    }),
    output: {
      dir: "public",
    },
  },
  preprocess: vitePreprocess(),
};

export default config;
