import { useMemo, useState } from "react";
import type { Item, Category } from "../data/types.ts";

// Local shape for the filter UI's state. Kept separate from Item/Category
// because "all" isn't a real Category value — it's a UI-only concept.
export interface FilterState {
    query: string;
    category: Category | "all";
    priceType: "all" | "free" | "paid";
}

const initialFilters: FilterState = {
    query: "",
    category: "all",
    priceType: "all",
};

/**
 * Takes the raw item list and returns filtered results based on
 * user-controlled search/category/price state.
 *
 * Two-stage filtering is intentional:
 *  1. visibleItems: removes "removed" listings unconditionally — this is
 *     not something the user can toggle back on with a filter, because a
 *     removed listing is a data lifecycle state, not a browsing preference.
 *  2. filteredItems: applies the user's actual search/category/price choices
 *     on top of that already-safe list.
 */
export function useItemFilters(items: Item[]) {
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    // Step 1: hide removed items from the browsable set entirely.
    // useMemo avoids recalculating this filter on every render — only
    // when the underlying items array actually changes.
    const visibleItems = useMemo(
        () => items.filter((item) => item.status !== "removed"),
        [items]
    );

    // Step 2: apply the user's search/category/price filters.
    const filteredItems = useMemo(() => {
        return visibleItems.filter((item) => {
            // Case-insensitive substring match on title.
            const matchesQuery =
                filters.query.trim() === "" ||
                item.title.toLowerCase().includes(filters.query.trim().toLowerCase());

            const matchesCategory =
                filters.category === "all" || item.category === filters.category;

            // price === null means "free to borrow" per the Item type contract.
            const matchesPrice =
                filters.priceType === "all" ||
                (filters.priceType === "free" && item.price === null) ||
                (filters.priceType === "paid" && item.price !== null);

            return matchesQuery && matchesCategory && matchesPrice;
        });
    }, [visibleItems, filters]);

    return { filters, setFilters, filteredItems };
}