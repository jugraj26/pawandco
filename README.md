# PAW & CO 🐾 — Full Stack Pet Care & E-Commerce Website

A modern, beginner-friendly, full-stack pet care and shopping web application designed with **React (Vite)** on the frontend and **Node.js + Express** on the backend.

PAW & CO allows pet owners to explore pet categories (Dogs, Cats, Hamsters), purchase realistic essentials in Indian Rupees (₹), search and filter products, manage a persistent shopping basket, complete a Cash on Delivery (COD) demo checkout, and access 24/7 emergency veterinary clinics and pet ambulance services.

---

## 🌟 Key Features

1. **Shop by Pet Companion**: Dedicated landing and filter pages for **Dogs**, **Cats**, and **Hamsters**.
2. **Dynamic Product Catalog**: 18 realistic pet products with real prices in Indian Rupees (₹), ratings, reviews, stock availability, and feature breakdowns.
3. **Interactive Search & Filtering**: Real-time keyword search, subcategory filter pills, and price sorting (Low to High, High to Low, Top Rated).
4. **Persistent Shopping Basket**: Powered by React Context API and browser `localStorage`. Retains items across page reloads.
5. **Quantity Controls & Bill Breakdown**: Live addition, reduction, item removal, free shipping calculation (free delivery on orders over ₹999), and grand total.
6. **Educational Demo Checkout**: Complete customer delivery form with validation, Cash on Delivery (COD) mode, server-side price recalculation, and unique order ID generation (`PAW-XXXXXX-XXXX`).
7. **24/7 Emergency Veterinary Directory**: Direct-dial `tel:` telephone links for verified trauma hospitals and critical-care mobile pet ambulances, paired with animal medical advice.
8. **Contact & Community Support**: Contact form with client-side validation and office assistance directory.
9. **Responsive Design**: Designed for desktops, laptops, tablets, and smartphones using pure Vanilla CSS Flexbox and Grid.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | HTML5, CSS3 (Vanilla CSS, custom design tokens), JavaScript (ES6+), React 18, React Router v6, React Context API, Fetch API, Vite |
| **Backend** | Node.js, Express.js (REST APIs, ES Modules), CORS, Dotenv, File System (`fs/promises`) |
| **Data Storage** | Local JSON master catalogs (`products.json`, `emergencyContacts.json`, `orders.json`) |
| **Styling & Assets**| Soft cream background (`#FAF8F5`), sage green accents (`#4A7A57`), charcoal typography, rounded cards, custom photorealistic pet assets |

*Note: Built cleanly without Redux, TypeScript, Tailwind, MongoDB, or external UI component libraries for clarity and educational value.*

---

## 📁 Project Structure

