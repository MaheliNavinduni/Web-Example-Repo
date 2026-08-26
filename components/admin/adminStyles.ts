/**
 * Shared class strings for the admin tables.
 *
 * Every admin table is the same table with different columns, so the cell
 * treatments live here instead of being retyped in three files. They are plain
 * constants rather than components because a <td> needs to stay a <td> for the
 * table semantics to survive.
 */

/** Horizontal scroll container, so a wide table never breaks the page layout. */
export const TABLE_WRAP = 'overflow-x-auto';

export const TABLE = 'w-full min-w-180 border-collapse text-base';

export const TH =
  'bg-cream-deep px-4 py-3 text-left text-xs font-bold tracking-wide whitespace-nowrap uppercase text-muted';

export const TD = 'border-t border-line-soft p-4 align-middle';

/** Row highlight on hover — applied to <tbody>. */
export const TBODY = '[&_tr]:transition-colors [&_tr]:ease-out [&_tr:hover]:bg-cream-deep';

/** The identifying value in a row: order id, product name, customer name. */
export const CELL_STRONG = 'font-bold text-burgundy';

/** The quieter second line under it. */
export const CELL_MUTED = 'block text-sm text-muted';

/** Numbers and dates line up when they share a column. */
export const CELL_NUM = 'tabular-nums whitespace-nowrap';

export const CELL_ACTIONS = 'flex justify-end gap-1';

/** Footer row of buttons on a panel or a dialog. */
export const ADMIN_ACTIONS =
  'flex flex-wrap justify-end gap-3 border-t border-line-soft pt-6';
