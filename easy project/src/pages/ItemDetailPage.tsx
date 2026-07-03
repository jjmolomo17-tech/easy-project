import { useParams, Link, Navigate } from "react-router-dom";
import { useItem } from "../hooks/useItem.ts";
import { formatPrice } from "../utils/formatPrice.ts";

/**
 * Full detail view for a single item, reached via /items/:itemId.
 * Renders one of four states: error, loading, not-found (redirect),
 * or the loaded item — in that priority order.
 */
export function ItemDetailPage() {
    const { itemId } = useParams<{ itemId: string }>();
    const { item, isLoading, error } = useItem(itemId);

    if (error) return <p>{error}</p>;
    if (isLoading) return <p>Loading item...</p>;

    // Covers both "no such id" and "id belongs to a removed item" —
    // useItem already filters removed items out, so both cases land here.
    if (!item) return <Navigate to="/" replace />;

    // Only "available" items can be booked; "paused" items are shown
    // but the booking action is disabled rather than hidden.
    const isBookable = item.status === "available";

    return (
        <main>
            <Link to="/">&larr; Back to browse page</Link>

            {item.photoUrls.length > 0 ? (
                <img src={item.photoUrls[0]} alt={item.title} width={480} height={320} />
            ) : (
                <div
                    role="img"
                    aria-label={`${item.title} — no photo available`}
                    style={{ width: 480, height: 320, background: "#eee" }}
                />
            )}

            <h1>{item.title}</h1>
            <p>{item.description}</p>

            <section aria-label="Owner">
                <p>Listed by {item.owner.displayName}</p>
                <p>
                    {item.owner.rating === null
                        ? "No ratings yet"
                        : `★ ${item.owner.rating.toFixed(1)} (${item.owner.ratingCount} reviews)`}
                </p>
            </section>

            <p>{item.distanceKm === null ? "Distance unknown" : `${item.distanceKm} km away`}</p>
            <p>{formatPrice(item.price)}</p>

            {isBookable ? (
                <Link to={`/items/${item.id}/book`}>
                    <button type="button">Hire Now</button>
                </Link>
            ) : (
                // Explains *why* booking isn't available rather than just
                // hiding the button, so the user isn't left guessing.
                <p>This item is currently paused by its owner and can't be booked right now, but no worries new items being added on the page soon!</p>
            )}
        </main>
    );
}


// Item detail view: shows photos, owner info, and booking CTA
// BOOK NOW button triggers booking flow state machine
