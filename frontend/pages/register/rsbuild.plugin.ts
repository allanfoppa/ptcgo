import type { RsbuildPlugin } from '@rsbuild/core';

export type PluginOptions = {
  message?: string;
};

export const pluginRegister = (options: PluginOptions = {}): RsbuildPlugin => ({
  name: 'plugin-register',

  setup(api) {
    api.onBeforeStartDevServer(({ server }) => {
      console.log('the server is runnig in port:', server.port);
    });
    api.onAfterStartDevServer(() => {
      const msg = options.message || 'hello!';
      console.log(msg);
    });
  },
});
