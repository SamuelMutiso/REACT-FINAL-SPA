#  SOUNDWAVE GEAR — Admin Portal SPA

> A React-based Single Page Application for managing a musical instruments e-commerce store. Built as a final module project demonstrating modern frontend development with advanced React patterns, client-side routing, CRUD data operations, and a comprehensive test suite.

## Project Description

SoundWave Gear is an administrator portal for a musical instruments e-commerce platform. It allows store administrators to browse inventory, add new products, edit pricing, delete listings, and filter/search across the catalog — all within a sleek dark-mode UI styled around a professional recording studio aesthetic.

The application communicates with a `json-server` mock backend to simulate real-world API interactions, including GET, POST, PATCH, and DELETE requests with persistent state across sessions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 |
| Build Tool | Vite |
| Mock Backend | json-server |
| Testing | Vitest + React Testing Library |


---

## Setup & Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm
- Git

### Steps

**1. Clone the repository**

```bash
git clone <your-repo-url>
cd final-spa
```

**2. Install dependencies**

```bash
npm install
```

**3. Install json-server globally** (if not already installed)

```bash
npm install -g json-server
```

**4. Start the mock backend** (runs on port 3001)

```bash
npm run server
```

**5. In a separate terminal, start the development server**

```bash
npm run dev
```

**6. Open in browser**

```
http://localhost:5173
```

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch
```

---

## Usage Instructions

### Home Page 
The landing page displays the store name, description, and contact number fetched live from the backend. Use the **Browse Inventory** button to navigate to the product catalog, or **Admin Portal** to add new products.

### Shop / Product Catalog 
- Browse all instruments displayed as cards in a responsive grid
- Use the **Keyword Filter** in the sidebar to search by instrument name or country of origin — results update dynamically as you type
- Use the **Category Scope** sidebar to filter by instrument type (Guitars, Drums, Keyboards, Microphones)
- On each card, click **Edit Price** to modify the product's price inline, then **SAVE** to persist the change to the backend
- Click **Delete** to permanently remove a product from the inventory

### Admin Portal 
- Fill out the form to add a new instrument to the catalog
- All fields are required — validation errors are displayed inline before any network request is made
- On success, the form resets and a confirmation banner appears

### 404 Page
Any unrecognised route renders a custom "Route Target Misaligned" page with a button to return home.

---

## Key Features

**Custom Hook Architecture**
Two custom hooks abstract all data-fetching logic cleanly away from components. `useInstruments` manages the full instrument CRUD lifecycle (fetch, add, update, delete) and exposes loading and error states. `useStoreInfo` fetches store metadata for the homepage. Both use `useCallback` to keep functions referentially stable.

**Full CRUD via REST**
The app communicates with a `json-server` backend across all four HTTP methods — GET to load inventory, POST to add new products, PATCH to update pricing inline, and DELETE to remove listings — all with error handling and optimistic UI updates.

**Client-Side Routing with React Router v7**
Four routes are configured (`/`, `/shop`, `/admin`, `*`) with active-link highlighting in the sticky navbar and a custom 404 fallback page.

**Dynamic Search & Category Filtering**
The shop page filters the product list in real time by combining a keyword search (matching name and origin) with a category selector — no additional network requests required.

**Accessible Form with `useId` and `useRef`**
The admin form uses React's `useId` hook to generate unique, collision-safe label/input associations and `useRef` to auto-focus the name field after a successful submission.

**Comprehensive Test Suite**
Tests are written with Vitest and React Testing Library, covering rendering correctness, form validation, user interactions (edit price flow, search filtering), and routing behaviour across five test files.

**Dark Mode Studio UI**
A fully custom Tailwind v4 design system with CSS tokens for colors, fonts, and spacing — giving the app a distinctive, professional recording-studio aesthetic.

---

## Project Structure

```
final-spa/
├── db.json                   # Mock backend data (json-server)
├── vite.config.js            # Vite + Vitest configuration
├── package.json
└── src/
    ├── App.jsx               # Root component with route definitions
    ├── main.jsx              # Entry point with BrowserRouter
    ├── index.css             # Tailwind v4 design tokens & global styles
    ├── components/
    │   ├── Navbar.jsx        # Sticky navigation with active link styles
    │   ├── FilterSidebar.jsx # Search input + category filter buttons
    │   ├── ProductCard.jsx   # Instrument card with inline price editing
    │   ├── SectionHeader.jsx # Reusable page heading component
    │   └── StatusBanner.jsx  # Success/error alert banner
    ├── hooks/
    │   ├── useInstruments.js # Custom hook: full CRUD for instruments
    │   └── useStoreInfo.js   # Custom hook: store metadata fetch
    ├── pages/
    │   ├── HomePage.jsx      # Landing page with store info
    │   ├── ShopPage.jsx      # Product catalog with filtering
    │   ├── AdminPage.jsx     # Add new product form
    │   └── NotFoundPage.jsx  # 404 fallback
    └── test/
        ├── setup.js          # Jest-DOM setup for Vitest
        ├── AdminPage.test.jsx
        ├── Navbar.test.jsx
        ├── ProductCard.test.jsx
        ├── Routing.test.jsx
        └── ShopPage.test.jsx
```

---

## Known Limitations

**Backend dependency** — The app requires `json-server` to be running locally on port 3001. If the server is not started before opening the app, all data fetches will fail and the shop/home pages will display error or empty states.

**No authentication** — The admin portal is publicly accessible with no login or role-based access control. In a production system, the `/admin` route would be protected behind authentication.

**Local data only** — All data is stored in `db.json` on the local machine. There is no hosted database, so inventory changes do not persist across different devices or environments.








