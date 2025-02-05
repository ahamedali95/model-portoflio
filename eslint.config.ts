import { FlatCompat } from '@eslint/eslintrc';
import eslintConfig from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParse from '@typescript-eslint/parser';
//@ts-ignore
import importEslintplugin from 'eslint-plugin-import';
import newlineDestructingEslintPlugin from 'eslint-plugin-newline-destructuring';
import reactEslintPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';
import vitestEslintPlugin from '@vitest/eslint-plugin';

const compat = new FlatCompat();

const config = tseslint.config({
    files: [ '**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx' ],
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tsParse,
        parserOptions: {
            project: true,
            tsconfigRootDir: __dirname,
            ecmaFeatures: {
                jsx: true,
                impliedStrict: true
            }
        }
    },
    ignores: [
        'node_modules/*',
        'build/*',
        'dist/*',
        'out/*'
    ],
    plugins: {
        '@typescript-eslint': tsEslintPlugin,
        'react': reactEslintPlugin,
        //@ts-ignore
        'react-hooks': reactHooksPlugin,
        '@stylistic': stylisticPlugin,
        'import': importEslintplugin,
        'unused-imports': unusedImports,
        'newline-destructuring': newlineDestructingEslintPlugin,
        'vitest': vitestEslintPlugin
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect'
        },
        'import/resolver': {
            typescript: {
                project: './tsconfig.json'
            },
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            }
        }
    },
    extends: [
        eslintConfig.configs.recommended,
        tseslint.configs.recommended,
        reactEslintPlugin.configs.flat.recommended,
        vitestEslintPlugin.configs.recommended,
        ...compat.extends('plugin:react-hooks/recommended')
    ],
    rules: {
        '@stylistic/array-bracket-spacing': [
            'error',
            'always',
            {
                'singleValue': false,
                'objectsInArrays': false,
                'arraysInArrays': false
            }
        ],
        '@stylistic/array-bracket-newline': 'error',
        '@stylistic/array-element-newline': [
            'error',
            'consistent'
        ],
        '@stylistic/arrow-spacing': 'error',
        '@stylistic/block-spacing': 'error',
        '@stylistic/brace-style': [
            'error',
            '1tbs'
        ],
        '@stylistic/comma-dangle': 'error',
        '@stylistic/comma-spacing': 'error',
        '@stylistic/comma-style': 'error',
        '@stylistic/computed-property-spacing': 'error',
        '@stylistic/dot-location': [
            'error',
            'property'
        ],
        '@stylistic/eol-last': [
            'error',
            'never'
        ],
        '@stylistic/function-call-spacing': 'error',
        '@stylistic/function-call-argument-newline': [
            'error',
            'consistent'
        ],
        '@stylistic/function-paren-newline': [
            'error',
            'consistent'
        ],
        '@stylistic/implicit-arrow-linebreak': [
            'error',
            'beside'
        ],
        '@stylistic/indent': [
            'error',
            4
        ],
        '@stylistic/indent-binary-ops': [
            'error',
            4
        ],
        '@stylistic/key-spacing': 'error',
        '@stylistic/keyword-spacing': 'error',
        '@stylistic/linebreak-style': 'off',
        '@stylistic/max-len': [
            'error',
            {
                'code': 140,
                'ignoreRegExpLiterals': true,
                'ignoreStrings': true,
                'ignoreTemplateLiterals': true,
                'ignoreUrls': true
            }
        ],
        '@stylistic/max-statements-per-line': 'error',
        '@stylistic/member-delimiter-style': 'error',
        '@stylistic/new-parens': [
            'error',
            'always'
        ],
        '@stylistic/newline-per-chained-call': [
            'error',
            { 'ignoreChainWithDepth': 1 }
        ],
        '@stylistic/no-confusing-arrow': [
            'error',
            { 'onlyOneSimpleParam': true }
        ],
        '@stylistic/no-extra-semi': 'error',
        '@stylistic/no-floating-decimal': 'error',
        '@stylistic/no-multi-spaces': [
            'error',
            { 'ignoreEOLComments': false }
        ],
        '@stylistic/no-multiple-empty-lines': [
            'error',
            {
                'max': 1,
                'maxEOF': 0,
                'maxBOF': 0
            }
        ],
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/no-whitespace-before-property': 'error',
        '@stylistic/object-curly-newline': [
            'error',
            {
                'ObjectExpression': {
                    'multiline': true,
                    'minProperties': 2
                },
                'ObjectPattern': {
                    'multiline': true,
                    'minProperties': 4
                },
                'ImportDeclaration': {
                    'multiline': true,
                    'minProperties': 4
                },
                'ExportDeclaration': {
                    'multiline': true,
                    'minProperties': 4
                }
            }
        ],
        '@stylistic/object-curly-spacing': [
            'error',
            'always',
            {
                'arraysInObjects': false,
                'objectsInObjects': false
            }
        ],
        '@stylistic/object-property-newline': [
            'error',
            { 'allowAllPropertiesOnSameLine': false }
        ],
        '@stylistic/operator-linebreak': [
            'error',
            'after',
            { 'overrides': { ':': 'before' }}
        ],
        '@stylistic/padded-blocks': [
            'error',
            'never',
            { 'allowSingleLineBlocks': true }
        ],
        '@stylistic/quotes': [
            'error',
            'single'
        ],
        '@stylistic/semi': 'error',
        '@stylistic/semi-spacing': [
            'error',
            {
                'before': false,
                'after': true
            }
        ],
        '@stylistic/space-in-parens': 'error',
        '@stylistic/space-infix-ops': 'error',
        '@stylistic/switch-colon-spacing': 'error',
        '@stylistic/template-curly-spacing': 'error',
        '@stylistic/type-annotation-spacing': [
            'error',
            {
                'before': false,
                'after': true
            }
        ],
        '@stylistic/type-generic-spacing': 'error',
        '@stylistic/type-named-tuple-spacing': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-duplicate-enum-values': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-namespace': 'warn',
        '@typescript-eslint/prefer-as-const': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        'import/first': 'error',
        'import/no-cycle': 'error',
        'import/no-unresolved': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': [
            'error',
            { 'prefer-inline': true }
        ],
        'import/order': [
            'error',
            {
                'groups': [
                    'builtin',
                    'external',
                    'internal',
                    [
                        'sibling',
                        'parent'
                    ],
                    'index',
                    'unknown'
                ],
                'newlines-between': 'always',
                'alphabetize': {
                    'order': 'asc',
                    'caseInsensitive': true
                }
            }
        ],
        'newline-before-return': 'error',
        'newline-destructuring/newline': [
            'error',
            {
                'items': 3,
                'allowAllPropertiesOnSameLine': true
            }
        ],
        'no-return-assign': [
            'error',
            'except-parens'
        ],
        'radix': 'error',
        'sort-imports': [
            'error',
            {
                'ignoreCase': false,
                'ignoreDeclarationSort': true,
                'ignoreMemberSort': false,
                'memberSyntaxSortOrder': [
                    'none',
                    'all',
                    'multiple',
                    'single'
                ],
                'allowSeparatedGroups': true
            }
        ],
        'unused-imports/no-unused-imports': 'error',
        '@stylistic/jsx-closing-bracket-location': [
            'error',
            'line-aligned'
        ],
        '@stylistic/jsx-closing-tag-location': 'error',
        '@stylistic/jsx-curly-brace-presence': 'warn',
        '@stylistic/jsx-curly-newline': [
            'error',
            {
                'multiline': 'consistent',
                'singleline': 'forbid'
            }
        ],
        '@stylistic/jsx-curly-spacing': [
            'error',
            {
                'when': 'never',
                'children': true
            }
        ],
        '@stylistic/jsx-equals-spacing': 'error',
        '@stylistic/jsx-first-prop-new-line': [
            'error',
            'multiline-multiprop'
        ],
        '@stylistic/jsx-indent': [
            'error',
            4
        ],
        '@stylistic/jsx-indent-props': [
            'error',
            4
        ],
        '@stylistic/jsx-max-props-per-line': [
            'error',
            { 'maximum': 1 }
        ],
        '@stylistic/jsx-newline': [
            'error',
            { 'prevent': true }
        ],
        '@stylistic/jsx-pascal-case': [
            'error',
            { 'allowNamespace': true }
        ],
        '@stylistic/jsx-props-no-multi-spaces': 'error',
        '@stylistic/jsx-quotes': [
            'error',
            'prefer-single'
        ],
        '@stylistic/jsx-self-closing-comp': [
            'error',
            {
                'component': true,
                'html': true
            }
        ],
        '@stylistic/jsx-sort-props': [
            'error',
            { 'ignoreCase': true }
        ],
        '@stylistic/jsx-tag-spacing': [
            'error',
            { 'beforeSelfClosing': 'proportional-always' }
        ],
        '@stylistic/jsx-wrap-multilines': [
            'error',
            {
                'declaration': 'parens-new-line',
                'assignment': 'parens-new-line',
                'return': 'parens-new-line',
                'arrow': 'parens-new-line',
                'condition': 'ignore',
                'logical': 'ignore',
                'prop': 'ignore'
            }
        ],
        'react/jsx-fragments': 'error',
        "react/jsx-no-useless-fragment": ["error", { "allowExpressions": true }],
        'react/jsx-key': 'error',
        'react/no-unescaped-entities': 'warn',
        'react-hooks/rules-of-hooks': 'error'
    }
});

export default config;