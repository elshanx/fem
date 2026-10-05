import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = [
  globalIgnores(['.next/**', 'src/generated/**', 'next-env.d.ts']),
  { name: 'js/config', ...js.configs.recommended },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  plugins.react,
  plugins.reactA11y,
  plugins.reactHooks,
  plugins.next,
  ...configs.next.recommended,
  plugins.typescriptEslint,
  ...configs.base.typescript,
  ...configs.next.typescript,
  {
    name: 'project/tooling-files',
    files: ['*.config.{mjs,ts}', '**/*.test.ts'],
    rules: {
      // Config and test files run at build/test time, so devDependencies are fine.
      'import-x/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
  {
    name: 'project/tests',
    files: ['**/*.test.ts'],
    rules: {
      // node --test runs TS directly and needs the real file extension in imports.
      'import-x/extensions': ['error', 'ignorePackages', { ts: 'always' }],
    },
  },
  {
    name: 'project/placeholder-links',
    rules: {
      // The design's nav/footer links have no real pages yet; keep them as "#" placeholders.
      'jsx-a11y/anchor-is-valid': ['error', { aspects: ['noHref', 'preferButton'] }],
    },
  },
  // Formatting belongs to Prettier; turn off every rule that would fight it.
  prettier,
];

export default eslintConfig;
