// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Metadata } from 'next';
import CustomerSearch from './CustomerSearch';
import { getCustomerSearchResult } from '@/lib/queries/getCustomerSearchResult';
import * as Sentry from '@sentry/nextjs';
import CustomerTable from './CustomerTable';

export const metadata: Metadata = {
  title: '客户搜索',
  // description: '帮助客户管理一些数据',
};
export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) <CustomerSearch />;

  // 测试查询性能如何
  const span = Sentry.startInactiveSpan({
    name: 'getCustomerSearchResult-1',
  });
  // query database
  const results = await getCustomerSearchResult(searchText!);
  span?.end();
  return (
    <>
      <CustomerSearch />
      {results.length > 0 ? <CustomerTable data={results} /> : <p className='mt-4'>没有找到结果</p>}
      {/* <p>{JSON.stringify(results)}</p> */}
    </>
  );

  // return result
}
