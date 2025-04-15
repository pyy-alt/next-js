// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { db } from '@/db';
import { tickets, customers } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';

export async function getOpenTickets() {
  const results = await db
    .select({
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
    .where(eq(tickets.completed, false)) // 所有未完成的单据
    .orderBy(asc(tickets.createdAt)); // 按照时间升序排列
  return results;
}
