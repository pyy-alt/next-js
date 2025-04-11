// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Metadata } from 'next';
import TicketSearch from './TicketSearch';
import { getTicketsSearchResult } from '@/lib/queries/getTicketsSearchResult';
import { getOpenTickets } from '@/lib/queries/getOpenTickets';

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
        <p>{JSON.stringify(results)}</p>
      </>
    );
  }

  // query database
  const results = await getTicketsSearchResult(searchText!);
  return (
    <>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
}
