// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

"use server"
import { actionClient } from '@/lib/safe-action';
import { flattenValidationErrors } from 'next-safe-action';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { tickets } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { type insertTicketSchemaType, insertTicketSchema } from '@/zod-schemas/ticket';

export const saveTicketAction = actionClient
  .metadata({ actionName: 'saveTicketAction' })
  .schema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: ticket }: { parsedInput: insertTicketSchemaType }) => {
    const { isAuthenticated } = getKindeServerSession();
    const isAuth = await isAuthenticated();
    if (!isAuth) redirect('/login');

    // add
    if (ticket.id === '(New)') {
      const result = await db
        .insert(tickets)
        .values({
          customerId: ticket.customerId,
          title: ticket.title,
          description: ticket.description,
          tech: ticket.tech,
        })
        .returning({ insertedId: tickets.id });
      return { message: `Ticket ID #${result[0].insertedId} created successfully` };
    }

    // edit
    const result = await db
      .update(tickets)
      .set({
        customerId: ticket.customerId,
        title: ticket.title,
        description: ticket.description,
        completed: sql`${ticket.completed}`,
        tech: ticket.tech,
      })
      .where(eq(tickets.id, ticket.id))
      .returning({ updatedId: tickets.id });

      return { message: `Ticket ID #${result[0].updatedId} updated successfully` };
  });
