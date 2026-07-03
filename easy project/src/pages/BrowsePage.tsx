import { useEffect, useState } from "react";
import { fetchItems } from "../data/items.ts";
import { useItemFilters } from "../hooks/useItemFilters.ts";
import { ItemCard } from "../components/ItemCard.tsx";
import type { Item, Category } from "../data/types.ts";

// Hardcoded from the Category union in types.ts. If the API's category
// list changes, this must be updated to match — a small maintenance
// cost accepted in exchange for a simple, typo-proof <select>.
const CATEGORIES: Category[] = ["power-tools", "hand-tools", "garden", "kitchen", "outdoor", "party", "other"];

/**
 * Home/browse screen: fetches items, then hands them to useItemFilters
 * for search/category/price filtering and renders the results.
 */
export function BrowsePage() {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch once on mount. fetchItems() simulates a real async API call
    // (400ms delay), so a loading state is a genuine requirement here,
    // not just decoration.
    useEffect(() => {
        fetchItems().then((data) => {
            setItems(data);
            setIsLoading(false);
        });
    }, []);

    const { filters, setFilters, filteredItems } = useItemFilters(items);

    if (isLoading) {
        return <p>Loading nearby items...</p>;
    }

    return (
        <main>
            <h1>Hire Tools With Us!</h1>
            <p style={{ color: "var(--muted)", marginTop: -8 }}>Tools near you</p>

            <div role="search" aria-label="Filter items">
                {/* Free-text search on title */}
                <input
                    type="text"
                    placeholder="Search tools..."
                    value={filters.query}
                    onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                    aria-label="Search"
                />

                {/* Category filter, built from the shared CATEGORIES list above */}
                <select
                    value={filters.category}
                    onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value as Category | "all" }))}
                    aria-label="Category"
                >
                    <option value="all">All categories</option>
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                {/* Price filter: free vs paid, matching formatPrice's null-check logic */}
                <select
                    value={filters.priceType}
                    onChange={(e) => setFilters((f) => ({ ...f, priceType: e.target.value as typeof f.priceType }))}
                    aria-label="Price"
                >
                    <option value="all">Free & paid</option>
                    <option value="free">Free only</option>
                    <option value="paid">Paid only</option>
                </select>
            </div>

            {/* Honest empty state instead of fabricated "busy" content —
          see FOUNDER-RESPONSE.md for why fake activity was cut. */}
            {filteredItems.length === 0 ? (
                <p>No tools match yet — be the first to list one nearby.</p>
            ) : (
                <ul>
                    {filteredItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </ul>
            )}
        </main>
    );
}