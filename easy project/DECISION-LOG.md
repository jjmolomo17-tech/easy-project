# Decision Log

## Decision: Do not gate browsing behind forced signup
- Context: Thabo asked for signup to be required before any item is visible, explicitly to capture emails ("growth hack lol"). The minimum bar also requires a working search/filter home screen, which implies visitors need to actually see items.
- Options I considered: (1) Build the forced signup wall exactly as asked. (2) Remove auth entirely for v1. (3) Let anyone browse and filter freely, but require an account only at the point of booking or messaging.
- What I chose and why: Option 3. Blocking the entire product behind a signup form is a classic dark pattern — it optimizes for email capture over user trust, and for a marketplace with near-zero listings, an empty signup wall is the fastest way to make the app feel dead rather than "alive." Requiring an account at booking is the natural, honest point to ask for one, since it's genuinely needed there (confirmation, contact info).
- What I gave up: Thabo loses the guaranteed email capture on every visitor. I noted this explicitly in FOUNDER-RESPONSE.md along with the tradeoff, and suggested an optional newsletter opt-in on browse instead, which captures interested users without blocking uninterested ones.

## Decision: Place the auth/contact-details step between date selection and confirmation, not before it
- Context: Thabo's brief asked for signup to be forced before any part of the app is usable ("make people sign up BEFORE they can see anything, that way we capture emails. Force it."). I'd already decided to reshape this rather than build it as asked (see earlier decision on browsing without forced signup), but the booking flow needed its own concrete answer to *where* contact details get collected.
- Options I considered: (1) Collect name/email as the very first step of the booking flow, before dates are even picked. (2) Collect them at the very end, silently, using placeholder/mock identity data instead of asking the user anything. (3) Let the user pick dates and agree to terms first, then ask for name/email as the last step before confirmation.
- What I chose and why: Option 3. Asking for personal details before someone has even chosen dates adds friction to a step they might abandon anyway, and front-loading it echoes the exact forced-signup pattern I'd already pushed back on. Asking at the end, right before confirmation, means the request for information is directly tied to why it's needed (confirming an actual booking) rather than feeling arbitrary. Option 2 was rejected outright — silently fabricating a "logged in" state with no real user input would be dishonest UI, not a genuine simplification.
- What I gave up: A slightly longer path to seeing the confirmation screen, since the user fills in a form at step 2 instead of it being pre-filled or skipped. I judged this small friction worth it for consistency with the "ask only when needed" principle applied elsewhere in the app.
---

## Decision: Cut the fake "N people are looking at this" urgency counter
- Context: Thabo wants a live-looking countdown/urgency indicator on every item, inspired by another app he'd seen, to create urgency and make the app "feel alive."
- Options I considered: (1) Hardcode a random number on each item as requested. (2) Build it against real view-tracking data. (3) Cut it from this sprint and address the "feels alive" goal a different way.
- What I chose and why: Option 3. With no backend and effectively zero real users at launch, any number shown would be fabricated — the feature only works by lying to users about demand, which undermines the exact trust Thabo says he wants to build. Fabricated social proof is a manipulative pattern, not a growth trick, and it's explicitly the kind of "correctly built but bad idea" the assessment penalizes. I addressed "feels alive" instead through empty-state copy and visual design polish on the browse screen.
- What I gave up: No artificial urgency signal on item cards. If Thabo wants this later, it needs real view-count data from an actual backend — I noted this as a legitimate v2 feature once that data exists.

---

## Decision: Cut "make it look busy" fake listings/fake activity
- Context: Thabo wants the app to look busy with activity even before real users exist, "so people trust it."
- Options I considered: (1) Seed the app with fake user accounts and fake recent activity to simulate a busy marketplace. (2) Show a small number of real, clearly-labeled seed listings with an honest empty state where there's genuinely nothing yet. (3) Do nothing and leave sparse screens as-is.
- What I chose and why: Option 2. Fake activity is the same trust problem as the urgency counter — it's not a UI decision, it's a decision to misrepresent the state of the product to the people it's trying to win over. If a new user later realizes the "3 neighbors nearby" they saw were fabricated, that's a far worse trust hit than an honest "be the first to list here" empty state.
- What I gave up: The app looks less immediately "busy" on first load with zero real users. I framed this in FOUNDER-RESPONSE.md as a short-term cost that protects longer-term trust, which matters more for a community marketplace than for a one-off transaction app.

---

