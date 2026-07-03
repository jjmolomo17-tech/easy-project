import { useState } from "react";
import type { AvailabilityRange, BookingDraft, ItemId } from "../data/types";

/**
 * Manages the in-progress booking form state across the two-step flow
 * (select dates -> confirm). Kept in a hook rather than inline in the
 * page component so the shape matches BookingDraft from types.ts exactly,
 * and so BookingPage itself stays focused on rendering/step logic.
 */
export function useBookingDraft(itemId: ItemId) {
    const [range, setRange] = useState<AvailabilityRange>({
        startISO: "",
        endISO: "",
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const draft: BookingDraft = {
        itemId,
        range,
        agreedToTerms,
    };

    // A booking is only ready to confirm once both dates are filled in,
    // the end date isn't before the start date, and terms are agreed.
    const isValid =
        range.startISO !== "" &&
        range.endISO !== "" &&
        range.endISO >= range.startISO &&
        agreedToTerms;

    return { draft, setRange, agreedToTerms, setAgreedToTerms, isValid };
}