const path = require("path")

const baseRules = {
  // prettier
  "prettier/prettier": "error",
  "no-extra-semi": "off",
  "no-empty": "off",

  // related to the "unused-imports" plugin
  "no-unused-vars": "off",
  "unused-imports/no-unused-imports": "error",
  "unused-imports/no-unused-vars": [
    "error",
    {
      vars: "all",
      varsIgnorePattern: "^_",
      args: "after-used",
      argsIgnorePattern: "^_",
    },
  ],

  // related to import sorting and ordering
  "sort-imports": "off",
  "import/order": "off",
  "no-multi-spaces": "error",
  "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
  "simple-import-sort/imports": [
    "error",
    {
      groups: [
        ["^([^s.]|s($|[^r])|s($|[^r]$|r[^c])|sr($|c[^/]))"],
        ["^src"],
        ["."],
      ],
    },
  ],
  "import/first": "error",
  "import/newline-after-import": "error",
  "import/no-duplicates": ["error", { considerQueryString: true }],
  "no-restricted-imports": ["error", { patterns: ["**/../**", ".."] }],

  // sonarjs
  "sonarjs/no-all-duplicated-branches": "error",
  "sonarjs/no-element-overwrite": "error",
  "sonarjs/no-empty-collection": "error",
  "sonarjs/no-extra-arguments": "error",
  "sonarjs/no-identical-conditions": "error",
  "sonarjs/no-identical-expressions": "error",
  "sonarjs/no-ignored-return": "error",
  "sonarjs/no-use-of-empty-return-value": "error",
  "sonarjs/no-collapsible-if": "error",
  "sonarjs/non-existent-operator": "error",
  "sonarjs/no-collection-size-mischeck": "error",
  "sonarjs/no-duplicate-string": "error",
  "sonarjs/no-gratuitous-expressions": "error",
  "sonarjs/no-duplicated-branches": "error",
  "sonarjs/no-redundant-boolean": "error",
  "sonarjs/no-redundant-jump": "error",
  "sonarjs/no-unused-collection": "error",
  "sonarjs/prefer-immediate-return": "error",

  // misc
  "no-unreachable-loop": "error",
  "multiline-comment-style": ["error", "bare-block"],
  "no-constant-condition": ["error", { checkLoops: false }],
  "require-atomic-updates": "off",
  "use-isnan": "error",
  "no-restricted-syntax": [
    "error",
    ':not(MethodDefinition, AssignmentExpression[left.type="MemberExpression"], VariableDeclarator[init.generator=true]) > FunctionExpression',
    {
      selector: "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
      message: "setTimeout must always be invoked with two arguments.",
    },
    {
      selector:
        "CallExpression[callee.name='setInterval'][arguments.length!=2]",
      message: "setInterval must always be invoked with two arguments.",
    },
    {
      selector:
        "CallExpression[arguments.length=1] > MemberExpression.callee > Identifier.property[name='reduce']",
      message: "Provide initialValue to .reduce().",
    },
  ],
  "prefer-arrow-callback": "error",
  "constructor-super": "error",
  "no-invalid-this": "error",
  "spaced-comment": "error",
  "dot-notation": "error",
  "no-redeclare": "error",
  "arrow-parens": "error",
  "arrow-body-style": ["error", "always"],
  "prefer-const": "error",
}

const js = require("@eslint/js")
const prettierConfig = require("eslint-config-prettier")
const prettierPlugin = require("eslint-plugin-prettier")
const sonarjsPlugin = require("eslint-plugin-sonarjs")
const unusedImportsPlugin = require("eslint-plugin-unused-imports")
const simpleImportSortPlugin = require("eslint-plugin-simple-import-sort")
const importPlugin = require("eslint-plugin-import")

const basePlugins = {
  prettier: prettierPlugin,
  sonarjs: sonarjsPlugin,
  "unused-imports": unusedImportsPlugin,
  "simple-import-sort": simpleImportSortPlugin,
  import: importPlugin,
}

const getEslintTypescriptConfiguration = ({ rootDir }) => {
  const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin")
  const typescriptParser = require("@typescript-eslint/parser")

  const typescriptRules = {
    "no-undef": "off", // this rule is already checked by TypeScript itself
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowString: true,
        allowNullableBoolean: true,
        allowNumber: true,
        allowNullableNumber: true,
        allowNullableString: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": "off", // related to the "unused-imports" plugin
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/await-thenable": "error",
    "no-return-await": "off", // conflicts with @typescript-eslint/return-await
    "@typescript-eslint/return-await": ["error", "always"],
    "@typescript-eslint/require-await": "error",
    "no-throw-literal": "off", // conflicts with @typescript-eslint/only-throw-error
    "@typescript-eslint/only-throw-error": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-empty-object-type": "error",
    "@typescript-eslint/no-unsafe-function-type": "error",
    "@typescript-eslint/no-wrapper-object-types": "error",
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "allow-as-parameter",
      },
    ],
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-invalid-void-type": "error",
    "@typescript-eslint/no-meaningless-void-operator": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/typedef": "error",
    "@typescript-eslint/unbound-method": "error",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-array-constructor": "error",
    "@typescript-eslint/no-invalid-this": "error",
    "@typescript-eslint/no-empty-function": "off",
    "dot-notation": "off", // conflicts with @typescript-eslint/dot-notation
    "@typescript-eslint/dot-notation": "error",
    "no-constant-condition": "off", // conflicts with @typescript-eslint/no-unnecessary-condition
    "@typescript-eslint/no-unnecessary-condition": [
      "error",
      { allowConstantLoopConditions: true },
    ],
  }

  return {
    files: ["**/*.{ts,tsx,mts}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: path.join(rootDir, "tsconfig.json"),
        tsconfigRootDir: rootDir,
        extraFileExtensions: [".cjs", ".mjs"],
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: { ...basePlugins, "@typescript-eslint": typescriptEslintPlugin },
    rules: { ...baseRules, ...typescriptRules },
  }
}

const getEslintConfiguration = ({ typescript, getBaseConfiguration } = {}) => {
  let baseConf = {
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
    },
    plugins: basePlugins,
    rules: baseRules,
  }
  if (getBaseConfiguration) {
    baseConf = getBaseConfiguration(baseConf)
  }
  const config = [js.configs.recommended, prettierConfig, baseConf]
  if (typescript) {
    config.push(getEslintTypescriptConfiguration(typescript))
  }
  return config
}

module.exports = { getEslintConfiguration, getEslintTypescriptConfiguration }
