// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import Form from 'next/form';
import { Input } from '@/components/ui/input';
import SearchButton from '@/components/SearchButton';
const CustomerSearch = () => {
  return (
    <Form action="/customers" className="flex gap-2 items-center">
      <Input name="searchText" type="text" placeholder="Search Customer" className="w-full" autoFocus />
      <SearchButton />
    </Form>
  );
};

export default CustomerSearch;
