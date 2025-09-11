import { defineConfig } from 'tsup';

export default defineConfig([
  // ESM and CJS builds for Node.js/bundlers (axios as external)
  {
    entry: ['src/index.ts'],
    dts: true,
    format: ['esm', 'cjs'],
    minify: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    target: 'es2018',
    external: ['axios', 'react'],
    platform: 'neutral',
  },
  // React-specific builds
  {
    entry: ['src/react/index.ts'],
    dts: true,
    format: ['esm', 'cjs'],
    minify: true,
    sourcemap: true,
    treeshake: true,
    target: 'es2018',
    external: ['axios', 'react'],
    platform: 'neutral',
    outDir: 'dist/react',
  },
  // Browser IIFE build (axios bundled for standalone use)
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    globalName: 'YouTubeLinkUtils',
    minify: true,
    sourcemap: true,
    treeshake: true,
    target: 'es2018',
    platform: 'browser',
    outDir: 'dist',
    external: ['react'],
    outExtension() {
      return {
        js: '.browser.js',
      };
    },
  },
]);
