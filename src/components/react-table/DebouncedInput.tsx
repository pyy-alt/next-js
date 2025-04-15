// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { InputHTMLAttributes, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
/**
 * 
 * Omit<Type, Keys> 是一个 TypeScript 工具类型：
 * 
    Type：原始类型（通常是一个接口或类型）。
    Keys：要排除的属性名（可以是字符串字面量或字符串字面量的联合类型）

    Omit作用：从 Type 中移除 Keys 中指定的属性，生成一个新类型。
 */

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}
