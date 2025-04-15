// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { db } from '@/db';
import { customers, tickets } from '@/db/schema';
import { asc, eq, ilike, or, sql } from 'drizzle-orm';

export const getTicketsSearchResult = async (searchText: string) => {
  const results = await db
    .select({
      // 查询到的显示字段
      id: tickets.id,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      ticketDate: tickets.createdAt,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(tickets.tech, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE ${`%${searchText
          .toLowerCase()
          .replace(' ', '%')}%`}` // 支持 例如 d z 搜索 （dbz）
      )
    )
    .orderBy(asc(tickets.createdAt)); // 按照时间升序排列
  return results;
};

// 因为 getTicketsSearchResult 返回的是一个 Promise，所以这里使用 Awaited<ReturnType<typeof getTicketsSearchResult>> 来获取返回值的类型
export type TicketSearchResultType = Awaited<ReturnType<typeof getTicketsSearchResult>>