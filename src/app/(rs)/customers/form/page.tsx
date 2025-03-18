// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import BackButton from '@/components/BackButton';
import { getCustomer } from '@/lib/queries/getCustomer';
import * as Sentry from '@sentry/nextjs';

export default async function CustomerFormPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string | undefined }> }) {
  try {
    const { customerId } = await searchParams;
    if (customerId) {
      const customer = await getCustomer(Number(customerId));
      if (!customer) {
        return (
          <>
            <div className="text-2xl mb-2 text-red-400">没有找到客户</div>
            <BackButton className="w-full" title="返回" variant="default"></BackButton>
          </>
        );
      }
        console.log(customer);
        // return (
        //   <>
        //     <div className="text-2xl mb-2">Customer Form</div>
        //     <div className="text-xl mb-2">Customer Name: {customer.firstName + customer.lastName}</div>
        //     <div className="text-xl mb-2">Customer Email: {customer.email}</div>
        //     <div className="text-xl mb-2">Customer Phone: {customer.phone}</div>
        //     <div className="text-xl mb-2">Customer Address:</div>
        //   </>
        // );
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
