# 🚕 Ride Bookings Analysis — Power BI Report

An end-to-end Power BI dashboard analyzing 150,000 taxi/ride bookings across 2024 — covering booking volume, revenue, vehicle performance, and cancellation patterns to uncover operational insights.

![Home Page](Dashboard%20Screenshots/Home.png)

---

## 📌 Overview

This report answers four core business questions:

1. **How is the business performing overall?** — bookings, revenue, completion rate
2. **Which vehicle types drive the most volume and revenue?**
3. **Why do 38% of bookings never complete, and who's responsible?**
4. **What does data quality across payments, ratings, and locations look like?**

The dataset contains **150,000 ride bookings** from **January – December 2024**, with 21 fields covering booking status, vehicle type, payment method, ratings, cancellation reasons, distance, and timing (VTAT/CTAT).

---

## 🗂️ Report Pages

### 1️⃣ Home
Cover page for the report with the project title and visual theme.

![Home](Dashboard%20Screenshots/Home.png)

---

### 2️⃣ Overview
High-level KPIs and trends across the full dataset.

![Overview](Dashboard%20Screenshots/Overview.png)

**Key visuals:**
- Total Bookings, Completion Rate, Total Revenue, Avg Booking Value, Distinct Customers (KPI cards)
- Bookings by Month (trend line)
- Booking Status Split (Completed vs. Cancelled/Failed breakdown)
- Bookings by Vehicle Type
- Bookings by Payment Method

**Key insight:** Booking volume is fairly flat across the year (~12–13K/month, no strong seasonality). Only **62% of bookings complete** — the remaining 38% fail across four different cancellation/incomplete categories.

---

### 3️⃣ Vehicle Type Analysis
Performance comparison across all 7 vehicle categories (Auto, Go Mini, Go Sedan, Bike, Premier Sedan, eBike, Uber XL).

![Vehicle Type Analysis](Dashboard%20Screenshots/Vehichle%20Type.png)

**Key visuals:**
- Top Vehicle by Volume / Revenue / Avg Fare (KPI cards)
- Revenue by Vehicle Type
- Customer Count by Vehicle Type
- Total Bookings by Booking Status (donut)
- Vehicle performance matrix (table): bookings, revenue, avg fare, completion rate, avg driver rating
- Avg Booking Value vs. Completion Rate (scatter)

**Key insight:** **Auto dominates** both volume (37K bookings) and revenue (₹1.29 Cr). Completion rate is nearly identical across all vehicle types (61.4%–62.6%) — vehicle type has no meaningful effect on ride success, so failures are driven by other factors, not the vehicle itself.

---

### 4️⃣ Cancellations & Failed Rides
A dedicated breakdown of the 38% of bookings that never complete.

![Cancellations](Dashboard%20Screenshots/Cancellations.png)

**Key visuals:**
- Total Failed Bookings, Failure Rate, Driver Cancellation Rate, Customer Cancellation Rate (KPI cards)
- Driver Cancellation Reasons (bar)
- Customer Cancellation Reasons (bar)
- Cancellations by Month (trend)
- Completed vs. Failed Rides by Vehicle (100% stacked bar)

**Key insight:** Driver-side cancellations (18% of all bookings) are **almost evenly split** across four reasons — customer-related issues, health concerns, personal/vehicle issues, and passenger limits — meaning there's no single dominant, easily-fixable root cause. Customer cancellations are led by wrong address and change of plans.

---

## 🧮 Data Model & Measures

All DAX measures live in a dedicated `_Measures` table, separate from the raw `rideBookings` data table — kept modular for reuse across all four pages.

| Category | Example Measures |
|---|---|
| **Volume** | `Total Bookings`, `Completed Bookings`, `Completion Rate`, `Booking %` |
| **Cancellations** | `Total Failed Bookings`, `Failure Rate`, `Driver Cancellation Rate`, `Customer Cancellation Rate` |
| **Revenue** | `Total Revenue`, `Avg Booking Value`, `Revenue per Completed Ride` |
| **Distance/Time** | `Avg Ride Distance`, `Avg VTAT`, `Avg CTAT` |
| **Ratings** | `Avg Driver Rating`, `Avg Customer Rating`, `Low Rated Rides` |
| **Customers** | `Distinct Customers`, `Avg Bookings per Customer` |

Two calculated columns support grouping and time-based analysis:
- `Booking Outcome` — buckets status into Completed / Not Completed
- `Booking Hour` — extracts hour from Time for peak-hour analysis

---

## 🎨 Design

- **Theme:** Dark luxury / premium fintech aesthetic — deep charcoal & midnight navy background with champagne-gold, amber, and ivory accents
- **Typography:** Segoe UI Light / Semibold
- **Visual style:** Transparent visual backgrounds, soft gold glow shadows in place of borders, consistent gradient background image across all report pages
- **Consistency:** Same background image, color palette, and card styling used on every page for a cohesive, single-product feel
- **Custom theme:** `Taxi_Ride_Analysis_Premium_Dark.json` — importable Power BI theme file with the full color palette, fonts, and default visual styling used throughout this report

---

## 🛠️ Tools Used

- **Power BI Desktop** — data modeling, DAX measures, report design
- **Power Query** — data cleaning and transformation
- **DAX** — custom measures for KPIs, rates, and aggregations

---

## 📁 Repository Structure

```
Riding Analysis/
├── Riding Analysis Report.pbix              # Power BI report file
├── Taxi_Ride_Analysis_Premium_Dark.json     # Custom Power BI theme file
├── rideBookings.csv                         # Source dataset
├── bg img.png                               # Background image (content pages)
├── homepage img.png                         # Background image (home page)
├── Dashboard Screenshots/
│   ├── Home.png
│   ├── Overview.png
│   ├── Vehichle Type.png
│   └── Cancellations.png
└── README.md
```

---

## 🚀 How to Use

1. Clone this repository
2. Open `Riding Analysis Report.pbix` in **Power BI Desktop** (free download from Microsoft)
3. Data is pre-loaded — no external connections required
4. Use the **Month** and **Vehicle Type** slicers on each page to filter the report

---

## 📊 Dataset Summary

| Metric | Value |
|---|---|
| Total Bookings | 150,000 |
| Date Range | Jan 2024 – Dec 2024 |
| Completion Rate | 62.0% |
| Total Revenue | ₹5.18 Cr |
| Avg Booking Value | ₹508 |
| Vehicle Types | 7 (Auto, Go Mini, Go Sedan, Bike, Premier Sedan, eBike, Uber XL) |
| Payment Methods | 5 (UPI, Cash, Uber Wallet, Credit Card, Debit Card) |

---

## 👤 Author

**Aditya**
🔗 [GitHub](https://github.com/theaditya24)

---

*If you found this project useful, consider giving the repo a ⭐*
