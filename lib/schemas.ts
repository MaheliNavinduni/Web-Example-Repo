import { z } from 'zod';

import type { Availability } from '@/types';

import { CONTACT_SUBJECTS } from '@/data/site';
import { WINE_TYPE_SLUGS } from '@/data/products';

/**
 * Validation rules for the two public forms.
 *
 * They live here rather than inside the components for two reasons: the same
 * rule can be reused by the backend when it exists, and each schema also gives
 * us the form's TypeScript type through `z.infer`, so the fields a component
 * renders and the fields it validates can never drift apart.
 *
 * Messages are written as something we would actually say to a customer, since
 * they appear underneath the field.
 */

/** Sri Lankan numbers are 9-10 digits; spaces, +94 and dashes are all common. */
const phone = z
  .string()
  .refine((value) => value.replace(/\D/g, '').length >= 9, {
    message: 'Please enter a contact number we can reach you on.',
  });

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please tell us your name.'),
  email: z.email('Please enter a valid email address.'),
  // Optional on the contact form — an email address is enough to reply.
  phone: z.string().optional(),
  subject: z.enum(CONTACT_SUBJECTS),
  message: z.string().trim().min(1, 'Please write your message.'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const orderSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your full name.'),
  email: z.email('Please enter a valid email address.'),
  // Required here — the team rings the customer back to confirm the order.
  phone,
  address: z.string().trim().min(1, 'Please enter a delivery address.'),
  notes: z.string().optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

/* ------------------------------------------------------------------ */
/* Admin — add / edit product                                          */
/* ------------------------------------------------------------------ */

export const AVAILABILITY_OPTIONS = [
  'In Stock',
  'Low Stock',
  'Sold Out',
] as const satisfies readonly Availability[];

/** The four 0-100 attributes the product page draws as bars. */
export const FLAVOUR_FIELDS = ['sweetness', 'acidity', 'body', 'fruitiness'] as const;

/**
 * `valueAsNumber` on the number inputs means an empty box arrives as NaN
 * rather than '', so the numeric rules below check for a real number first and
 * the admin gets "enter a price" instead of a type error.
 */
const percentage = z
  .number({ error: 'Enter a value between 0 and 100.' })
  .min(0, 'Enter a value between 0 and 100.')
  .max(100, 'Enter a value between 0 and 100.');

export const productSchema = z.object({
  name: z.string().trim().min(1, 'A product name is required.'),
  typeSlug: z.enum(WINE_TYPE_SLUGS),
  description: z.string().trim().min(1, 'Add a short description.'),
  image: z.string(),
  price: z.number({ error: 'Enter a price greater than zero.' }).positive('Enter a price greater than zero.'),
  stock: z
    .number({ error: 'Enter a stock quantity.' })
    .int('Stock has to be a whole number of bottles.')
    .min(0, 'Enter a stock quantity.'),
  availability: z.enum(AVAILABILITY_OPTIONS),
  volume: z.string(),
  alcohol: z.string(),
  origin: z.string(),
  vintage: z.string(),
  sweetness: percentage,
  acidity: percentage,
  body: percentage,
  fruitiness: percentage,
  ingredients: z.string(),
  servingSuggestions: z.string(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
