# CAST V2 — Phase 1 demonstration

This isolated static prototype lives on the `cast-v2` development branch. Original root website files are unchanged. No deployment configuration was added. Do not deploy the repository branch or this directory to production without separate approval.

## Preview

From the repository root:

```sh
python3 -m http.server 8001 --bind 127.0.0.1
```

Open `http://localhost:8001/cast-v2/` in a browser on that machine. In a remote development environment, forward port 8001 through your development tool if supported. Cloud onboarding does not provide public localhost preview links. Stop with Ctrl+C. Use the existing isolated checkout; no worktree is necessary.

Navigation covers homepage, filtered competitions catalogue, three competition detail views, account tabs, customer dashboard, admin preview and merchandise. Hash routes allow refresh without server rewrite configuration.

## Safety and architecture

All fixtures in `js/data.js` are illustrative. The read-only `js/services.js` adapter separates presentation from data retrieval; authenticated server endpoints can replace it later. `js/app.js` renders views and handles local preview interactions. No payment SDK, network API, persistence, registration, ticket allocation or real draw implementation exists. Sensitive actions are disabled; account fields are disabled to avoid collecting personal data. Admin is intentionally a public fixture preview, not a security boundary.

The countdown is a relative demonstration anchored to page load. Prices, values, inventory and ticket references are invented illustrative records. Product imagery is explicitly labelled atmosphere photography; merchandise uses abstract placeholders. The existing `IMG_0316.png` artwork is used unchanged for the logo. No new logo artwork has been created.

Before future production development: establish approved rules and provider acceptance; implement server-side authentication/authorization, transactional capacity limits and unique tickets, verified/idempotent payment webhooks, reconciliation, auditable draws, privacy controls, durable jobs and backup recovery. Never turn these fixture values into production truth. Replace static rendering with safely escaped components when consuming external data: current HTML templates consume repository-owned constants only.

No vendor framework or dependencies are introduced for this design phase. A future application migration should preserve the approved UI and move trusted logic onto the server, with PostgreSQL as the entry/order system of record.

## Checks

`node --check cast-v2/js/app.js` (and data/services modules) checks syntax. Browser validation covers all routes, phone/tablet/desktop layout, navigation, filters, tabs, quantity bounds, countdown updates, disabled financial/account actions and no unexpected network requests.

The browser checks are saved in `tests/browser.cjs`. With the preview server on port 8001 and Playwright plus Chromium available, run `node cast-v2/tests/browser.cjs` from the repository root. This environment supplies both; no test dependency is required by the website itself. Screenshots are written to `/tmp/cast-v2-mobile.png` and `/tmp/cast-v2-desktop.png`.
