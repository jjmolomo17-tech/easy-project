# AI Usage Log

You are expected to use AI well and prove it. At least 3 substantial entries.
At least one must be a time AI was confidently wrong and you caught it.

## AI moment 1
- What I was trying to do: Build a hook to load a single item by id from the mock async data source (`useItem`), for the Item Detail page.
- The prompt I wrote: "Write a React hook in TypeScript that fetches an item by id from an async function `fetchItems()` that returns `Promise<Item[]>`, and returns the matching item, a loading flag, and an error."
- What the AI gave back: A hook using a single `item: Item | null` state, initialized to `null`, set to the found item (or `null` if not found) once the fetch resolves, with a separate `isLoading` boolean starting at `true`.
- What was wrong / weak / risky about it: Collapsing "still loading" and "genuinely not found" into two different variables (`item: null` + `isLoading: false`) technically works, but it's fragile — any component using the hook has to remember to check `isLoading` before trusting a `null` item, and it's easy to accidentally render "item not found" for a split second while still loading, since both states briefly look similar during the fetch.
- What I changed and why: I changed the item state to `Item | null | undefined`, where `undefined` means "still loading" and `null` means "checked, not found." This makes `isLoading` a derived value (`item === undefined`) instead of a second independent piece of state that could get out of sync with the actual data, and makes it impossible to accidentally render a false "not found" while the fetch is still in flight.

## AI moment 2
- What I was trying to do: Handle the messy real-world fields in the mock data (`owner.rating: number | null`, `distanceKm: number | null`, `photoUrls: string[]` possibly empty) when rendering `ItemCard`.
- The prompt I wrote: "Given this TypeScript type for an Item with owner.rating as number | null, write JSX that displays the rating, or a fallback if it's null."
- What the AI gave back: A ternary that displayed `item.owner.rating ?? 0` with a star icon, e.g. showing "★ 0.0" when the rating was null.
- What was wrong / weak / risky about it: Using `?? 0` treats "no ratings yet" the same as "this owner has a 0-star rating," which is misleading — a brand-new owner with zero reviews isn't the same as an owner with a genuinely bad rating, and showing "★ 0.0" would unfairly make new listings look untrustworthy.
- What I changed and why: I replaced the fallback with an explicit branch: if `rating === null`, render "No ratings yet" as plain text instead of a star score. I applied the same explicit-null-check pattern to `distanceKm` ("Distance unknown" instead of defaulting to 0 km, which would have falsely implied the item was right next door) and to empty `photoUrls` arrays (a labeled placeholder box instead of a broken image or a fallback stock photo that misrepresents the actual listing).

## AI moment 3 (the one where AI was wrong)
- What I was trying to do: Validate the date range in the booking flow (`useBookingDraft`) so a booking can't be confirmed with an invalid range.
- The prompt I wrote: "Write a TypeScript check for whether a booking date range is valid, given startISO and endISO strings."
- What the AI gave back: A check using strict string comparison, `endISO > startISO`, returning `true` only when the end date is strictly after the start date.
- What was wrong / weak / risky about it: This was confidently wrong for my use case — it silently rejects same-day bookings (start date = end date), which is a completely normal booking for an item like a drill or ladder that someone wants for a single afternoon. The AI's output looked correct (it does properly reject reversed ranges) and I nearly shipped it as-is, but manually testing a one-day booking in the form immediately surfaced the bug: the "Continue" button stayed disabled with valid-looking matching dates and no visible error message, which would have been a confusing dead end for a real user.
- What I changed and why: I changed the comparison to `endISO >= startISO` so same-day bookings are valid, and added explicit empty-string checks before comparing so an unfilled date field can't accidentally pass the check. I verified the fix by manually testing three cases: same start/end date (now succeeds), end date before start date (still correctly fails), and empty fields (still correctly fails).
