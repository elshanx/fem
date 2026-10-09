import { fixupConfigRules } from '@eslint/compat';
import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = [
  globalIgnores(['dist/**']),
  { name: 'js/config', ...js.configs.recommended },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  plugins.react,
  plugins.reactA11y,
  plugins.reactHooks,
  ...configs.react.recommended,
  plugins.typescriptEslint,
  ...configs.base.typescript,
  ...configs.react.typescript,
  {
    name: 'project/tooling-files',
    files: ['*.config.{mjs,ts}', '**/*.test.ts', 'scripts/**'],
    rules: {
      'import-x/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
  {
    name: 'project/explicit-extensions',
    rules: {
      'import-x/extensions': ['error', 'ignorePackages', { ts: 'always', tsx: 'always' }],
    },
  },
  {
    name: 'project/typescript-components',
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/require-default-props': ['error', { functions: 'defaultArguments' }],
    },
  },
  prettier,
];

export default fixupConfigRules(eslintConfig);
