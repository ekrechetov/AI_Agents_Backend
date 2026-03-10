import { z } from 'zod'

export const ItemSchema = z.object({
  description: z.string(),
  quantity: z.number(),
  unit: z.string().nullable(),
  unit_price: z.number(),
  total: z.number()
})

export const InvoiceSchema = z.object({
  invoice_number: z.string().nullable(),
  invoice_date: z.string().nullable(),

  seller: z.object({
    name: z.string().nullable(),
    address: z.string().nullable(),
    tax_id: z.string().nullable(),
    bank_details: z.string().nullable()
  }),

  buyer: z.object({
    name: z.string().nullable(),
    address: z.string().nullable(),
    tax_id: z.string().nullable()
  }),

  items: z.array(ItemSchema),

  subtotal: z.number().nullable(),
  vat_rate: z.number().nullable(),
  vat_amount: z.number().nullable(),
  total_amount: z.number(),
  currency: z.string()
})

export type Invoice = z.infer<typeof InvoiceSchema>
