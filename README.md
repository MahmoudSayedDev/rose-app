# 🌹 Rose App – E-commerce Platform

A scalable E-commerce platform built with **Angular 22**, **Nx Monorepo**, and **Angular Native Federation**, following a **Micro Frontend Architecture**.

The workspace consists of two independent Angular applications and shared internal libraries, designed to improve modularity, maintainability, and code reusability.

## 🏗️ Architecture

The project follows an Nx Monorepo architecture with a Micro Frontend approach.

### Applications

- **Rose App (Main Application):** The customer-facing E-commerce storefront.
- **Dashboard (Admin Application):** An independent application for administrative operations.

### Shared Libraries

- **Auth Library:** Centralized authentication functionality shared across applications.
- **Reusable Components:** Shared UI components to maintain consistency and reduce code duplication.

### Architecture Overview

```text
rose-app/
│
├── apps/
│   ├── rose-app/          # Main Storefront (Shell)
│   └── dashboard/         # Admin Dashboard (Remote)
│
├── libs/
│   ├── auth-library/      # Shared Authentication
│   └── reusable-components/ # Shared UI Components
│
└── nx.json
```

*Directory structure is illustrative.*

## ✨ Key Features

### Micro Frontend Architecture
- Built using Nx Monorepo and Angular Native Federation.
- Separated the Storefront and Admin Dashboard into independent Angular applications.
- Configured application federation and remote application integration.
- Organized shared functionality through internal Angular libraries.

### Authentication & Authorization
- Centralized authentication shared between the Main Application and Admin Dashboard.
- Role-Based Access Control (RBAC) supporting User and Admin roles.
- Callback URL-based login flow to preserve the user's intended destination.
- Automatic redirection based on authentication status and user role.
- Seamless navigation between the Storefront and Dashboard based on permissions.

### Frontend Development
- Standalone Angular components.
- Angular Signals and RxJS.
- Reusable UI components.
- Responsive layouts using PrimeNG and Tailwind CSS.
- Multilingual support using ngx-translate.

### Build & Development
- Nx workspace management.
- Independent application build configurations.
- Development and production environments.
- Optimized builds using Angular build tools and esbuild.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Framework | Angular 22 |
| Language | TypeScript |
| Monorepo | Nx |
| Architecture | Micro Frontends |
| Federation | Angular Native Federation |
| Reactive Programming | RxJS |
| State Management | Angular Signals |
| UI Components | PrimeNG |
| Styling | Tailwind CSS |
| Internationalization | ngx-translate |
| Build Tools | Angular Build, esbuild |
| Testing | Vitest |
| Version Control | Git & GitHub |

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.22.3
- npm 11.16.0

### Installation

```bash
git clone <repository-url>
cd rose-app
npm install
```

### Development

Run the Main Application:

```bash
npm run serve:shell
```

Run the Admin Dashboard:

```bash
npm run serve:dashboard
```

Run both applications simultaneously:

```bash
npm run serve:all
```

### Build

```bash
npm run build
```

## 🧪 Testing

Run unit tests:

```bash
npm test
```

## 📌 Project Goals

- Apply scalable and maintainable frontend architecture.
- Improve code reusability through shared libraries.
- Separate application responsibilities using Micro Frontends.
- Implement centralized authentication and role-based authorization.
- Manage multiple Angular applications efficiently within a single Nx workspace.
