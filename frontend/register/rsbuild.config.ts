import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { dependencies } from './package.json';
import { pluginRegister } from './rsbuild.plugin';

export default defineConfig({
  server: {
    port: 3006,
  },
  moduleFederation: {
    options: {
      name: 'register',
      exposes: {
        // MUST HAVE ONLY ONE EXPOSED COMPONENT IN THIS CASE
        // REGISTER VIEW
        './Register': './src/Register',
      },
      remotes: {
        // COULD HAVE MANY REMOTES HAS YOU NEED
        core: 'core@http://localhost:3002/remoteEntry.js',
      },
      filename: 'remoteEntry.js',
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
    },
  },
  plugins: [
    pluginReact(),
    pluginRegister({ message: 'Hello from register!' }),
  ],
});

