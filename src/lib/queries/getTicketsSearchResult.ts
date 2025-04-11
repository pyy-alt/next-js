// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { db } from '@/db';
import { customers, tickets } from '@/db/schema';
import { eq, ilike, or } from 'drizzle-orm';

export const getTicketsSearchResult = async (searchText: string) => {
  const results = await db
    .select({
      // 查询到的显示字段
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(tickets.description, `%${searchText}%`),
        ilike(tickets.tech, `%${searchText}%`),
        ilike(customers.firstName, `%${searchText}%`),
        ilike(customers.lastName, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.address1, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.state, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        ilike(customers.notes, `%${searchText}%`)
      )
    );
  return results;
};
