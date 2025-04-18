// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import Form from 'next/form';
import { Input } from '@/components/ui/input';
import SearchButton from '@/components/SearchButton';

const TicketSearch = () => {
  return (
    <Form action={'/tickets'} className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder="请输入工单号"
        className="w-full"
        autoFocus
      />
      <SearchButton />
    </Form>
  );
};
export default TicketSearch;
