<p align="center">
  <img src="./assets/images/logo.png" alt="TM-Vault Logo" height="40" />
</p>

<h1 align="center">TM Vault</h1>

<p align="center">
  A mobile DeFi vault management app built with React Native & Expo
</p>

---

## Overview

TM-Vault allows users to browse, invest in, and track DeFi vaults with varying risk levels and APY returns. Features include wallet connection, two-step deposit flows, portfolio tracking, and network management for HyperEVM.

---

## Tech Stack

- **React Native** + **Expo** - Cross-platform mobile framework
- **TypeScript** - Type safety
- **Expo Router** - File-based navigation
- **Zustand** - State management with persistence
- **NativeWind** - Tailwind CSS styling
- **Lottie** - Loading and success animations

---

## Architecture

```
app/           → Screens (Expo Router file-based routing)
components/    → Reusable UI components
services/      → Business logic layer (wallet, deposit, network)
stores/        → Zustand state stores
mocks/         → Mock data for development
utils/         → Helper functions
```

The app follows a clean layered architecture with clear separation between UI, business logic, and data layers.

---

## Mock Implementation

All Web3 functionality is currently mocked:

- **Vaults** - Sample vaults with different risk/APY profiles
- **Wallet** - Mock connection and USDC balance
- **Transactions** - Simulated approve/deposit flow with delays
- **Network** - Mock network detection and switching

### Why Mocked?

The decision to mock Web3 was intentional to **prioritize UI/UX**, perfect **transactional states** (loading, success, error flows), and build a **clean architecture** for long-term maintainability.

### Web3 Ready

The architecture is fully prepared for real blockchain integration. Each service acts as a facade that can be updated to call real APIs - just replace the mock implementations in `services/` with actual wallet providers and contract calls.

---

## Getting Started

```bash
npm install
npx expo start
```

---

## License

MIT
