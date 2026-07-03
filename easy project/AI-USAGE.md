## AI moment 1
What I was trying to do: Scaffold a responsive navigation bar (Navbar.tsx) that works across all screens.

The prompt I wrote: “Scaffold a Navbar.tsx with comments, so you have a consistent navigation bar across all screens.”

What the AI gave back: A Navbar.tsx with links to Home, Wishlist, Profile, and Logout, styled with Tailwind.

What was wrong / weak / risky about it: The AI added Wishlist and Profile links even though those features were out of scope for the sprint (per the brief, they were founder “wishlist” ideas, not core). Including them would have created broken routes.

What I changed and why: I trimmed the Navbar to only include Home and Logout, keeping the UI consistent but scoped to the sprint deliverables. This avoided errors and respected the assessment’s emphasis on ruthless scoping.

## AI moment 2
What I was trying to do: Fix TypeScript errors in Home.tsx where properties didn’t match the Item type.

The prompt I wrote: “Fix my Home.tsx so no errors/problems show.”

What the AI gave back: A corrected file, but it still referenced item.name, item.image, and item.free.

What was wrong / weak / risky about it: My mock data defined title, photoUrls, price, owner, and distanceKm. The AI’s code didn’t align with the actual type definitions, so TypeScript errors persisted.

What I changed and why: I replaced name → title, image → photoUrls[0] with a placeholder fallback, free → derived from price.amountCents === 0, and distance → distanceKm. This ensured strict typing and eliminated all errors.

## AI moment 3 (the one where AI was wrong)
What I was trying to do: Implement ItemDetail.tsx to show item details with a BOOK NOW button.

The prompt I wrote: “Give me the correct code for ItemDetail without the errors and problems.”

What the AI gave back: A component that still used item.name, item.image, item.free, and item.rating.

What was wrong / weak / risky about it: This was confidently wrong — the AI assumed a simpler Item type, but my mock data used title, photoUrls, price, owner.rating, and distanceKm. If I had shipped the AI’s version, the app would not compile.

What I changed and why: I rewrote the component to use item.title, item.photoUrls[0] || placeholder, price.amountCents for currency, owner.displayName and owner.rating, and distanceKm. This aligned with the typed mock data and removed all errors.