```text
pawandco/
│
├── frontend/
│   ├── public/
│   │   └── images/
│   │       ├── dogs/
│   │       ├── cats/
│   │       ├── hamsters/
│   │       └── products/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Sticky header with mobile drawer & live cart badge
│   │   │   ├── Footer.jsx         # Quick links, categories, 24/7 helpline
│   │   │   ├── ProductCard.jsx    # Reusable card with price, rating, Add button
│   │   │   └── CartItem.jsx       # Reusable cart row with +/- steppers and remove
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Hero, categories, featured products, why choose us
│   │   │   ├── Shop.jsx           # All products, search bar, filters, sorting
│   │   │   ├── Dogs.jsx           # Dog food, shampoo, toys, collars, beds
│   │   │   ├── Cats.jsx           # Cat food, litter, trees, brushes, beds
│   │   │   ├── Hamsters.jsx       # Hamster food, cages, wheels, bedding, bottles
│   │   │   ├── ProductDetails.jsx # Large image, description, quantity selector
│   │   │   ├── Cart.jsx           # Basket review, free shipping tracker, checkout link
│   │   │   ├── Checkout.jsx       # Customer form, order preview, COD demo mode
│   │   │   ├── OrderSuccess.jsx   # Unique order ID, delivery summary
│   │   │   ├── Emergency.jsx      # 24/7 animal hospitals & ambulance tel: directory
│   │   │   └── Contact.jsx        # Demo contact form, support center details
│   │   ├── context/
│   │   │   └── CartContext.jsx    # Global cart state & LocalStorage persistence
│   │   ├── services/
│   │   │   └── api.js             # Centralized Fetch API client
│   │   ├── styles/
│   │   │   ├── global.css         # Theme colors, typography, buttons, reset
│   │   │   ├── navbar.css         # Sticky navigation and mobile menu styles
│   │   │   ├── home.css           # Hero section and features grid
│   │   │   ├── shop.css           # Product grid and filter toolbar
│   │   │   ├── cart.css           # Cart layout and summary card
│   │   │   ├── checkout.css       # Form inputs and demo payment card
│   │   │   ├── details.css        # Product showcase layout
│   │   │   ├── emergency.css      # Hospital & ambulance card styles
│   │   │   └── contact.css        # Contact layout and info cards
│   │   ├── App.jsx                # Route definitions and layout wrapper
│   │   └── main.jsx               # React entry point with BrowserRouter & CartProvider
│   ├── index.html                 # Google Fonts (Outfit & Plus Jakarta Sans) & SEO meta
│   ├── package.json
│   └── vite.config.js             # Vite config with backend /api proxy
│
├── backend/
│   ├── data/
│   │   ├── products.json          # Master list of 18 products with prices in ₹
│   │   ├── emergencyContacts.json # Verified emergency vet clinics & ambulances
│   │   └── orders.json            # Demo customer orders (excluded from git)
│   ├── controllers/
│   │   ├── productController.js   # Products retrieval, filtering, search, sorting
│   │   ├── orderController.js     # Server-side validation & price recalculation
│   │   └── emergencyController.js # Emergency directory provider
│   ├── routes/
│   │   ├── productRoutes.js       # /api/products and /api/products/:id
│   │   ├── orderRoutes.js         # POST /api/orders and GET /api/orders/:id
│   │   └── emergencyRoutes.js     # GET /api/emergency
│   ├── server.js                  # Express application setup and middleware
│   ├── testApi.js                 # Automated API test script
│   ├── package.json
│   ├── .env.example
│   └── .env
│
├── .gitignore                     # Excludes node_modules, .env, orders.json, dist
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0 or higher; tested on v24)
- [npm](https://www.npmjs.com/) (v8.0 or higher)

### 1. Installation

Clone or open the project folder in your terminal:

```bash
# Clone the repository
git clone https://github.com/your-username/pawandco.git
cd pawandco
```

Install backend dependencies:
```bash
cd backend
npm install
```

Install frontend dependencies:
```bash
cd ../frontend
npm install
```

---

## 🏃 Running the Application

For the full experience, both backend and frontend servers should be running simultaneously.

### Terminal 1 — Start the Backend Server (Port 5000)

```bash
cd backend
npm start
# or for auto-reloading during development:
npm run dev
```

*Output:*
```text
🐾 PAW & CO backend server running on http://localhost:5000
📋 Health check available at: http://localhost:5000/api/health
```

### Terminal 2 — Start the Frontend Development Server (Port 5173)

```bash
cd frontend
npm run dev
```

*Output:*
```text
  VITE v5.4.21  ready in 486 ms

  ➜  Local:   http://localhost:5173/
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

---

## 📡 Backend REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Returns backend health status and server timestamp |
| `GET` | `/api/products` | Returns all products. Supports `?pet=dogs`, `?search=kibble`, `?sort=price-asc` |
| `GET` | `/api/products/:id` | Returns details for a single product (e.g. `/api/products/dog-1`) |
| `POST` | `/api/orders` | Validates customer fields, recalculates item totals against master prices, saves demo order, returns unique order ID |
| `GET` | `/api/orders/:id` | Returns saved demo order details |
| `GET` | `/api/emergency` | Returns emergency veterinarians directory and pet ambulance hotlines |

### Running the API Test Suite

