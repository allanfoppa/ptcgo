import { defineConfig } from '@rsbuild/core';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import { pluginReact } from '@rsbuild/plugin-react';
import { dependencies } from './package.json';

export default defineConfig({
  server: {
    port: 3004,
  },
  moduleFederation: {
    options: {
      name: 'login',
      exposes: {
        // MUST HAVE ONLY ONE EXPOSED COMPONENT IN THIS CASE
        // LOGIN VIEW
        './Login': './src/App',
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
  tools: {
    rspack: {
      plugins: [
        process.env.RSDOCTOR === 'true' &&
          new RsdoctorRspackPlugin({
            mode: 'normal',
          }),
      ],
    },
  },
  plugins: [pluginReact()],
});
