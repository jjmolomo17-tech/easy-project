import { useEffect, useState } from "react";
import { fetchItems } from "../data/items";
import type { Item, ItemId } from "../data/types";

/**
 * Loads a single item by id from the (mocked, async) data source.
 *
 * State meanings:
 *  - item === undefined  → still loading (initial state)
 *  - item === null       → finished loading, but no matching item found
 *                           (either the id doesn't exist, or it was removed)
 *  - item === Item       → found and safe to render
 *
 * Using undefined vs null as two distinct "empty" states lets the page
 * tell "still loading" apart from "genuinely not found" — collapsing
 * them into one state would make a real 404-style case look identical
 * to a normal loading spinner.
 */
export function useItem(itemId: ItemId | undefined) {
    const [item, setItem] = useState<Item | null | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!itemId) {
            setItem(null);
            return;
        }

        let cancelled = false;

        fetchItems()
            .then((items) => {
                if (cancelled) return;
                const found = items.find((i) => i.id === itemId && i.status !== "removed");
                setItem(found ?? null);
            })
            .catch(() => {
                if (!cancelled) setError("Could not load this item.");
            });

        return () => {
            cancelled = true;
        };
    }, [itemId]);

    return { item, isLoading: item === undefined, error };
}