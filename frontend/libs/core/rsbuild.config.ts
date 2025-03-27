import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { dependencies } from "./package.json";

export default defineConfig({
	server: {
		port: 3002,
	},
	moduleFederation: {
		options: {
			name: "core",
			exposes: {
				// // GENERICS
				"./Placeholder": "./src/components/Generics/Placeholder",
				"./InputLabel": "./src/components/Generics/InputLabel",
				// // MEDIA
				"./Logo": "./src/components/Media/Logo",
				// LAYOUT
				"./Header": "./src/layout/Header",
				// UTILS
				"./sum": "./src/utils/sum",
				// REQUESTS
				"./fetchExample": "./src/requests/fetch-example",
				// CONTEXTS
				"./GlobalContext": "./src/contexts/GlobalContext",
				"./RouterContext": "./src/contexts/RouterContext",
				// CONSTANTS
				"./endpoints": "./src/constants/endpoints",
				// ENUMS
				"./RoutePaths": "./src/enums/route-paths",
			},
			remotes: {
				dashboard: 'dashboard@http://localhost:3003/remoteEntry.js',
				login: 'login@http://localhost:3004/remoteEntry.js',
				register: 'register@http://localhost:3006/remoteEntry.js',
				decks: 'decks@http://localhost:3007/remoteEntry.js',
				notFound: 'notFound@http://localhost:3099/remoteEntry.js',
			}, // COULD NOT HAVE ANY REMOTE
			filename: "remoteEntry.js",
			shared: {
				...dependencies,
				"react": { singleton: true, requiredVersion: dependencies["react"] },
				"react-dom": { singleton: true, requiredVersion: dependencies["react-dom"] },
			},
		},
	},
	plugins: [pluginReact()],
});
