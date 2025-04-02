# 🧠 CodeLink – Visual Code Analysis Frontend

CodeLink is a modern front-end built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It provides a sleek UI for visualizing code features, commits, test coverage, and other development metadata.

---

## 🚀 Features

- ⚙️ Built with **Next.js 15 (App Router)**
- 💅 Styled using **Tailwind CSS**
- ⚡ Performance optimized with SSR and modular components
- 🔍 Viewers for:
  - Unit tests
  - Commit changes
  - Feature explanations
  - Impact analysis
- 🔗 Connects to a **Python backend (FastAPI)**

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/codelink.git
cd codelink
npm install -g pnpm
pnpm dev
```
Open http://localhost:3000 to see the app.

## 🧩 Project Structure
```
.
├── app/                  # App directory (Next.js App Router)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── api/              # API routes
├── components/           # Modular UI components
│   ├── ui/               # Reusable UI components
│   ├── feature-explanation.tsx
│   ├── commit-changes-viewer.tsx
│   └── unit-test-viewer.tsx
├── styles/               # Tailwind global styles
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
├── postcss.config.mjs    # PostCSS config
├── package.json          # Project metadata
└── tsconfig.json         # TypeScript config
```
