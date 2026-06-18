<p align="center">
  <img src="https://imgs.search.brave.com/2MkE-ZvvBHBBNaUFHee3bfwj-YR0sVRQpu63bFY6-Bg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jb3Zl/cmVkLWZvb2QtbWVh/bC10cmF5LWZsYXQt/dmVjdG9yLWljb24t/aWxsdXN0cmF0aW9u/LXNpbXBsZS1ibGFj/ay1zeW1ib2wtd2hp/dGUtYmFja2dyb3Vu/ZC1jb3ZlcmVkLWZv/b2QtbWVhbC10cmF5/LXNpZ24tZGVzaWdu/LTEyMDQ5ODU5Ni5q/cGc" alt="CalorieTracker Logo" width="120" />
</p>

<h1 align="center">CalorieTracker</h1>

<p align="center">
  <strong>AI-powered calorie tracking and meal analysis</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Firebase_Auth-12.7-FFCA28?logo=firebase&logoColor=black" alt="Firebase Auth" />
  <img src="https://img.shields.io/badge/Gemini-2.5_Flash-8E75B2?logo=google&logoColor=white" alt="Gemini 2.5 Flash" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
</p>

---

CalorieTracker is a browser-based SPA that lets you log meals, analyze food photos with Google Gemini AI, generate recipes from available ingredients, and track daily calorie intake — all without a backend server. Data is persisted in localStorage.

---

## Features

