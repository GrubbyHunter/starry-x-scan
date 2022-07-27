module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		"eslint:recommended",
		"airbnb-base",
		"plugin:vue/vue3-essential"
	],
	settings: {
		"import/resolver": {
			alias: {
				map: [
					["@", "./src"]
				],
				extensions: [".js", ".jsx"]
			}
		}
	},
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: [
		"vue",
		"simple-import-sort"
	],
	globals: {
		_: true,
		zhiyan_test_report: true,
		zhiyan_setting_requirement: true,
		html2canvas: true
	},
	rules: {
		"no-console": "off",
		"no-debugger": "off",
		"no-continue": ["off"],
		// reject need return error
		"prefer-promise-reject-errors": ["off"],
		"vue/multi-word-component-names": 0,
		"import/order": 0,
		"import/prefer-default-export": 0,
		indent: [
			"error",
			"tab"
		],
		"no-tabs": 0,
		"linebreak-style": [
			"error",
			"windows"
		],
		"no-unused-vars": [
			"error",
			// we are only using this rule to check for unused arguments since TS
			// catches unused variables but not args.
			{ varsIgnorePattern: ".*", args: "none" }
		],
		// handle function params
		"no-param-reassign": ["off", { props: false }],
		// var name used _
		"no-underscore-dangle": ["off"],
		// es6 ... first
		"prefer-destructuring": ["off"],
		// object end no ;
		"comma-dangle": ["error", "never"],
		// import validate
		"import/extensions": [
			"error",
			"always",
			{
				js: "never",
				vue: "never"
			}
		],
		// single quotes
		quotes: ["error", "double"],
		// end without ;
		semi: ["error", "never"],
		"sort-imports": ["error", {
			ignoreCase: true, // import sort
			ignoreDeclarationSort: true,
			ignoreMemberSort: true,
			memberSyntaxSortOrder: ["none", "all", "single", "multiple"]
		}]
	}
}
