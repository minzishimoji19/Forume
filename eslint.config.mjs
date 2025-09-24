// eslint.config.mjs
import pluginImport from 'eslint-plugin-import';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  // Bỏ qua thư mục build
  {
    ignores: ['dist/**', 'build/**', 'coverage/**', 'node_modules/**'],
  },

  // Quy tắc cho JS
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node, ...globals.es2021 },
    },
    plugins: { import: pluginImport },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'import/order': ['warn', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
    },
  },

  // Bật Prettier như rule và vô hiệu xung đột
  pluginPrettierRecommended,

  // Tắt import/order riêng cho file cấu hình này để khỏi cảnh báo
  {
    files: ['eslint.config.*'],
    rules: { 'import/order': 'off' },
  },
];
