// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type DataObj = {
  id: string;
  description: string;
};
type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  data: DataObj[];
  className?: string;
};
export function SelectWithLabel<S>({ fieldTitle, nameInSchema, data, className }: Props<S>) {
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
            <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger id={nameInSchema} className={`w-full max-w-md  ${className}`}>
                  <SelectValue placeholder="请选择城市" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data.map((item) => (
                  <SelectItem key={`${nameInSchema}_${item.id}`} value={item.id.toString()}>
                    {item.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
