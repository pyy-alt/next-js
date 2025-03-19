// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabel<S>({ fieldTitle, nameInSchema, className, ...props }: Props<S>) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-base" htmlFor={nameInSchema}>
              {fieldTitle}
            </FormLabel>
            <FormControl>
              <Input
                id={nameInSchema}
                className={`w-full max-w-md disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75 ${className}`}
                {...props}
                {...field}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        );
      }}
    />
  );
}
