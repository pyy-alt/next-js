// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from '@/zod-schemas/customer';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';

import { InputWithLabel } from '@/components/inputs/InputWithLabel';
import { SelectWithLabel } from '@/components/inputs/SelectwithLabel';
import { TextareaWithLabel } from '@/components/inputs/TextAreaWithLabel';
import { CheckboxwithLabel } from '@/components/inputs/CheckboxwithLabel';
import { DisplayServerActionResponse } from '@/components/DisplayServerActionResponse';

import { StatesArray as states } from '@/constants/StateArray';

import { useAction } from 'next-safe-action/hooks';
import { saveCustomerAction } from '@/app/actions/saveCustomerAction';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  customer?: selectCustomerSchemaType;
  isManager?: boolean | undefined;
};
export default function CustomerForm({ customer, isManager = false }: Props) {
  const { toast } = useToast();

  const searchParams = useSearchParams()
  const hasCustomerId = searchParams.has("customerId")

  const emptyValues: insertCustomerSchemaType = {
    id: 0,
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    notes: '',
    active: true,
}

  // 只是测试
  // const permObj = getPermissions();
  // const isAuthorized = !isLoading && permObj.some((perm) => perm === 'manager' || perm === 'admin');

  const defaultValues: insertCustomerSchemaType = hasCustomerId ? {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
    address1: customer?.address1 ?? '',
    address2: customer?.address2 ?? '',
    city: customer?.city ?? '',
    state: customer?.state ?? '',
    zip: customer?.zip ?? '',
    phone: customer?.phone ?? '',
    email: customer?.email ?? '',
    notes: customer?.notes ?? '',
    active: customer?.active ?? true,
  } : emptyValues ;
  const form = useForm<insertCustomerSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(hasCustomerId ? defaultValues : emptyValues)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchParams.get("customerId")])


  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaveing,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess: ({ data }) => {
      toast({
        title: 'Success 🎉',
        description: data?.message,
        variant: 'default',
      });
      // resetSaveAction();
    },
    onError: ({ error }) => {
      toast({
        title: 'Error ❌',
        description: `${error instanceof Error ? error.message : error}`,
        variant: 'destructive',
      });
    },
  });
  async function submitForm(data: insertCustomerSchemaType) {
    // console.log(data);
    executeSave({ ...data });
  }

  return (
    <>
      <div className="flex flex-col gap-1 sm:px-8">
        <DisplayServerActionResponse result={saveResult} />
        <div>
          <h2 className="text-2xl font-bold">
            {customer?.id ? 'Edit Customer Form' : 'New Customer Form'} {customer?.id ? ` --客户ID${customer.id}` : ''}
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col xl:flex-row gap-4 xl:gap-8">
            <div className="flex flex-col gap-4 w-full max-w-md">
              <InputWithLabel<insertCustomerSchemaType> fieldTitle="First Name" nameInSchema="firstName" />

              <InputWithLabel<insertCustomerSchemaType> fieldTitle="Last Name" nameInSchema="lastName" />

              <InputWithLabel<insertCustomerSchemaType> fieldTitle="Address1" nameInSchema="address1" />

              <InputWithLabel<insertCustomerSchemaType> fieldTitle="City" nameInSchema="city" />

              <SelectWithLabel<insertCustomerSchemaType> fieldTitle="State" nameInSchema="state" data={states} />

              <InputWithLabel<insertCustomerSchemaType> fieldTitle="Address2" nameInSchema="address2" />
            </div>
            <div className="flex flex-col gap-4 w-full max-w-md">
              <InputWithLabel<insertCustomerSchemaType> fieldTitle="Zip Name" nameInSchema="zip" />

              <InputWithLabel<insertCustomerSchemaType> fieldTitle="Email" nameInSchema="email" />

              <InputWithLabel<insertCustomerSchemaType> fieldTitle="Phone" nameInSchema="phone" />

              <TextareaWithLabel<insertCustomerSchemaType>
                fieldTitle="Notes"
                nameInSchema="notes"
                className="h-40"
              ></TextareaWithLabel>

              {/* 如是【经理】就显示 复选框 */}
              {isManager && customer?.id ? (
                <CheckboxwithLabel<insertCustomerSchemaType>
                  fieldTitle="Active"
                  nameInSchema="active"
                  message="Yes"
                ></CheckboxwithLabel>
              ) : null}
              <div className="flex gap-2">
                <Button type="submit" className="w-3/4" variant={'default'} title={'Save'} disabled={isSaveing}>
                  {isSaveing ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" /> Saveing
                    </>
                  ) : (
                    'Save'
                  )}
                </Button>
                <Button
                  type="submit"
                  className="w-1/4"
                  variant={'destructive'}
                  title={'Reset'}
                  onClick={() => {
                    form.reset(defaultValues);
                    resetSaveAction();
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
            {/* <p>{ JSON.stringify(form.getValues()) }</p> */}
          </form>
        </Form>
      </div>
    </>
  );
}
