import type { Price } from "../data/types.ts";

/**
 * Formats a Price for display, handling the "free" case explicitly.
 * Price is null when an item is free to borrow (per types.ts), so we
 * check that first rather than assuming amountCents === 0 means free —
 * the type contract already tells us free items have price: null.
 */
export function formatPrice(price: Price | null): string {
    if (price === null) {
        return "Free to borrow";
    }

    // Money is stored in cents to avoid floating-point rounding bugs.
    // Convert to whole currency units for display only, at the last moment.
    const amount = (price.amountCents / 100).toFixed(0);

    // Map the API's period values to short display labels.
    const periodLabel = { hour: "hr", day: "day", week: "wk" }[price.period];

    return `R${amount} / ${periodLabel}`;
}