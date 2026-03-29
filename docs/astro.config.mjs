// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://hivespec.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: 'HiveSpec',
      disable404Route: true,
      description: 'Spec-driven delivery lifecycle for AI agent swarms. Claim → Explore → Design → Plan → Implement → Verify → Ship.',
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/EntityProcess/hivespec' },
      ],
      sidebar: [
        {
          label: 'Docs',
          items: [
            { label: 'Introduction', link: '/docs/' },
            { label: 'Quick Start', link: '/docs/quick-start/' },
          ],
        },
        {
          label: 'Phases',
          autogenerate: { directory: 'docs/phases' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'docs/reference' },
        },
      ],
    }),
  ],
});
