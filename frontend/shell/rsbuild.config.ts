import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { dependencies }  from './package.json';

export default defineConfig({
  server: {
    port: 3001
  },
  moduleFederation: {
    options: {
     name: 'shell',
     exposes: {}, // COULD NOT HAVE ANY EXPOSED COMPONENT
     remotes: {
      // COULD HAVE MANY REMOTES HAS YOU NEED
      core: 'core@http://localhost:3002/remoteEntry.js',
      dashboard: 'dashboard@http://localhost:3003/remoteEntry.js',
      login: 'login@http://localhost:3004/remoteEntry.js',
      register: 'register@http://localhost:3006/remoteEntry.js',
      decks: 'decks@http://localhost:3007/remoteEntry.js',
      notFound: 'notFound@http://localhost:3099/remoteEntry.js',
     },
     shared: {
       ...dependencies,
       "react": {
         singleton: true,
         requiredVersion: dependencies['react'],
       },
       'react-dom': {
         singleton: true,
         requiredVersion: dependencies['react-dom'],
       },
     },
    }
  },
  plugins: [pluginReact()],
});
