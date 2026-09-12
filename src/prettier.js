const getPrettierConfiguration = () => {
  return {
    semi: false,
    trailingComma: "all",
    arrowParens: "always",
    objectWrap: "collapse",
  }
}

module.exports = { getPrettierConfiguration }
