// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Metadata } from 'next';
import CustomerSearch from './CustomerSearch';
import { getCustomerSearchResult } from '@/lib/queries/getCustomerSearchResult';


export const metadata: Metadata = {
  title: '客户搜索',
  // description: '帮助客户管理一些数据',
};
export default async function Customers({searchParams}:{searchParams:Promise<{ [key:string]:string | undefined }> }) {
  const { searchText } = await searchParams;

   if(!searchText)   <CustomerSearch />

   // query database
   const results= await getCustomerSearchResult(searchText!);
   return(
    <>
      <CustomerSearch/>
      <p>{JSON.stringify(results)}</p>
    </>
   )

   // return result
}
