import { z } from 'zod';

export const financeStateSchema = z.object({
  names: z.record(z.string()).default({}),
  currentMonth: z.string().default(''),
  months: z.record(z.unknown()).default({}),
  currencies: z.record(z.number()).default({}),
  currencySources: z.record(z.unknown()).default({}),
  apiUrl: z.string().url().optional(),
  expenseTypes: z.array(z.string()).default([]),
  invTypes: z.array(z.string()).default([]),
  templates: z.record(z.unknown()).default({})
});
export type FinanceState = z.infer<typeof financeStateSchema>;
