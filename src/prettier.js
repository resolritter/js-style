const getPrettierConfiguration = () => {
	return {
		semi: false,
		trailingComma: "all",
		arrowParens: "always",
		objectWrap: "collapse",
		printWidth: 90,
		useTabs: true,
		tabWidth: 2,
	}
}

module.exports = { getPrettierConfiguration }
