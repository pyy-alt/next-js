import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { rule } from 'postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@next/next/no-page-custom-font': 'off',
    },
    ignores: [
      './node_modules/**/*',
      './.next/**/*',
      './out/**/*',
      './public/**/*',
      './.git/**/*',
      './src/components/ui/', // 添加这一行来忽略您的第三方组件目录
    ],
  },
];

export default eslintConfig;
