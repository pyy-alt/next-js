// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Metadata } from 'next';
import TicketSearch from './TicketSearch';
import { getTicketsSearchResult } from '@/lib/queries/getTicketsSearchResult';
import { getOpenTickets } from '@/lib/queries/getOpenTickets';
import TicketTable from './TicketTable';

export const metadata: Metadata = {
  title: '工单搜索',
};
export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <>
        <TicketSearch />
        {/* <p>{JSON.stringify(results)}</p> */}
        {results.length ? <TicketTable data={results} /> : <p className="mt-4">没有找到数据</p>}
      </>
    );
  }

  // query database
  const results = await getTicketsSearchResult(searchText!);
  return (
    <>
      <TicketSearch />
      {results.length ? <TicketTable data={results} /> : <p className="mt-4">没有找到数据</p>}

      {/* <p>{JSON.stringify(results)}</p> */}
    </>
  );
}
