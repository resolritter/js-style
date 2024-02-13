const { getEslintConfiguration } = require("./src/eslint")

module.exports = { ...getEslintConfiguration(), env: { node: true } }