- **AI food photo analysis** — Upload a photo of your meal; Gemini 2.5 Flash returns meal name, calories, protein, fats, carbs, and fibre.
- **AI recipe generator** — Enter available ingredients; Gemini suggests a dish with step-by-step cooking instructions (Indian home-cooking focused).
- **Manual meal logging** — Form to log meals with name, type, calories, and macronutrients.
- **Calorie dashboard** — Daily goal tracking with an SVG ring chart, consumed/remaining/progress display.
- **Macronutrient breakdown** — Real-time protein, carbs, and fats totals.
- **Meal history** — List of today's logged meals with per-meal calorie display.
- **Reset day** — One-click clear of all daily data.
- **Email/password authentication** — Sign-up and sign-in via Firebase Auth.
- **Image upload** — Click-to-browse or drag-and-drop zone for food photos.
- **Form validation** — Client-side email and password regex validation.
- **Responsive design** — Mobile hamburger menu, fluid grid layout, works on all screen sizes.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite 7](https://vitejs.dev/) | Build tool and dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Redux Toolkit](https://redux-toolkit.js.org/) | State management |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [Material UI](https://mui.com/) | UI component library |
| [Recharts](https://recharts.org/) | Chart library (SVG ring chart) |
| [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/) | Icon sets |

### Backend
None. This is a fully client-side application. All API calls are made directly from the browser to Google Gemini.

### Database
None. Data is persisted in the browser's **localStorage** only.

### Authentication
| Service | Detail |
|---|---|
| [Firebase Authentication](https://firebase.google.com/docs/auth) | Email/password sign-in and sign-up via the Firebase Web SDK. |

### AI / ML
| Service | Library | Model |
|---|---|---|
| [Google Gemini](https://ai.google.dev/) | `@google/genai` v1.34.0 | `gemini-2.5-flash` |

### Deployment
| Platform | Config |
|---|---|
| [Firebase Hosting](https://firebase.google.com/docs/hosting) | `firebase.json`, `.firebaserc` (project: `calorietracker-5596a`) |
| [Vercel](https://vercel.com/) | `vercel.json` (SPA rewrites) |

---

## Screenshots

| Dashboard | AI Food Analysis | Recipe Generator |
|---|---|---|
| ![Dashboard](https://via.placeholder.com/400x250?text=Dashboard) | ![AI Analysis](https://via.placeholder.com/400x250?text=AI+Food+Analysis) | ![Recipe](https://via.placeholder.com/400x250?text=Recipe+Generator) |

| Manual Meal Logging | Login | Mobile Menu |
|---|---|---|
| ![Add Meal](https://via.placeholder.com/400x250?text=Add+Meal) | ![Login](https://via.placeholder.com/400x250?text=Login) | ![Mobile](https://via.placeholder.com/400x250?text=Mobile+Menu) |

---

## Project Structure

```
CalorieTracker-main/
├── index.html                  # Vite entry HTML
├── vite.config.ts              # Vite configuration (Tailwind plugin, React plugin)
├── tsconfig.json               # TypeScript config (project references)
├── tsconfig.app.json           # TypeScript app config
├── tsconfig.node.json          # TypeScript Node config
├── eslint.config.js            # ESLint flat config
├── vercel.json                 # Vercel SPA rewrite rules
├── firebase.json               # Firebase Hosting config
├── .firebaserc                 # Firebase project alias
├── .gitignore
├── package.json
│
└── src/
    ├── main.tsx                # React DOM root mount
    ├── App.tsx                 # Redux Provider + React Router setup
    ├── index.css               # Global styles + Tailwind directives
    │
    ├── components/
    │   ├── Header.tsx          # Navigation bar, auth listener, sign-out
    │   ├── Body.tsx            # Dashboard layout wrapper
    │   ├── Home.tsx            # Calorie ring, macros, history, quick actions
    │   ├── Login.tsx           # Sign-in / Sign-up form with Firebase
    │   ├── AddMeal.tsx         # Manual meal logging form
    │   ├── AskGpt.tsx          # AI food analysis page wrapper
    │   ├── GptCard.tsx         # Image upload + Gemini analysis + results
    │   ├── RecipeGpt.tsx       # Recipe generation page wrapper
    │   ├── RecipeContent.tsx   # Ingredient input + Gemini recipe output
    │   ├── QuickActions.tsx    # Home page cards: Scan, Recipe, Log
    │   ├── MacroNutrients.tsx  # Protein / Carbs / Fats grid
    │   ├── PieCharts.tsx       # SVG calorie ring chart component
    │   ├── History.tsx         # Today's meal list + Reset Day button
    │   ├── Contact.tsx         # Hardcoded contact information
    │   ├── Error.tsx           # Route error fallback page
    │   ├── Shimmer.tsx         # Loading skeleton animation
    │   ├── About.tsx           # Static about page (unlinked in nav)
    │   ├── FileUpload.tsx      # Placeholder stub (not used)
    │   └── Analyze Food/
    │       └── AnalyzeFood.tsx # Empty file (not implemented)
    │
    └── utilis/
        ├── appStore.tsx        # Redux store configuration (5 slices)
        ├── userSlice.tsx       # Auth user state (uid, email, displayName, photoURL)
        ├── mealSlice.tsx       # Nutrition data state (goal, consumed, macros, meals)
        ├── imageSlice.tsx      # Uploaded image URL + base64 state
        ├── gptSlice.tsx        # AI analysis results state
        ├── recipeSlice.tsx     # Recipe generator results state
        ├── constants.tsx       # Logos, avatar, login BG, Gemini key import
        ├── firebase.tsx        # Firebase app init (config hardcoded)
        ├── openai.tsx          # GoogleGenAI client singleton
        ├── validator.tsx       # Email / password regex validation
        └── localStorage.tsx/
            ├── types.tsx        # Meal, Macros, NutriTrackData interfaces
            └── localStorageFunctions.tsx  # get/save/clear localStorage helpers
```

### Folder Details

| Path | Role |
|---|---|
| `src/components/` | All UI components — pages, cards, forms, layout |
| `src/utilis/` | State management slices, Firebase config, AI client, constants, validation, localStorage helpers |
| `src/utilis/localStorage.tsx/` | Typed localStorage abstraction for nutrition data persistence |

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm or yarn
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### Clone Repository

```bash
git clone https://github.com/your-username/CalorieTracker.git
cd CalorieTracker
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

#### Environment Variable Reference

| Variable | Description | Required |
|---|---|---|
| `VITE_GEMINI_API_KEY` | API key for Google Gemini 2.5 Flash used in food analysis and recipe generation (imported at `src/utilis/constants.tsx:6`) | Yes |

**Note:** The Firebase configuration (`apiKey`, `authDomain`, etc.) is hardcoded in `src/utilis/firebase.tsx`. These are client-side values and are intentionally public for Firebase Web SDK operation. The Gemini key, however, should be kept private and set via environment variable.

---

## Running Locally

```bash
npm run dev
```

Opens the development server at `http://localhost:5173` by default.

---

## Build for Production

```bash
npm run build
```

Produces a static build in the `dist/` directory (servable via any static host).

To preview the production build locally:

```bash
npm run preview
```

---

## How It Works

### 1. User Authentication

- User opens the app and is redirected to `/login` if not authenticated.
- **Sign Up**: Enter name, email, password, confirm password. Client-side validation runs via `validator.tsx`. Firebase `createUserWithEmailAndPassword()` creates the account, and `updateProfile()` sets the display name and default avatar.
- **Sign In**: Email + password verified via `signInWithEmailAndPassword()`.
- `Header.tsx` listens to `onAuthStateChanged` and dispatches user data to the Redux `userSlice`. Sign-out calls `signOut(auth)`.

### 2. Photo Upload & AI Analysis

- Navigate to **Calorie Check** (`/calorie-check`).
- Click the upload zone, select a JPEG/PNG from the device.
- Preview is shown via `URL.createObjectURL()`; the file is converted to base64 via `FileReader.readAsDataURL()` and stored in Redux (`imageSlice`).
- Optionally enter additional text (meal description).
- Click **Analyze** — the base64 image data and query text are sent to Gemini 2.5 Flash.
- The model returns a single-line comma-separated string with meal name and nutrition values, which is parsed and displayed.

### 3. AI Recipe Generation

- Navigate to **Recipe** (`/recipe`).
- Type available ingredients into the input field.
- Click **Generate Healthy Recipe** — Gemini 2.5 Flash returns numbered step-by-step cooking instructions.
- The model assumes a standard Indian pantry (spices, dal, rice, ghee, etc.).

### 4. Manual Meal Logging

- Navigate to **Add Meal** (`/add-meal`).
- Fill in food name, calories, meal type, protein, carbs, and fats.
- On submit, data is merged with existing state and saved to `localStorage` under the key `nutriTrackData`, then the user is redirected to the dashboard.

### 5. Data Storage

- All nutrition data (daily goal, consumed calories, macros, meal history) is stored in the browser's `localStorage`.
- On app load, `mealSlice` initializes from `localStorage` via `getNutriData()`.
- Data persists across sessions but is device- and browser-specific. Clearing browser storage or using a different device resets all data.

### 6. Tracking Progress

- The **Dashboard** (`/`) displays:
  - An SVG ring chart showing consumed calories vs. daily goal (default: 2500 kcal).
  - Daily goal, remaining calories, and progress percentage.
  - Macronutrient totals (protein, carbs, fats).
  - Today's meal history with per-item calorie counts.
  - A **Reset Day** button clears all meals and resets consumed/macros to zero.

---

## API Integrations

| Service | Usage | Integration Point |
|---|---|---|
| Google Gemini (`gemini-2.5-flash`) | Food photo nutrition analysis | `src/components/GptCard.tsx` — multimodal request with image + text |
| Google Gemini (`gemini-2.5-flash`) | Recipe generation from ingredients | `src/components/RecipeContent.tsx` — text-only request |
| Firebase Authentication | Email/password sign-up and sign-in | `src/components/Login.tsx` + `src/utilis/firebase.tsx` |

---

## Database Schema

There is no server-side database. Data is stored entirely in the browser's `localStorage` under the key **`nutriTrackData`** using the following TypeScript types (`src/utilis/localStorage.tsx/types.tsx`):

```typescript
interface Meal {
  name: string;
  type: string;       // e.g., "Breakfast", "Lunch", "Dinner"
  calories: number;
}

interface Macros {
  protein: number;
  carbs: number;
  fats: number;
}

interface NutriTrackData {
  dailyGoal: number;   // default: 2500
  consumed: number;    // default: 0
  macros: Macros;
  meals: Meal[];
}
```

### Default Values

```json
{
  "dailyGoal": 2500,
  "consumed": 0,
  "macros": { "protein": 0, "carbs": 0, "fats": 0 },
  "meals": []
}
```

---

## Key Components

| Component | Path | Responsibility |
|---|---|---|
| `Home.tsx` | `src/components/Home.tsx` | Dashboard — renders calorie ring, daily stats, quick actions, macros, and meal history |
| `Login.tsx` | `src/components/Login.tsx` | Sign-in/sign-up form with Firebase Auth integration and client-side validation |
| `GptCard.tsx` | `src/components/GptCard.tsx` | Food image upload, Gemini API call, nutrition result parsing and display |
| `RecipeContent.tsx` | `src/components/RecipeContent.tsx` | Ingredient input, Gemini recipe generation, step-by-step result rendering |
| `AddMeal.tsx` | `src/components/AddMeal.tsx` | Manual meal entry form with macronutrient fields, persists to localStorage + Redux |
| `Header.tsx` | `src/components/Header.tsx` | Top navigation bar, `onAuthStateChanged` listener, sign-out, mobile hamburger menu |
| `PieCharts.tsx` | `src/components/PieCharts.tsx` | Pure SVG ring chart showing consumed/goal with animated stroke-dashoffset |
| `History.tsx` | `src/components/History.tsx` | Today's meal list with per-item display and Reset Day button |
| `QuickActions.tsx` | `src/components/QuickActions.tsx` | Dashboard cards linking to Scan Food, Get Recipe, and Log Manually |
| `MacroNutrients.tsx` | `src/components/MacroNutrients.tsx` | Protein/Carbs/Fats grid read from localStorage |
| `Shimmer.tsx` | `src/components/Shimmer.tsx` | Loading skeleton shown during AI analysis |
| `appStore.tsx` | `src/utilis/appStore.tsx` | Redux store combining `user`, `gpt`, `image`, `recipe`, `meal` slices |

---

## Challenges Solved

### Multimodal Gemini Integration Without a Backend

The app sends image data (base64) and text directly from the browser to Gemini using the `@google/genai` SDK. The `inlineData` format required stripping the `data:image/...;base64,` prefix and detecting the correct MIME type — handled in `GptCard.tsx:82-90`.

### Structured AI Output Parsing

Gemini's freeform text output is constrained by a detailed system prompt to return a single-line, comma-separated nutrition string. The response is split by `,` and mapped to UI fields (`GptCard.tsx:121`). Error handling catches API failures and displays a user-friendly message.

### Client-Side Data Persistence Without a Database

All nutrition data is stored in `localStorage` with typed abstractions (`localStorageFunctions.tsx`). The Redux `mealSlice` initializes from localStorage on app load, and every save writes back synchronously — providing a database-like experience entirely in the browser.

### Firebase Auth State Synchronization with Redux

The `onAuthStateChanged` observer in `Header.tsx` dispatches `addUser`/`removeUser` actions to Redux, keeping the global state in sync with Firebase's auth lifecycle. The login form also dispatches `updateProfile` after sign-up so the display name is available immediately.

### SVG Calorie Ring

A pure SVG ring chart (`PieCharts.tsx`) uses `stroke-dasharray` and `stroke-dashoffset` to render the consumed/goal ratio as a circular progress indicator, avoiding the need for a heavy charting library for this single visualization.

---

## Future Improvements

- **Persistent database** — Replace localStorage with Firebase Firestore to sync data across devices and enable user accounts with cloud-stored history.
- **OAuth login** — Add Google, Apple, or GitHub sign-in via Firebase Auth.
- **Camera capture** — Integrate `getUserMedia` for in-app photo capture instead of file upload only.
- **Nutrition history & trends** — Daily/weekly/monthly charts showing calorie and macro trends over time.
- **Barcode scanning** — Scan packaged food barcodes for instant nutrition data via an external API (e.g., Open Food Facts).
- **Custom daily goals** — Allow users to set their own calorie and macro targets per profile.
- **Meal suggestions** — Suggest meals based on remaining daily calories and macros.
- **Offline support** — Add a service worker and cache strategies for full offline functionality.
- **Unit tests** — Add Vitest + React Testing Library for component and integration tests.
- **Accessibility** — Improve ARIA labels, keyboard navigation, and color contrast compliance.

---

## License

MIT
