// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { db } from '@/db';
import { customers } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getCustomer(id: number) {
  const customer = await db.select().from(customers).where(eq(customers.id, id));
  return customer[0];
}
