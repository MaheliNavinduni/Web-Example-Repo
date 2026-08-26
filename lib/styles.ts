/**
 * Layout class strings shared by more than one page.
 *
 * Anything specific to a single component belongs on that component; this is
 * only for treatments a few pages genuinely have in common.
 */

/**
 * Makes a grid of <Reveal>-wrapped cards all the same height.
 *
 * Reveal wraps each card in a plain <div>. That wrapper stretches to the grid
 * row, but the card inside sizes to its own content, so a shorter description
 * left one card visibly stubbier than its neighbours. Making the wrapper a flex
 * container passes the row height through to the card.
 */
export const STRETCH_CARDS = '[&>*]:flex [&>*>*]:min-w-0 [&>*>*]:flex-1';

