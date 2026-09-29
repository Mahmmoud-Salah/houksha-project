# Houksha Shop — Conversion & UX Audit

Live-tested at desktop (1440px) and mobile (390px, iPhone-width) on the current build. Every finding below was reproduced, not guessed — screenshotted, or checked directly against the source.

---

## Pass 1 — Designer teardown

You have four products. A sneaker, a jacket, headphones, and an espresso machine. That's not a "tightly curated shop," that's a placeholder catalog that happens to have real photos. The hero copy promises curation it can't back up in one scroll.

**The hero image is selling a different store.** That flat-lay — jeans, a cream sweater, suede boots — is a nice photo. None of those items exist in the catalog. A visitor's very first impression sets an expectation the product grid immediately breaks. That's not a style choice, that's bait-and-switch, even if accidental.

**Two buttons, one destination, zero reason to exist separately.** "Shop the collection" and "Browse bestsellers" both scroll to the exact same `#products` anchor. You spent design weight on a decision that doesn't decide anything. Either give the secondary button a real job (filter to bestsellers, go somewhere else) or cut it — a single confident CTA converts better than two vague ones.

**You said the same thing twice in a row.** The hero's mini trust row (free shipping / secure checkout / 30-day returns) is immediately followed by a full-width TrustStrip repeating three of the same four claims in slightly different words. That's the second scroll position on the page — prime real estate — spent re-reading what was already said instead of building momentum toward the product grid.

**148 reviews that don't exist.** Every product shows a specific, oddly-precise review count and a star rating, and there is no way, anywhere, to read a single one of those reviews. The moment a shopper notices that, every other number on the page (the rating, the "4.8 average," the reviewer count) reads as made up — because right now, it is.

**You're selling a jacket with no size selector.** There's a quantity stepper — as if someone routinely buys two of the same leather jacket in an unspecified size — but no way to say "Medium" or "Large." This isn't a nice-to-have, it's a hole in the purchase flow. Same story implicitly for the sneakers.

**The cart doesn't survive a page refresh.** I mean this literally: hit reload on the cart page, or the checkout page, or open the site in a new tab, and the cart is empty. There's no localStorage, no persistence layer, nothing. Every real e-commerce cart survives a refresh. This one doesn't survive a twitchy Cmd+R.

**When something breaks, the site says nothing.** Visit `/product/999` and you get one line of unstyled black text reading "Product not found," floating in a sea of white with no button back to the shop. Visit `/checkout` directly with an empty cart and you get silently teleported to an empty `/cart` — no toast, no explanation, nothing. Compare that to the actual empty-cart state, which has an icon, a message, and a CTA. You clearly know how to build a good empty state. You just didn't build one everywhere it's needed.

**On mobile, the value proposition is off-screen.** The hero image is reordered to show first on small screens. On a 390×844 viewport, that image alone eats close to half the visible screen before a single word of headline copy appears. A first-time mobile visitor's first impression is a stock photo, not "goods worth keeping."

---

## Pass 2 — First-time user, clicking through cold

I land on the homepage. Nice headline, "keeping" in purple is a good touch. I see a photo of a sweater-and-jeans flat-lay with a floating "4.8 average rating" card — looks premium. I scroll.

The product grid has four things: sneakers, a jacket, headphones, an espresso machine. I'm a little thrown — I was expecting more of whatever that flat-lay photo was showing. I don't see jeans or a sweater anywhere. Weird, but I shrug it off and click the jacket since it has the best rating.

On the product page: nice photo, good price, "In stock, ready to ship." I go to buy it and there's... a quantity stepper, but no size. I'm buying a leather jacket and nobody is asking me what size I wear. I pick quantity 1 and hit "Buy now" anyway, assuming maybe sizing gets asked at checkout.

It doesn't. It takes me straight to checkout with an order summary and a payment form. No size field appeared anywhere. Now I'm a little worried — am I about to pay for a jacket that might not fit, with no way to specify? I hesitate here. This is the moment I'd genuinely consider closing the tab.

