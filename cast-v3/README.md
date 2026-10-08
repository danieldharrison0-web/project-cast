# CAST V3 — luxury design preview

V3 lives in `cast-v3/` on the `cast-v3` branch. `cast-v2/`, the original root website, and logo artwork are unchanged. No production deployment configuration is added or modified.

## Local review

From the repository root, run `python3 -m http.server 8003 --bind 127.0.0.1` and open `http://localhost:8003/cast-v3/`. Codex Cloud localhost URLs are not accessible directly from an iPad.

## Protected iPad preview in Vercel

Use a separate project named `cast-v3-preview`, leaving the existing V2 and production projects alone. Before deploying website content, enable Vercel Authentication for Preview deployments. An unlisted URL is not access protection. If the import flow deploys before protection can be enabled, create/protect the empty project first. Verify protection covers the actual environment before proceeding.

Connect this repository, retain `main` as the Production Branch, and deploy `cast-v3` as a Preview. Use Framework: Other; Root Directory: repository root; no install command; Build Command: `sh cast-v3/build-preview.sh`; Output Directory: `cast-v3-preview-dist`. Do not connect a production domain. The build stages only V3 and its required artwork; it performs no deployment. Do not use the V2 build command, which copies only V2 files.

Open the generated Preview deployment URL followed by `/cast-v3/` in iPad Safari and authenticate through Vercel. Review homepage, Competitions, prize details, Collection, Account, My CAST and the demo founder workspace (footer link). Delete the temporary deployment when review finishes. Publication and preview access are not performed by this repository change.

## Design and assets

V3 introduces a cinematic homepage, editorial introduction, large headline prize, cohesive competition cards, collection colour studies, refined account/dashboard surfaces and founder tools. Typography uses local Georgia and Arial with no third-party font loading. Subtle transitions respect reduced-motion preferences. A keyboard skip link and visible focus indicators support navigation.

The exact existing `IMG_0316.png` logo is used unchanged. The existing lake image is used only as atmospheric photography. Prize galleries are clearly labelled photography placeholders; no unrelated photographs, invented product illustrations or fabricated brand marks are used. Merchandise shows labelled colour studies, not product photographs. Approved licensed main/product-detail/package photographs and an approved lighter logo asset remain desirable inputs.

## Demo boundary

All original V2 demonstration functions remain: category/search/sort, galleries, quantity limits and 1/5/10/20 shortcuts, fixed UK countdowns, an unassessed skill question, account tabs, entries/wins/orders/receipt/profile sections, founder creation/edit layouts, fictional customer search, orders and winner-record previews. Uploads, publishing, authentication, payments, actual tickets and draws are inactive. Inputs are local preview only, never persisted or sent to an API; do not enter personal data.

Data fixtures are in `js/data.js`, the read-only adapter in `js/services.js`, and presentation in `js/app.js`. Server authorization, transaction integrity and legally approved competition rules are still prerequisites for future production work. HTML templates render only repository-owned fixtures; future API/user data must use safe escaping/rendering.

## Validation

With the server on port 8003 and Playwright/Chromium installed, run `node cast-v3/tests/browser.cjs`. Set `TEST_WIDTH=390` or `TEST_WIDTH=768` to exercise interactions at phone/tablet widths. Tests cover 18 routes at 320, 390, 768, 1024 and 1440px, plus demo interactions, errors and missing assets. Run `node cast-v3/tests/design.cjs` for keyboard, reduced-motion, asset integrity and staged-preview checks. This browser testing does not replace hands-on iPad Safari review.
