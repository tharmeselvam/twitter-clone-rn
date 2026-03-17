# 🐦 Twitter Clone — React Native

A mobile Twitter clone built with **React Native** and **TypeScript**, backed by a custom **NestJS** REST API. The app covers core Twitter functionality including authentication, a home feed, tweet creation, search, and user profiles.

> ⚠️ **Work in progress** — core features are implemented; some areas are still under development.

---

## ✨ Features

- **Authentication** — Sign up and log in with JWT-based auth
- **Home Feed** — Browse tweets from users you follow
- **Create Tweets** — Compose and post new tweets
- **Search** — Discover users and content
- **User Profile** — View profile details and tweet history
- **State Management** — Powered by Redux for predictable global state

---

## 📱 UI Screenshots

<img width="1190" height="730" alt="UI Screenshots" src="https://github.com/user-attachments/assets/da1a7cf8-b480-4e87-bdb3-a14b7509003e" />

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Mobile Framework | React Native (TypeScript) |
| State Management | Redux |
| Navigation | React Navigation |
| Backend | NestJS (separate repository) |
| Language | TypeScript |

---

## 📁 Project Structure

```
twitter-clone-rn/
├── __tests__/            # Test files
├── android/              # Android native project
├── ios/                  # iOS native project
└── src/                  # Application source code
    ├── app/              # App entry point and root navigation setup
    ├── assets/           # Static image assets
    ├── core/             # Shared constants, types, utility functions, and API service layer
    ├── store/            # Redux store, slices, and actions
    └── ui/               # App screens and resusable UI components
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [React Native environment](https://reactnative.dev/docs/set-up-your-environment) set up for Android
- The [twitter-clone NestJS backend](https://github.com/tharmeselvam/twitter-clone-nestjs) running locally

### Installation

```bash
# Clone the repository
git clone https://github.com/tharmeselvam/twitter-clone-rn.git
cd twitter-clone-rn

# Install dependencies
npm install

# iOS only — install CocoaPods dependencies
bundle install
bundle exec pod install
```

### Running the App

**Start the Metro bundler:**

```bash
npm start
```

**Run on Android:**

```bash
npm run android
```

---

## 📱 Screens

| Screen | Description |
|---|---|
| Login / Register | User authentication |
| Home | Tweet feed |
| Create Tweet | Compose a new tweet |
| Search | Search for users and tweets |
| Profile | View user profile and their tweets |

---

## 🔗 Related

- **Backend repository:** [tharmeselvam/twitter-clone-nestjs](https://github.com/tharmeselvam/twitter-clone-nestjs)