You can run the included automated backend integration test anytime:
```bash
cd backend
node testApi.js
```

---

## 👥 Two-Developer GitHub Collaboration Guide

The project is structured cleanly so two developers can work together without merge conflicts:

### Developer Roles

- **Developer 1 (Frontend Lead)**:
  - Homepage layout (`Home.jsx`, `home.css`)
  - Navigation & Footer (`Navbar.jsx`, `Footer.jsx`, `navbar.css`)
  - Category pages (`Dogs.jsx`, `Cats.jsx`, `Hamsters.jsx`)
  - Emergency & Contact pages (`Emergency.jsx`, `Contact.jsx`)

- **Developer 2 (Backend & E-Commerce Lead)**:
  - Backend Express server & REST APIs (`server.js`, `controllers/`, `routes/`)
  - Product catalog & data structures (`data/products.json`, `data/emergencyContacts.json`)
  - Shopping Cart & Context (`CartContext.jsx`, `Cart.jsx`, `cart.css`)
  - Checkout & Order Verification (`Checkout.jsx`, `checkout.css`, `orderController.js`)

### Git Feature Branch Workflow

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd pawandco
   ```

2. **Create your feature branch**:
   ```bash
   # Developer 1
   git checkout -b feature/frontend-pages

   # Developer 2
   git checkout -b feature/cart-and-apis
   ```

3. **Stage and commit your work**:
   ```bash
   git add .
   git commit -m "feat: add category filter pills and responsive hero banner"
   ```

4. **Pull latest changes before pushing**:
   ```bash
   git checkout main
   git pull origin main
   git checkout feature/your-feature
   git merge main
   ```

5. **Push and create a Pull Request (PR)**:
   ```bash
   git push -u origin feature/your-feature
   ```
   Open GitHub, create a Pull Request, review each other's code, and merge into `main`.

---

## 💡 How Web Technologies Work in PAW & CO

For beginner developers and academic evaluation:

1. **HTML5**:
   - Provides semantic document structure using elements like `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
   - Enhances accessibility, SEO indexing, and structured layouts.

2. **CSS3**:
   - Uses CSS Custom Properties (`:root` variables) for consistent design tokens (soft cream `#FAF8F5`, sage green `#4A7A57`, charcoal `#222629`).
   - Uses **Flexbox** for one-dimensional layouts (navbar links, counter steppers, action buttons).
   - Uses **CSS Grid** for two-dimensional product grids and responsive split-column checkout forms.
   - Includes CSS media queries (`@media (max-width: 992px)`) for mobile and tablet adaptability.

3. **JavaScript (ES6+)**:
   - Uses ES Modules (`import` / `export`), async/await for asynchronous backend communication, destructuring, arrow functions, and array methods (`.filter()`, `.map()`, `.reduce()`).

4. **React.js & Vite**:
   - Breaks the user interface into reusable functional components (`ProductCard`, `CartItem`, `Navbar`, `Footer`).
   - `useState`: Manages local component states (search term, category filter, active mobile menu).
   - `useEffect`: Triggers backend data fetching when pages or query params change.
   - `useParams` & `useSearchParams`: Extracts dynamic route IDs (`/product/:id`) and filter parameters.
   - `useNavigate`: Programmatically redirects users to `/order-success` or back to `/shop`.

5. **React Context API & LocalStorage**:
   - Eliminates prop drilling by providing a centralized `CartContext`.
   - Automatically synchronizes cart items to the browser's `localStorage` so items remain after refreshing or closing the browser.

6. **Node.js & Express.js**:
   - Serves as the REST API backend.
   - Handles HTTP routing, JSON body parsing, CORS headers, and input validation.
   - **Crucial Security Measure**: Recalculates product prices on the server from `products.json` when an order is submitted, ensuring client-side price tampering is impossible.
   - Saves confirmed orders locally in `backend/data/orders.json` (safely excluded from Git).

---

## 📜 License

Created for educational pet care and full-stack development demonstrations.
Free to customize and expand! 🐾
