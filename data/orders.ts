/**
 * VINT — sample order records for the admin frontend.
 *
 * These are placeholder rows so the admin screens can be designed and reviewed.
 * When the backend is ready, replace this module with an API call — every admin
 * page imports from here, so nothing else has to change.
 */

import type { Order, OrderStats, OrderStatus } from '@/types';


export const ORDER_STATUSES: OrderStatus[] = ['Pending', 'Confirmed', 'Preparing', 'Completed', 'Cancelled'];

export const orders: Order[] = [
  {
    id: 'VNT-1042',
    customer: 'Nadeesha Perera',
    email: 'nadeesha.p@gmail.com',
    phone: '+94 77 412 8830',
    address: 'No 12, Temple Road, Maharagama',
    productSlug: 'island-king',
    productName: 'Island King',
    productType: 'King Coconut Wine',
    quantity: 2,
    unitPrice: 2500,
    total: 5000,
    date: '2026-08-14',
    status: 'Pending',
    notes: 'Please deliver after 5pm on a weekday if possible.',
  },
  {
    id: 'VNT-1041',
    customer: 'Ruwan Jayasuriya',
    email: 'ruwanj@outlook.com',
    phone: '+94 71 990 2214',
    address: 'D/12, Lake View Estate, Avissawella',
    productSlug: 'estate-grape',
    productName: 'Estate Grape',
    productType: 'Red Wine',
    quantity: 6,
    unitPrice: 3500,
    total: 21000,
    date: '2026-08-13',
    status: 'Confirmed',
    notes: 'For a family gathering — gift wrapping appreciated.',
  },
  {
    id: 'VNT-1040',
    customer: 'Ishara Fernando',
    email: 'ishara.fdo@gmail.com',
    phone: '+94 76 335 0091',
    address: '48/3, Galle Road, Dehiwala',
    productSlug: 'classic-blanc',
    productName: 'Classic Blanc',
    productType: 'White Wine',
    quantity: 3,
    unitPrice: 3000,
    total: 9000,
    date: '2026-08-12',
    status: 'Preparing',
    notes: '',
  },
  {
    id: 'VNT-1039',
    customer: 'Tharindu Silva',
    email: 'tharindu.silva@gmail.com',
    phone: '+94 70 118 7742',
    address: '221 Kandy Road, Kadawatha',
    productSlug: 'heritage-red',
    productName: 'Heritage Red',
    productType: 'Strawberry Wine',
    quantity: 1,
    unitPrice: 3500,
    total: 3500,
    date: '2026-08-11',
    status: 'Completed',
    notes: 'Birthday gift.',
  },
  {
    id: 'VNT-1038',
    customer: 'Amaya Wickramasinghe',
    email: 'amaya.w@gmail.com',
    phone: '+94 77 220 4419',
    address: '9, Flower Road, Colombo 07',
    productSlug: 'island-king',
    productName: 'Island King',
    productType: 'King Coconut Wine',
    quantity: 4,
    unitPrice: 2500,
    total: 10000,
    date: '2026-08-10',
    status: 'Completed',
    notes: '',
  },
  {
    id: 'VNT-1037',
    customer: 'Kasun Bandara',
    email: 'kasun.b@yahoo.com',
    phone: '+94 78 664 1120',
    address: '17/A, Station Road, Ratnapura',
    productSlug: 'estate-grape',
    productName: 'Estate Grape',
    productType: 'Red Wine',
    quantity: 2,
    unitPrice: 3500,
    total: 7000,
    date: '2026-08-09',
    status: 'Cancelled',
    notes: 'Customer requested cancellation — date changed.',
  },
];

export function getOrderById(id: string): Order | null {
  return orders.find((order) => order.id === id) ?? null;
}

/** Small helper the dashboard uses for its metric tiles. */
export function getOrderStats(): OrderStats {
  const pending = orders.filter((o) => o.status === 'Pending').length;
  const completed = orders.filter((o) => o.status === 'Completed').length;
  const revenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  return { total: orders.length, pending, completed, revenue };
}
