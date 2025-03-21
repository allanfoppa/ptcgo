import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { dependencies } from './package.json';

export default defineConfig({
  server: {
    port: 3007,
  },
  moduleFederation: {
    options: {
      name: 'decks',
      exposes: {
        // MUST HAVE ONLY ONE EXPOSED COMPONENT IN THIS CASE
        // DECKS VIEW
        './Decks': './src/Decks.handler',
      },
      remotes: {
        // COULD HAVE MANY REMOTES HAS YOU NEED
        core: 'core@http://localhost:3002/remoteEntry.js',
      },
      filename: 'remoteEntry.js',
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies['react'],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
      },
    },
  },
  plugins: [pluginReact()],
});
