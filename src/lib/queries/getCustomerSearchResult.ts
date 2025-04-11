// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { db } from '@/db';
import { customers } from '@/db/schema';
import { ilike, or } from 'drizzle-orm';

export const getCustomerSearchResult = async (searchText: string) => {
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.firstName, `%${searchText}%`),
        ilike(customers.lastName, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.address1, `%${searchText}%`),
        ilike(customers.address2, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.state, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`)
      )
    );
  return results;
};
