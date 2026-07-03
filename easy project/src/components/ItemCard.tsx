import { Link } from "react-router-dom";
import type { Item } from "../data/types.ts";
import { formatPrice } from "../utils/formatPrice.ts";

interface ItemCardProps {
    item: Item;
}

/**
 * A single item preview shown on the Browse page.
 * Handles three "messy data" cases from the mock dataset directly:
 *  - no photos            → placeholder box instead of a broken <img>
 *  - unknown distance      → explicit "Distance unknown" text
 *  - owner has no rating   → explicit "No ratings yet" instead of "0 ★"
 * Showing "0 ★" for an unrated owner would misleadingly read as a bad
 * rating rather than an absent one, so it's handled as its own state.
 */
export function ItemCard({ item }: ItemCardProps) {
    const photo = item.photoUrls[0];
    const isPaused = item.status === "paused";

    return (
        // Dimmed styling gives a quick visual signal that a paused item
        // is present but not currently actionable, without hiding it.
        <li style={{ opacity: isPaused ? 0.6 : 1 }}>
            <Link to={`/items/${item.id}`}>
                {photo ? (
                    <img src={photo} alt={item.title} width={240} height={160} />
                ) : (
                    // role="img" + aria-label keeps this accessible to screen readers
                    // even though it's a styled <div>, not a real <img>.
                    <div
                        role="img"
                        aria-label={`${item.title} — no photo available`}
                        style={{
                            width: 240,
                            height: 160,
                            background: "#eee",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        No photo yet
                    </div>
                )}

                <h2>{item.title}</h2>
                <span className="category-chip">{item.category.replace("-", " ")}</span>
                {isPaused && <p>Currently paused by owner</p>}
                <p>{item.distanceKm === null ? "Distance unknown" : `${item.distanceKm} km away`}</p>
                <div className="price-tag">{formatPrice(item.price)}</div>
                <p className="rating">
                    {item.owner.rating === null ? "No ratings yet" : `★ ${item.owner.rating.toFixed(1)} (${item.owner.ratingCount})`}
                </p>
            </Link>
        </li>
    );
}