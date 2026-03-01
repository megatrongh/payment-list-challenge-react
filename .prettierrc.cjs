/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

module.exports = {
  plugins: ['prettier-plugin-organize-imports'],
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  printWidth: 120,
  trailingComma: 'all',
  bracketSpacing: true,
}
