// @ts-check
import {defineConfig} from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";
import {remarkAutolinkBareUrls} from "./src/remark-plugins/remark-autolink-bare-urls.mjs";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [mdx()],

    markdown: {
        remarkPlugins: [
            // chat.com > [chat.com](https://chat.com)
            // @kandinsky21_bot > [@kandinsky21_bot](https://t.me/kandinsky21_bot)
            remarkAutolinkBareUrls,
        ],
    },
});