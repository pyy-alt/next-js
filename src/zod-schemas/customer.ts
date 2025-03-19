// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { customers } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
export  const insertCustomerSchema = createInsertSchema(customers,{
  firstName:(schema)=>schema.min(1,'First name is required'),
  lastName:(schema)=>schema.min(1,'Last name is required'),
  email:(schema)=>schema.email('Invalid email address'),
  address1:(schema)=>schema.min(1,'Address is required'),
  city:(schema)=>schema.min(1,'City is required'),
  state:(schema)=>schema.min(2,'State  must be exactly 2 characters'),
  zip:(schema)=>schema.regex(/^\d{5}(-\d{4})?$/,'Invalid zip code. Use 5 digits or 5 digits followed by an optional hyphen and 4 digits'),
  phone:(schema)=>schema.min(10,'Phone number must be exactly 10 characters').regex(/^\d{3}-\d{3}-\d{4}$/,'Invalid phone number format. Use XXX-XXX-XXXX'),
})

export const selectCustomerSchema =createInsertSchema(customers)

export type insertCustomerSchemaType = typeof insertCustomerSchema._type

export type selectCustomerSchemaType = typeof selectCustomerSchema._type
