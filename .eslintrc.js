module.exports = {
    'env': {
        'es6': true,
        'node': true,
        'mocha': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 2020
    },
    'rules': {
        'quotes': [2, 'single'],
        'semi': [2, 'never'],
        'indent': 2,
    },
}