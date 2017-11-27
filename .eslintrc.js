// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	extends: 'airbnb-base',
	// required to lint *.vue files
	plugins: [
		'html',
		'vue'
	],
	// check if imports actually resolve
	'settings': {
		'import/resolver': {
			'webpack': {
				'config': 'build/webpack.base.conf.js'
			}
		}
	},
	// add your custom rules here
	'rules': {
		// don't require .vue extension when importing
		'import/extensions': ['error', 'always', {
			'js': 'never',
			'vue': 'never'
		}],
		// allow optionalDependencies
		'import/no-extraneous-dependencies': ['error', {
			'optionalDependencies': ['test/unit/index.js']
		}],
		'import/first': 1,
		// allow paren-less arrow functions
		'arrow-parens': 1,
		// allow async-await
		'generator-star-spacing': 1,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'no-tabs': 0,
		// 缩进
		'indent': [1, 'tab'],
		// 键和值前保留一个空格
		'key-spacing': [1, { 'beforeColon': false, 'afterColon': true }],
		// 赋值号后边的空格
		'space-infix-ops': 1,
		// 注释后面的空格
		'spaced-comment': 1,
		// 不允许键和值之间存在多个空格
		'no-multi-spaces': 1,
		// 判断符号
		'eqeqeq': [1, 'smart'],
		// 最后一个键值对不带逗号
		'comma-dangle': [2, "never"],
		// 逗号后面的空格
		'comma-spacing': 1,
		'block-spacing': 1,
		'space-before-blocks': 1,
		'space-before-function-paren': 1,
		'no-trailing-spaces': 1,
		'object-curly-spacing': 1,
		'eol-last': 1,
		'no-unused-vars': 1,
		'prefer-const': 1,
		// 多余的空行
		'no-multiple-empty-lines': 1,
		// 分号
		'semi': 0,
		'func-names': 0,
		'prefer-template': 1,
		'no-mixed-operators': 1,
		'no-plusplus': 1,
		'no-param-reassign': 0,
		'no-alert': 0,
		'no-console': 0,
		'no-plusplus': 0,
		'no-multi-assign': 0,
		'global-require': 0,
		'camelcase': 0,
		'linebreak-style': 0
	}
}
