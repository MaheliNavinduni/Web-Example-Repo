/**
 * VINT — sample Contact Us submissions for the admin frontend.
 * Replace with an API call once the backend exists.
 */

import type { ContactMessage, MessageStatus } from '@/types';


export const MESSAGE_STATUSES: MessageStatus[] = ['New', 'Read'];

export const messages: ContactMessage[] = [
  {
    id: 'MSG-208',
    name: 'Dilini Rajapaksa',
    email: 'dilini.r@gmail.com',
    phone: '+94 77 812 3345',
    subject: 'Order Inquiry',
    date: '2026-08-15',
    status: 'New',
    body: "Hello, I'd like to order 12 bottles of the Island King for a wedding in September. Could you tell me whether that quantity is available and how far in advance I would need to place the order? Thank you.",
  },
  {
    id: 'MSG-207',
    name: 'Sanjaya Gunawardena',
    email: 'sanjaya.g@outlook.com',
    phone: '+94 71 445 9902',
    subject: 'Product Inquiry',
    date: '2026-08-14',
    status: 'New',
    body: 'Is the Heritage Red sweet or dry? I usually prefer something on the drier side and I am not sure whether a strawberry wine would suit me.',
  },
  {
    id: 'MSG-206',
    name: 'Malsha Ekanayake',
    email: 'malsha.e@gmail.com',
    phone: '+94 76 209 8877',
    subject: 'General Inquiry',
    date: '2026-08-12',
    status: 'Read',
    body: 'Do you deliver to Nuwara Eliya, and is there a minimum order for delivery outside Colombo?',
  },
  {
    id: 'MSG-205',
    name: 'Hasitha Weerasinghe',
    email: 'hasitha.w@gmail.com',
    phone: '+94 70 553 1128',
    subject: 'Product Inquiry',
    date: '2026-08-10',
    status: 'Read',
    body: 'The Varietal Specific Tasting Set looks wonderful. Are the glasses sold individually as well, or only as the full set of six?',
  },
];

export function getMessageById(id: string): ContactMessage | null {
  return messages.find((message) => message.id === id) ?? null;
}
