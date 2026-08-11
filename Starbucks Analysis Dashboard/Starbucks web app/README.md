# ☕ Starbucks Sales Manager - SaaS Application

A production-ready, lightweight full-stack web application built for managing Starbucks orders, sales transactions, menu items, and customer analytics, powered by **PostgreSQL**.

---

## 🗄️ Database Configuration

- **Database Engine**: PostgreSQL
- **Database Name**: `Starbucks`
- **Tables**:
  1. `customers` (500 records): `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `customer_age`, `customer_gender`
  2. `items` (77 records): `id`, `item`, `calories`, `fat`, `carb`, `fiber`, `protein`, `type`
  3. `sales` (10,000 records): `transaction_id`, `store_id`, `datetime`, `customer_id`, `item_id`, `quantity`, `price`, `total_amount`, `payment_mode`, `customer_type`

---

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS with custom Starbucks design tokens (`#006241` Siren Deep Green, rounded-2xl cards, soft ambient drop-shadows)
- **Icons**: `lucide-react` (Strictly SVG icons, zero emojis)
- **Backend API**: Next.js App Router API Routes (`/api/sales`, `/api/customers`, `/api/items`, `/api/kpis`)
- **Database Client**: `pg` (node-postgres Pool) for lightweight SQL execution
- **Data Seeder**: `scripts/seed.js` using `csv-parser` and `pg`

---

## ⚙️ Features

1. **Order Management (CRUD)**:
   - **Create Order**: Select customer & item from searchable dropdowns, auto-fill unit price, auto-calculate `total_amount = quantity * price`, select payment mode (Cash, Card, UPI, Wallet) and customer type (walk-in, mobile-app, drive-thru).
   - **Read Orders**: Searchable, paginated orders table with joined `customer_name` and `item_name`.
   - **Update Order**: Pre-filled edit modal allowing instant modifications.
   - **Delete Order**: Modal dialog confirmation with single-click removal.

2. **Executive Sales Dashboard & KPIs**:
   - Total Gross Revenue ($)
   - Total Orders Count
   - Average Order Ticket ($)
   - Top Selling Item
   - Payment Mode breakdown distribution
   - Customer Type breakdown

3. **Customers Directory**:
   - Customer search, contact details, total orders count, and lifetime spend per customer.

4. **Starbucks Menu Catalog**:
   - Food/Bakery & Beverage items listing with calories and nutritional breakdown (fat, carbs, protein).

---

## 📦 Setup & Running Instructions

### 1. Database Setup
Ensure PostgreSQL is running locally on port `5432`.

### 2. Environment Variables
Create a `.env.local` file in the root directory (optional, defaults to local postgres):
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=Starbucks
```

### 3. Seed Database
Run the seed script to populate PostgreSQL with datasets from the `Dataset/` folder:
```bash
npm run seed
```

### 4. Run Development Server
Start the application:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the Starbucks Sales Manager dashboard.

---

## 📁 Project Structure

```
.
├── Dataset/                   # Provided CSV datasets (customers.csv, items.csv, sales.csv)
├── scripts/
│   └── seed.js                # Data seeder script
├── lib/
│   └── db.ts                  # PostgreSQL connection pool & query helper
├── app/
│   ├── api/
│   │   ├── sales/route.ts     # CRUD sales API
│   │   ├── customers/route.ts # Customers API
│   │   ├── items/route.ts     # Items API
│   │   └── kpis/route.ts      # Analytics KPI API
│   ├── globals.css            # Starbucks design system styling
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main Dashboard page
├── components/
│   ├── Navbar.tsx             # Top header navbar
│   ├── Sidebar.tsx            # Left navigation sidebar
│   ├── orders/
│   │   ├── OrdersView.tsx     # Orders table & search/filters
│   │   ├── CreateOrderModal.tsx# Create order dialog
│   │   ├── EditOrderModal.tsx  # Edit order dialog
│   │   └── DeleteOrderModal.tsx# Delete confirmation dialog
│   ├── customers/
│   │   └── CustomersView.tsx  # Customers list view
│   ├── items/
│   │   └── ItemsView.tsx      # Items menu view
│   └── analytics/
│       └── AnalyticsView.tsx  # Executive analytics view
├── package.json
└── README.md
```
