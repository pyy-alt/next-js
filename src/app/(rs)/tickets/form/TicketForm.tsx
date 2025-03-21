// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';
import { Form } from '@/components/ui/form';
import { type selectCustomerSchemaType } from '@/zod-schemas/customer';
import { insertTicketSchema, type insertTicketSchemaType, type selectTicketSchemaType } from '@/zod-schemas/ticket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { InputWithLabel } from '@/components/inputs/InputWithLabel';
import { SelectWithLabel } from '@/components/inputs/SelectwithLabel';
import { TextareaWithLabel } from '@/components/inputs/TextAreaWithLabel';
import { CheckboxwithLabel } from '@/components/inputs/CheckboxwithLabel';

import { Button } from '@/components/ui/button';

type Props = {
  ticket?: selectTicketSchemaType;
  customer: selectCustomerSchemaType;
  techs?: { id: string; description: string }[];
  isEditable?: boolean;
};
export default function TicketForm({ ticket, customer, techs, isEditable = true }: Props) {
  const isManager = Array.isArray(techs) && techs.length > 0;
  console.log(isManager);
  
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? '(New)',
    customerId: (ticket?.customerId ?? customer.id) || 0,
    title: ticket?.title || '',
    description: ticket?.description ?? '',
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? 'new-ticket@example.com',
  };
  const form = useForm<insertTicketSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });
  async function submitForm(data: insertTicketSchemaType) {
    console.log(data);
  }
  return (
    <>
      <div className="flex flex-col gap-1 sm:px-8">
        <div>
          <h2 className="text-2xl font-bold">
          { ticket?.id && isEditable ? `Edit Ticket #${ticket?.id}` : ticket?.id ? `View Ticket #${ticket?.id}` :  'New Ticket' }
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col xl:flex-row gap-4 xl:gap-8">
            <div className="flex flex-col gap-4 w-full max-w-md">
              <InputWithLabel<insertTicketSchemaType> fieldTitle="Title" nameInSchema="title" disabled={!isEditable} />
              {isManager ? (
                <SelectWithLabel<insertTicketSchemaType>
                  fieldTitle="Tech"
                  nameInSchema="tech"
                  data={[{ id: 'new-ticket@example.com', description: 'new-ticket@example.com' }, ...techs]}
                />
              ) : (
                <InputWithLabel<insertTicketSchemaType> fieldTitle="Tech" nameInSchema="tech" disabled={true} />
              )}

              {ticket?.id ? (
                <CheckboxwithLabel<insertTicketSchemaType>
                  fieldTitle="Completed"
                  nameInSchema="completed"
                  message="Yes"
                  disabled={!isEditable}
                />
              ) : null}
              <div className="mt-4 space-y-2">
                <h3 className="text-lg">Customer Info</h3>
                <hr className="w-4/5" />
                <p>
                  {customer.firstName} {customer.lastName}
                </p>
                <p>{customer.address1}</p>
                {(customer.address2 && <p>{customer.address2}</p>) || null}
                <p>
                  {customer.city}, {customer.state} {customer.zip}
                </p>
                <hr className="w-4/5" />
                <p>{customer.email}</p>
                <p>Phone: {customer.phone}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-md">
              <TextareaWithLabel<insertTicketSchemaType>
                fieldTitle="Description"
                nameInSchema="description"
                className="h-96"
                disabled={!isEditable}
              ></TextareaWithLabel>

              {isEditable ? (
                <div className="flex gap-2">
                  <Button type="submit" className="w-3/4" variant={'default'} title={'Save'}>
                    Save
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/4"
                    variant={'destructive'}
                    title={'Reset'}
                    onClick={() => form.reset(defaultValues)}
                  >
                    Reset
                  </Button>
                </div>
              ) : null}
            </div>
            {/* <p>{JSON.stringify(form.getValues())}</p> */}
          </form>
        </Form>
      </div>
    </>
  );
}
