// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import BackButton from '@/components/BackButton';
import { getCustomer } from '@/lib/queries/getCustomer';
import * as Sentry from '@sentry/nextjs';
import CustomerForm from '@/app/(rs)/customers/form/CustomerForm';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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
    const { getPermission } = getKindeServerSession()
    const managerPermission = await getPermission("manager")
    const isManager = managerPermission?.isGranted

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



      // 添加key修复 点击浏览器返回客户详情数据不显示问题
      // edit customer form
      return <CustomerForm key="customerId" customer={customer} isManager={isManager} />;
    } else {
      // create customer form
      return <CustomerForm  key="new" isManager={isManager} />;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
