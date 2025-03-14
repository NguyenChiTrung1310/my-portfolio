import {FlatCompat} from '@eslint/eslintrc'
import {dirname} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/core-web-vitals', 'plugin:prettier/recommended', 'plugin:jsx-a11y/recommended'],
    plugins: ['@typescript-eslint', 'prettier', 'jsx-a11y', 'simple-import-sort'],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'react/react-in-jsx-scope': 'off',
      'no-unsafe-optional-chaining': 'off',
      'prettier/prettier': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'no-prototype-builtins': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      // "react-hooks/exhaustive-deps": "off",
      'no-empty': 'off',
      'react/prop-types': 'off',
      semi: ['error', 'never'],
      quotes: [1, 'single'],
      'jsx-quotes': [1, 'prefer-single'],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'arrow-parens': [0],
      'jsx-a11y/anchor-is-valid': 'off',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
  }),
]

export default eslintConfig
