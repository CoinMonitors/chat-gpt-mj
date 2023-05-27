/* eslint-disable @typescript-eslint/no-unused-vars */
const OFF = 0;
const WARN = 1;
const ERROR = 2;
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        './.eslintrc-auto-import.json' //处理自动导入后给 eslint 增加全局变量
    ],
    overrides: [],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['vue', '@typescript-eslint', 'prettier'],
    rules: {
        'vue/multi-word-component-names': OFF, // 关闭限制组件名称必须是多个单词 https://eslint.vuejs.org/rules/multi-word-component-names.html
        '@typescript-eslint/no-namespace': OFF,
        '@typescript-eslint/no-explicit-any': OFF
    }
};

// 配置项详细解释
// env