I decide to poke around instead of paying (I'm testing, not really buying). I hit refresh out of habit to see if the size question shows up on reload.

My cart is gone. Not "the page reset" — gone, empty, like I never added anything. I have to go find the jacket again. If this happened to me on a real purchase, I would not try a third time.

I go back to the homepage and try the "148 reviews" link on the jacket to see what people say about sizing, since the site clearly isn't going to tell me. There's no link. The number's just... there. Decorative. That's the second time in five minutes this site has told me something it can't back up.

Last thing I try: I type a nonsense product URL to see what happens (I do this out of habit on every new site). I get a bare line of black text on a white page with no way back except the browser back button. On a site that otherwise looks this polished, that felt like hitting a wall that wasn't supposed to be there.

I never got as far as actually paying. Not because the payment form looked bad — it didn't, Apple Pay / STC Pay / Samsung Pay all being right there is genuinely more trust-building than most sites this size manage. I dropped off before that, on sizing and on the cart disappearing under me.

---

## Fix list, by priority

### 🔴 Critical — blocks a sale or breaks trust outright

1. **Cart has no persistence.** `CartContext.jsx` holds cart state in plain `useState`. Any reload, closed tab, or accidental browser-back wipes it completely — verified by reloading mid-checkout. Fix: persist to `localStorage` (or `sessionStorage` at minimum), rehydrate on mount.
2. **Checkout silently redirects to an empty cart with zero explanation.** `CheckoutPage.jsx`'s `useEffect` guard (`if (cart.length === 0) navigate('/cart', { replace: true })`) fires with no toast, no message — reproduced by visiting `/checkout` directly and by refreshing on checkout. At minimum, show a message on the cart page explaining why they landed there ("Your cart was empty, so we brought you back here").
3. **No size selection on apparel.** The Leather Jacket (and Sneakers) can be bought with a quantity but no size. `ProductPage.jsx` needs a size selector before quantity for any apparel/footwear product — this blocks a real purchase decision, not just polish.
4. **"Product not found" page is unstyled and dead-ends the user.** `ProductPage.jsx` (`if (!product) return <div style={{padding:40}}>Product not found</div>`) — no CTA, doesn't match the site's own `.empty-state` pattern already used on the cart and payment-callback pages. Reuse that pattern here.

### 🟠 High impact — real conversion loss, fix soon

5. **Hero image doesn't match the catalog.** The flat-lay photo (jeans, sweater, boots) implies a product range the shop doesn't carry. Replace with an image actually representative of the 4 real products, or expand the catalog to match the hero's promise.
6. **Two hero CTAs point to the same place.** `Hero.jsx` — "Shop the collection" and "Browse bestsellers" both link to `#products`. Give the secondary button a distinct destination or remove it.
7. **Trust claims repeated twice in a row.** `Hero.jsx`'s `.hero-trust` row and the `TrustStrip` component immediately below it restate the same 3–4 claims. Differentiate them or cut one — use the freed-up space for something that actually moves the sale forward.
8. **Mobile hero buries the headline below the fold.** `index.css`, `.hero-visual-col { order: -1 }` at the 860px breakpoint — the image shows before any value-prop text on mobile. Consider showing the eyebrow + headline first on small screens, image second.
9. **Reviews are unverifiable numbers.** Every product shows a specific rating/review count (`products.js`) with no reviews ever visible. Either add a real (even short) reviews list per product, or soften the copy so it doesn't imply reviews a user can never read.
10. **Catalog is 4 SKUs across 4 unrelated categories.** Undercuts "tightly curated shop" the moment someone scrolls. Either group products under a coherent theme or adjust the copy to match reality.
11. **No feedback near the "Add to cart" click itself.** The only confirmation is a badge pulse in the header, outside the user's focus. Consider a brief inline state change on the button itself ("Added ✓") in addition to the badge.
12. **Browser tab title never changes.** Every route renders as "Houksha Shop" — add per-page `document.title` updates (product name, "Cart", "Checkout") so multi-tab shopping doesn't turn into guesswork.

### 🟢 Nice to have — polish

13. **Hero carousel dots are small and low-contrast** — most visitors won't notice the image is a 5-slide carousel at all. Consider a slightly larger/higher-contrast active dot, or a subtle "1/5" indicator.
14. **Announcement bar wraps to two lines on mobile**, costing extra height above the fold before real content starts. Shorten the copy or hide the second clause under ~400px.
15. **No email capture anywhere on the site.** A visitor who isn't ready to buy today has no way to be brought back later — even a simple footer signup would help.
16. **"Powered by Moyasar" + the test-mode warning banner are visible at checkout.** Expected while running on a test key — not a code fix, just a pre-launch checklist item (swap to a live key before sharing this outside your own testing).
17. **Quantity stepper appears with no size selector nearby**, which will read backward once sizing is added — worth deciding the final field order (size, then quantity) now rather than retrofitting later.

---

*Everything above was verified against the running app (both viewport widths) rather than inferred from the code alone, except where noted as a direct code reference.*
