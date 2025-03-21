// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { TextareaHTMLAttributes } from 'react';
type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;
export function TextareaWithLabel<S>({ fieldTitle, nameInSchema, className, ...props }: Props<S>) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-base mb-2" htmlFor={nameInSchema}>
              {fieldTitle}
            </FormLabel>
            <FormControl>
              <Textarea  id={nameInSchema} className={`${className} disabled:text-blue-500 dark:disabled:text-yellow-300 `} {...props} {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
