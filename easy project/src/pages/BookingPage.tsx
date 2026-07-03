import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useItem } from "../hooks/useItem";
import { useBookingDraft } from "../hooks/useBookingDraft";
import { AuthGate, type BorrowerIdentity } from "../components/AuthGate";
import { formatPrice } from "../utils/formatPrice";

// The booking flow has three internal phases. "auth" only appears once,
// right before confirmation — not before dates are even picked, so a
// user can explore booking options before committing any personal info.
type Step = "dates" | "auth" | "confirmed";

export function BookingPage() {
    const { itemId } = useParams<{ itemId: string }>();
    const { item, isLoading, error } = useItem(itemId);

    const [step, setStep] = useState<Step>("dates");
    const [borrower, setBorrower] = useState<BorrowerIdentity | null>(null);

    // useBookingDraft needs a real itemId, so this hook call must happen
    // after itemId is known to be a string — guarded below with early returns.
    const { draft, setRange, agreedToTerms, setAgreedToTerms, isValid } =
        useBookingDraft(itemId ?? "");

    if (error) return <p>{error}</p>;
    if (isLoading) return <p>Loading item...</p>;
    if (!item) return <Navigate to="/" replace />;

    // Defence in depth: even if someone lands on this URL directly via a
    // stale link, a paused item can't be booked here either.
    if (item.status !== "available") {
        return <Navigate to={`/items/${item.id}`} replace />;
    }

    function handleDatesSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isValid) setStep("auth");
    }

    function handleAuthVerified(identity: BorrowerIdentity) {
        setBorrower(identity);
        setStep("confirmed");
    }

    return (
        <main>
            <Link to={`/items/${item.id}`}>&larr; Back to {item.title}</Link>
            <h1>Book: {item.title}</h1>
            <p>{formatPrice(item.price)}</p>

            {/* Step 1: pick dates */}
            {step === "dates" && (
                <form onSubmit={handleDatesSubmit}>
                    <label htmlFor="start-date">Start date</label>
                    <input
                        id="start-date"
                        type="date"
                        value={draft.range.startISO}
                        onChange={(e) => setRange((r) => ({ ...r, startISO: e.target.value }))}
                        required
                    />

                    <label htmlFor="end-date">End date</label>
                    <input
                        id="end-date"
                        type="date"
                        value={draft.range.endISO}
                        onChange={(e) => setRange((r) => ({ ...r, endISO: e.target.value }))}
                        required
                    />

                    <label>
                        <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                        />
                        I agree to return this item in the condition I received it
                    </label>

                    <button type="submit" disabled={!isValid}>
                        Continue
                    </button>
                </form>
            )}

            {/* Step 2: auth gate, shown only now — not on app entry */}
            {step === "auth" && <AuthGate onVerified={handleAuthVerified} />}

            {/* Step 3: confirmation */}
            {step === "confirmed" && borrower && (
                <section aria-label="Booking confirmed">
                    <h2>Booking confirmed</h2>
                    <p>
                        {borrower.name}, your booking for <strong>{item.title}</strong> from{" "}
                        {draft.range.startISO} to {draft.range.endISO} is confirmed.
                    </p>
                    <p>A confirmation has been sent to {borrower.email}.</p>
                    <p>
                        <em>
                            (This is a mocked confirmation — no email is actually sent, since
                            there's no backend in this sprint. See DECISION-LOG.md.)
                        </em>
                    </p>
                    <Link to="/">Back to browse</Link>
                </section>
            )}
        </main>
    );
}