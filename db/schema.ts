import { pgTable, text, timestamp, integer, decimal, boolean, jsonb, uniqueIndex } from 'drizzle-orm/pg-core';

export const admin = pgTable('admin', {
  id: text('id').primaryKey().default('admin'),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const events = pgTable('events', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  date: timestamp('date').notNull(),
  endDate: timestamp('end_date'),
  location: text('location').notNull(),
  bannerUrl: text('banner_url'),
  posterUrl: text('poster_url'),
  maxAttendees: integer('max_attendees'),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tickets = pgTable('tickets', {
  id: text('id').primaryKey(),
  eventId: text('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD').notNull(),
  quantity: integer('quantity').notNull(),
  remaining: integer('remaining').notNull(),
  maxPerOrder: integer('max_per_order').default(10).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const discountCodes = pgTable('discount_codes', {
  id: text('id').primaryKey(),
  eventId: text('event_id').references(() => events.id, { onDelete: 'cascade' }),
  code: text('code').notNull().unique(),
  type: text('type').notNull().default('percentage'),
  value: decimal('value', { precision: 10, scale: 2 }).notNull(),
  maxUses: integer('max_uses'),
  usedCount: integer('used_count').default(0).notNull(),
  expiresAt: timestamp('expires_at'),
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  eventId: text('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  customerEmail: text('customer_email').notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('KES').notNull(),
  status: text('status').notNull().default('pending'),
  discountCodeId: text('discount_code_id'),
  discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }).default('0'),
  intasendInvoiceId: text('intasend_invoice_id'),
  intasendTrackingId: text('intasend_tracking_id'),
  paymentMethod: text('payment_method'),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const attendees = pgTable('attendees', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  ticketId: text('ticket_id').notNull().references(() => tickets.id),
  eventId: text('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  ticketNumber: text('ticket_number').notNull().unique(),
  qrCodeData: text('qr_code_data'),
  checkedIn: boolean('checked_in').default(false).notNull(),
  checkedInAt: timestamp('checked_in_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
