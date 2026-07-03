/* ============================================================
 * Mock data. Pretend this is the JSON a real API would return.
 * Notice the deliberately awkward reality in here:
 *  - some items have no photos
 *  - some have no price (free)
 *  - some owners have no rating yet (null)
 *  - some items are "paused" and must not be bookable
 *  - distanceKm is null for some (viewer hasn't shared location)
 * Your UI has to handle ALL of these gracefully. That is the point.
 *
 * You may reshape how you load/serve this (a fake async fetch, a
 * context, a hook) — that architectural choice is yours to make
 * and to defend in your Decision Log.
 * ============================================================ */

import type { Item } from "./types.ts";

export const ITEMS: Item[] = [
  {
    id: "itm_001",
    title: "Cordless Drill (18V)",
    category: "power-tools",
    description: "Solid drill, two batteries, works for most home jobs.",
    photoUrls: ["https://www.chavda.com/cdn/shop/files/universalimpact-18v-100052523-hires-png-rgb-oneux-339838_w_1600_h_800_536x523_d9c87b99-9662-44c6-9d5e-be695d57264c.png?crop=center&height=700&v=1754470774&width=700"],
    price: { amountCents: 5000, period: "day" },
    owner: { id: "usr_a", displayName: "Lisemelo", rating: 3.8, ratingCount: 24, joinedISO: "2025-02-11" },
    distanceKm: 1.2,
    status: "available",
    postedISO: "2026-06-20",
  },
  {
    id: "itm_002",
    title: "Extension Ladder (3m)",
    category: "outdoor",
    description: "Aluminium, light, fits in a hatchback.",
    photoUrls: ["https://tse1.mm.bing.net/th/id/OIP.nAe1EZF0REKISB2y7gFOuAHaHa?cb=thfc1falcon4&rs=1&pid=ImgDetMain&o=7&rm=3"],
    price: { amountCents: 0, period: "day" },
    owner: { id: "usr_b", displayName: "Sipho", rating: null, ratingCount: 0, joinedISO: "2026-06-18" },
    distanceKm: null,
    status: "available",
    postedISO: "2026-06-25",
  },
  {
    id: "itm_003",
    title: "Pressure Washer",
    category: "outdoor",
    description: "Great for driveways and walls. Bring your own hose.",
    photoUrls: ["https://diyshop.co.za/cdn/shop/files/pressure-washer-cordless-20-24-ingco-tool-only.webp?height=228&v=1781011429"],
    price: { amountCents: 12000, period: "day" },
    owner: { id: "usr_c", displayName: "Fatima", rating: 4.2, ratingCount: 6, joinedISO: "2025-11-02" },
    distanceKm: 4.7,
    status: "paused",
    postedISO: "2026-05-30",
  },
  {
    id: "itm_004",
    title: "Stand Mixer",
    category: "kitchen",
    description: "For big baking days. Comes with whisk + dough hook.",
    photoUrls: ["https://tse2.mm.bing.net/th/id/OIP.QK9UeIYjwiJz2pvp9sfnsAHaHa?cb=thfc1falcon4&rs=1&pid=ImgDetMain&o=7&rm=3"],
    price: { amountCents: 20000, period: "day" },
    owner: { id: "usr_d", displayName: "Grace", rating: 5.0, ratingCount: 2, joinedISO: "2026-01-19" },
    distanceKm: 0.6,
    status: "available",
    postedISO: "2026-06-28",
  },
  {
    id: "itm_005",
    title: "Folding Tables (x4)",
    category: "party",
    description: "Set of four trestle tables. Good for events.",
    photoUrls: ["https://image.made-in-china.com/202f0j00mojWONqGQUev/Stainless-Steel-201-Commercial-Folding-Work-Table-Without-Splashback.webp"],
    price: { amountCents: 15000, period: "day" },
    owner: { id: "usr_e", displayName: "Themba", rating: 3.9, ratingCount: 11, joinedISO: "2024-09-14" },
    distanceKm: 8.1,
    status: "available",
    postedISO: "2026-06-15",
  },
  {
    id: "itm_006",
    title: "Lawn Mower (petrol)",
    category: "garden",
    description: "Self-propelled. A bit loud but cuts fast.",
    photoUrls: ["https://diyshop.co.za/cdn/shop/files/lawnmower-51-cordless-push-2x-20-ingco-tool-only.webp?height=228&v=1781010580"],
    price: null,
    owner: { id: "usr_f", displayName: "Anele", rating: 4.5, ratingCount: 18, joinedISO: "2025-07-07" },
    distanceKm: 2.9,
    status: "available",
    postedISO: "2026-06-22",
  },
  {
    id: "itm_007",
    title: "Tile Cutter",
    category: "hand-tools",
    description: "Manual tile cutter, up to 600mm.",
    photoUrls: ["https://diyshop.co.za/cdn/shop/files/tile-cutter-waldo-400.webp?height=228&v=1781006351"],
    price: { amountCents: 3000, period: "day" },
    owner: { id: "usr_c", displayName: "Fatima", rating: 4.2, ratingCount: 6, joinedISO: "2025-11-02" },
    distanceKm: 4.7,
    status: "available",
    postedISO: "2026-06-11",
  },
  {
    id: "itm_008",
    title: "Gazebo (3x3m)",
    category: "party",
    description: "Pop-up gazebo, white. One pole has tape on it, still fine.",
    photoUrls: ["https://picsum.photos/seed/gazebo/600/400"],
    price: { amountCents: 0, period: "day" },
    owner: { id: "usr_e", displayName: "Themba", rating: 3.9, ratingCount: 11, joinedISO: "2024-09-14" },
    distanceKm: null,
    status: "removed",
    postedISO: "2026-04-02",
  },
];

/**
 * A fake async loader so you can practise typing data you don't
 * control yet. Use it or replace it — your call, but justify it.
 */
export function fetchItems(): Promise<Item[]> {
  return new Promise((resolve) => setTimeout(() => resolve(ITEMS), 400));
}
