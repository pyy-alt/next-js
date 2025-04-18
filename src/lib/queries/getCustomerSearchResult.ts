// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { db } from '@/db';
import { customers } from '@/db/schema';
import { ilike, or, sql } from 'drizzle-orm';

export const getCustomerSearchResult = async (searchText: string) => {
   // 确保 searchText 不为 undefined 或 null，提供默认值 ''
   const safeSearchText = searchText ?? '';
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.firstName, `%${safeSearchText}%`),
        ilike(customers.lastName, `%${safeSearchText}%`),
        ilike(customers.email, `%${safeSearchText}%`),
        ilike(customers.phone, `%${safeSearchText}%`),
        ilike(customers.city, `%${safeSearchText}%`),
        ilike(customers.zip, `%${safeSearchText}%`),
        ilike(customers.city, `%${safeSearchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE ${`%${safeSearchText
          .toLowerCase()
          .replace(' ', '%')}%`}` // 支持 例如 d z 搜索 （dbz）
      )
    )
    .orderBy(customers.lastName);
  return results;
};
