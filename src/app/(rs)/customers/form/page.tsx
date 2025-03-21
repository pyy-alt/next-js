// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import BackButton from '@/components/BackButton';
import { getCustomer } from '@/lib/queries/getCustomer';
import * as Sentry from '@sentry/nextjs';
import CustomerForm from '@/app/(rs)/customers/form/CustomerForm';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string | undefined }>;
}) {
  const { customerId } = await searchParams;
  if(!customerId){
    return {
      title: '客户管理',
      description: '帮助客户管理一些数据',
    };
  }
  return {
    title: `客户管理 - ${customerId}`,
    description: '帮助客户管理一些数据',
  };
}
export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string | undefined }>;
}) {
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
      // edit customer form
      return <CustomerForm customer={customer} />;
    } else {
      // create customer form
      return <CustomerForm />;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
