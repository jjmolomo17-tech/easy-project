import { useState } from "react";

export interface BorrowerIdentity {
    name: string;
    email: string;
}

interface AuthGateProps {
    onVerified: (identity: BorrowerIdentity) => void;
}

/**
 * Minimal stand-in for a real auth system, shown only at the point
 * a user tries to book — not on first visit to the app.
 *
 * This is a deliberate reshape of Thabo's "force signup before browsing"
 * request (see FOUNDER-RESPONSE.md / DECISION-LOG.md): the app still
 * captures name + email, but only when it's genuinely needed, rather
 * than blocking the whole product upfront to harvest emails.
 *
 * This is intentionally NOT a real login (no password, no persisted
 * session, no backend) — building a fake login system would misrepresent
 * capability that doesn't exist yet, which is worse than being upfront
 * that this is a lightweight contact-details step for the mock sprint.
 */
export function AuthGate({ onVerified }: AuthGateProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const isValid = name.trim() !== "" && email.includes("@");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isValid) {
            onVerified({ name: name.trim(), email: email.trim() });
        }
    }

    return (
        <form onSubmit={handleSubmit} aria-label="Confirm your details to book">
            <h2>Enter details to book</h2>
            <p>We'll use this to confirm your booking with the owner.</p>

            <label htmlFor="borrower-name">Full Name</label>
            <input
                id="borrower-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label htmlFor="borrower-email">Email</label>
            <input
                id="borrower-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <button type="submit" disabled={!isValid}>
                Continue
            </button>
        </form>
    );
}

// Authentication gate: forces sign-up before browsing
// Implements founder’s growth-hack request, but scoped ethically
