# Farm Market

An iOS app (Expo / React Native / TypeScript) for pre-ordering from local farmers at recurring pop-up markets. Ported from a Claude Design HTML/CSS/JS prototype.

Three roles share one app via a role switcher (not real auth — just a view toggle):

- **Customer** — browse producers/products at a market, checkout with a simulated card pre-authorization, track orders through approval → ready → collection (QR code or manual entry), read producer news + recipes.
- **Producer** — list/manage products, accept or decline incoming orders (with partial-accept), mark orders ready and show a collection QR code, track balance/payouts, post news and recipes.
- **Organiser** — create/manage markets (with live address geocoding + map pin) and each market's farmer roster.

This build is **frontend-only**: all state (orders, stock, balances, QR tokens) lives in an in-app Zustand store rather than a real backend — see [`src/store/useAppStore.ts`](src/store/useAppStore.ts). Payments are simulated (Stripe-shaped hold/capture language, no real processor). Maps use Apple Maps via `react-native-maps`, with geocoding via `expo-location` (no Google API key needed). Target platform is **iOS only**.

## Requirements

- macOS with Xcode installed (get it from the App Store)
- [Node.js](https://nodejs.org) (LTS)
- [CocoaPods](https://cocoapods.org) — `brew install cocoapods`

## Setup

```bash
npm install
cd ios && pod install && cd ..
```

## Run it

**Option A — from Xcode:**
```bash
open ios/FarmMarket.xcworkspace
```
(Open the `.xcworkspace`, not the `.xcodeproj`.) Pick a Simulator from the device dropdown and press ▶.

You also need the Metro bundler running in a separate terminal for the JS to load:
```bash
npx expo start
```

**Option B — one command (builds + starts Metro + launches the simulator):**
```bash
npx expo run:ios
```

## Project structure

```
src/
  theme/       Design tokens (colors, fonts, spacing) ported from the prototype's CSS
  data/        Domain types, seed data, and every user-facing copy string
  store/       Zustand store — the single source of truth for all app state
  components/  Shared UI primitives (Button, Card, Tag, Field, ConfirmDialog, Toast…)
  features/qr/ The collection QR flow (mint/scan/redeem token, camera scanner)
  navigation/  Role-based navigators (Customer / Producer / Organiser)
  screens/     Screens, grouped by role
```

## Known limitations

- No real backend — refreshing app state resets it to the seed data.
- No real authentication — roles are a UI switch, not accounts.
- No real payment processor — the checkout/hold/capture flow is simulated.
- CSV/PDF export on order-history screens is best-effort (`expo-print` / `expo-sharing`).
- Camera-based QR scanning requires a physical device — the iOS Simulator has no camera; use the manual code entry fallback there.