## Decision: Defer real-time messaging between borrower and owner
- Context: Thabo listed messaging as a "maybe, if you have time" feature in a brief that otherwise asks for roughly three months of scope in one sprint.
- Options I considered: (1) Build a minimal in-app chat UI with mocked message state. (2) Fake it with a "Contact owner" mailto/phone link as a placeholder. (3) Omit it entirely from this sprint and flag it as next-sprint work.
- What I chose and why: Option 3, with option 2 as the honest stand-in noted in FOUNDER-RESPONSE.md. Real messaging needs persistence, notification handling, and eventually real-time sync — none of which exist without a backend, and building a chat UI with no working backend behind it would be exactly the kind of "beautiful screen that doesn't work" the brief warns against. Thabo himself flagged this as optional, which made it the easiest, most defensible cut.
- What I gave up: No in-app communication channel in v1. Borrowers and owners can't coordinate details before a confirmed booking; I flagged a "Contact owner" fallback as a cheap interim option if this becomes a blocker before messaging is built properly.

---

## Decision: Defer offline support and "real-time" sync
- Context: Thabo asked for the app to "work offline" and be "real-time," alongside a dozen other features, in a single sprint with no backend.
- Options I considered: (1) Attempt basic offline caching with a service worker. (2) Fake "real-time" updates with a polling interval against mock data. (3) Cut both from this sprint entirely.
- What I chose and why: Option 3. Offline support (service workers, cache strategy, conflict handling) and real-time sync are both substantial, backend-dependent engineering efforts on their own — genuinely weeks of work each, not sprint features. Faking either against mock data would create a false impression of capability that doesn't exist, which is worse than not having the feature. Better to ship a fast, correct, non-offline app than a half-working offline shell.
- What I gave up: The app requires a live connection and shows a static snapshot of data rather than live updates. I named both explicitly as "not in this sprint" in FOUNDER-RESPONSE.md rather than letting them go unaddressed.

---

## Decision: Defer ratings & reviews
- Context: Thabo wants ratings and reviews as part of the "premium, trustworthy" feel of the app.
- Options I considered: (1) Build a basic star-rating UI with mock scores attached to each owner. (2) Omit ratings entirely for v1.
- What I chose and why: Option 2. Reviews are a trust and moderation feature, not just a UI widget — a shipped ratings system with no real reviews behind it (because there are no real users yet) would be functionally the same trust problem as the fake urgency counter: numbers with nothing real behind them. Reviews only become meaningful once there's real transaction history to review.
- What I gave up: No social-proof signal on owner profiles in v1. Flagged as a natural v2 feature once bookings are actually happening and real reviews can accumulate.

---

## Decision: Defer map view, wishlist, referral codes, and dark mode
- Context: Thabo's brief appends four more features in a single run-on sentence ("And a map. And a wishlist. And referral codes. And dark mode.") on top of everything else, with no indication any of them is more important than the core booking flow.
- Options I considered: (1) Attempt shallow versions of all four to check every box. (2) Pick one or two to build partially. (3) Cut all four from this sprint and name them clearly as deferred, not forgotten.
- What I chose and why: Option 3. None of these four are required for a first version of a working marketplace — a map needs a real geodata/maps API integration, referral codes need backend tracking to mean anything, and wishlist/dark mode are genuinely nice-to-haves that don't affect whether the core loop (find a tool, book it) works. Attempting shallow versions of four extra features risked leaving the actually-required booking flow half-finished, which the brief explicitly warns against ("10 things that are half-built").
- What I gave up: A visibly longer feature list to show investors. I addressed this directly in FOUNDER-RESPONSE.md: a tight, fully-working core flow demonstrates more engineering judgment to a technical investor than four shallow extras bolted onto a shaky base.

---

## Decision: Typed, structured mock data layer instead of inline placeholder data
- Context: The brief explicitly requires no backend but a data layer typed and structured as if a real API were coming.
- Options I considered: (1) Scatter loosely-typed placeholder objects directly inside components. (2) Use `any`/loose types for speed since there's no real API yet. (3) Define full TypeScript interfaces (`Item`, `Owner`, `Location`, `BookingRequest`) in a dedicated `types/` folder and build mock data against those types.
- What I chose and why: Option 3. Strict mode with no `any` is a hard rule, and designing real interfaces now means swapping mock data for a real API later is a data-source change, not a rewrite — components consume the type, not the mock file directly.
- What I gave up: More upfront time spent on type definitions before any screen was visible, versus the faster (but riskier) route of writing loose objects and typing them later.

---

## Decision: Booking flow as two explicit steps (select dates → confirm) rather than one form
- Context: The brief requires a booking flow of at least two steps ending in a clear confirmation, and Thabo described it as "pick your dates, confirm, done."
- Options I considered: (1) A single form with date pickers and a submit button that immediately confirms. (2) A two-step flow: a date-selection screen, then a review/confirm screen showing the item, dates, and owner before final submission.
- What I chose and why: Option 2. A single-step form technically satisfies "pick dates, confirm" but gives the user no chance to review what they're actually committing to, which is a poor pattern for anything resembling a real booking (people misclick dates). A distinct review step also makes the "confirmation" state unambiguous, which the brief calls out as a requirement.
- What I gave up: One extra screen/click in the flow versus the fastest possible path. I judged the small added friction worth it for clarity and to avoid accidental bookings.