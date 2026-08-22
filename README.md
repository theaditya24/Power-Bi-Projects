# Power BI Projects

A collection of end-to-end data analytics and business intelligence projects built using **Power BI, Python, SQL, PostgreSQL, Power Query, Next.js, and data visualization tools**.

This repository contains practical projects focused on transforming raw data into interactive dashboards, web applications, and actionable business insights.

---

## Projects

| Project | Description | Tools |
|---|---|---|
| [Customer Shopping Behaviour Analysis](./Customer%20Shopping%20Behaviour%20Analysis) | Analyzes customer purchasing patterns, product performance, loyalty, discounts, and customer behaviour. | Python, SQL, Power BI |
| [Global Data Science Salary Dashboard](./Global-Data-Science-Salary-Dashboard) | Explores Data Science salary trends and compares India with global markets across experience, roles, and locations. | Python, Pandas, Power BI |
| [Ride Bookings Analysis](./Riding%20Analysis) | Analyzes 150K ride bookings across 2024 — booking volume, revenue, vehicle performance, and cancellation patterns. | Power BI, Power Query, DAX |
| [Starbucks Analysis Dashboard](./Starbucks%20Analysis%20Dashboard) | Store-operations analytics: a live PostgreSQL-backed web app plus a companion Power BI sales report. | Next.js, PostgreSQL, Power BI |
| [Weather Dashboard](./Weather%20Dashboard) | Interactive weather dashboard using API-based weather data with current, daily, and hourly weather information. | Power BI, Power Query, Weather API, Excel |
| [SQL Data Analytics Project](./SQL%20Project) | A collection of SQL scripts for data exploration, analytics, and reporting over a data-warehouse database. | SQL Server, T-SQL |

---

# 1. Customer Shopping Behaviour Analysis

### Overview

An end-to-end analytics project that analyzes customer shopping behaviour and identifies patterns in purchasing, product performance, customer loyalty, discounts, shipping, and customer satisfaction.

### Key Areas

- Customer demographics
- Product category performance
- Customer loyalty
- Subscription behaviour
- Purchase frequency
- Discount analysis
- Payment methods
- Shipping preferences
- Customer ratings
- Seasonal trends

### Workflow

```text
Raw Dataset
     ↓
Data Cleaning
     ↓
Feature Engineering
     ↓
Exploratory Data Analysis
     ↓
SQL Analysis
     ↓
Power BI Dashboard
     ↓
Business Insights
```

### Technologies

- Python
- Pandas
- NumPy
- Matplotlib
- MySQL
- SQL
- Power BI
- DAX

### Project

[View Customer Shopping Behaviour Analysis →](./Customer%20Shopping%20Behaviour%20Analysis)

---

# 2. Global Data Science Salary Dashboard

### Overview

A salary analytics project that explores the global Data Science job market and compares salary trends between India and international markets.

The analysis focuses on the relationship between compensation and factors such as experience, job role, location, and remote work.

### Key Areas

- Salary distribution
- Experience-level analysis
- Job role comparison
- India vs Global salary comparison
- Remote work analysis
- Geographic salary trends
- Highest-paying roles
- Data Science job market patterns

### Workflow

```text
Raw Salary Dataset
        ↓
Data Cleaning
        ↓
Feature Engineering
        ↓
Exploratory Data Analysis
        ↓
Data Preparation
        ↓
Power BI Dashboard
        ↓
Salary Insights
```

### Technologies

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Power BI
- DAX
- Jupyter Notebook

### Project

[View Global Data Science Salary Dashboard →](./Global-Data-Science-Salary-Dashboard)

---

# 3. Ride Bookings Analysis

### Overview

An end-to-end Power BI report analyzing **150,000 ride bookings from January–December 2024**, covering booking volume, revenue, vehicle performance, and cancellation patterns to uncover operational insights.

The report spans four pages (Home, Overview, Vehicle Type Analysis, and Cancellations & Failed Rides) and ships with a custom dark-premium Power BI theme.

### Key Areas

- Booking volume and monthly trends
- Completion rate and revenue KPIs
- Vehicle type performance (7 categories)
- Revenue and customer distribution
- Driver vs customer cancellation reasons
- Failure-rate analysis (38% of bookings never complete)
- Payment method breakdown

### Workflow

```text
Raw Bookings Dataset (150K rows)
        ↓
Power Query Cleaning
        ↓
Data Modeling (_Measures table)
        ↓
DAX Measures & Calculated Columns
        ↓
Multi-Page Power BI Report
        ↓
Operational Insights
```

### Technologies

- Power BI Desktop
- Power Query
- DAX
- Custom Power BI Theme (JSON)

### Project

[View Ride Bookings Analysis →](./Riding%20Analysis)

---

# 4. Starbucks Analysis Dashboard

### Overview

A two-part analytics project for a simulated Starbucks store (Store #101, Seattle Flagship) that turns raw order data into real-time, actionable insight:

- **Starbucks Sales Manager (Web App)** — a live order-management console built with Next.js and backed by PostgreSQL, with real-time metrics (total sales, order volume, average order value, top-selling item) and a searchable/filterable transactions table.
- **Power BI Report** — a "Daily Sales Performance" report with hourly breakdowns of average spend, revenue, and units sold, alongside order/customer/quantity KPIs.

Together they cover the full loop: raw transactional data → operational dashboard → executive reporting.

### Key Areas

- Real-time KPI cards (sales, orders, avg order value, top item)
- Order transactions table with search and filters
- Average spend per order by hour
- Revenue by hour
- Units sold by hour
- Order, customer, amount, and quantity summaries

### Workflow

```text
Transactional Data (CSV / PostgreSQL)
            ↓
SQL Aggregation Queries
            ↓
     ┌──────────────┐
     ▼              ▼
Next.js Web App   Power BI Report
     ▼              ▼
Live Operations   Executive Reporting
```

### Technologies

- Next.js / React
- PostgreSQL
- Power BI
- SQL
- Tailwind CSS

### Project

[View Starbucks Analysis Dashboard →](./Starbucks%20Analysis%20Dashboard)

---

# 5. Weather Dashboard

### Overview

An interactive Power BI dashboard designed to present weather information using data obtained through a weather API.

The project transforms weather API data into structured datasets and visualizes current weather conditions along with daily and hourly forecasts.

### Key Areas

- Current weather
- Temperature
- Weather conditions
- Daily forecast
- Hourly forecast
- Wind information
- Humidity
- Weather trends

### Workflow

```text
Weather API
     ↓
API Response
     ↓
Data Transformation
     ↓
Structured Dataset
     ↓
Power BI
     ↓
Interactive Weather Dashboard
```

### Technologies

- Power BI
- Power Query
- Weather API
- Microsoft Excel
- Data Transformation
- Data Visualization

### Project

[View Weather Dashboard →](./Weather%20Dashboard)

---

# 6. SQL Data Analytics Project

### Overview

A comprehensive collection of SQL scripts for data exploration, analytics, and reporting over a data-warehouse database (bronze/gold layered `DataWarehouseAnalytics` sample). Each script focuses on a specific analytical theme and demonstrates best practices for analytical SQL.

> Completed as course-based practice following the **Data With Baraa** SQL Data Analytics course. Original scripts and materials are credited to their author (see the folder's own README and LICENSE).

### Key Areas

- Database and dimensions exploration
- Date-range and measures exploration
- Magnitude and ranking analysis
- Change-over-time and cumulative analysis
- Performance analysis
- Data segmentation
- Part-to-whole analysis
- Customer and product reporting

### Workflow

```text
Initialize Database (.bak restore)
        ↓
Exploration (dimensions, dates, measures)
        ↓
Analytics (magnitude, ranking, trends, cumulative)
        ↓
Advanced (segmentation, part-to-whole, performance)
        ↓
Reporting (customer & product reports)
```

### Technologies

- SQL Server
- T-SQL

### Project

[View SQL Data Analytics Project →](./SQL%20Project)

---

# Skills Demonstrated

These projects demonstrate practical experience across the complete data analytics workflow.

### Data Analysis

- Data Cleaning
- Data Transformation
- Exploratory Data Analysis
- Feature Engineering
- Statistical Analysis
- Data Validation

### Python

- Pandas
- NumPy
- Matplotlib
- Seaborn
- Jupyter Notebook

### SQL

- Data Retrieval
- Filtering
- Aggregations
- GROUP BY
- HAVING
- JOINs
- Subqueries
- Window Functions
- Analytical & Reporting Queries

### Power BI

- Data Modeling
- Power Query
- DAX
- Interactive Dashboards
- KPI Cards
- Slicers
- Charts and Visualizations
- Custom Themes
- Business Intelligence Reporting

### Web & Databases

- Next.js / React
- PostgreSQL
- Real-time data aggregation
- REST API endpoints

### Other Tools

- Microsoft Excel
- MySQL
- Git & GitHub
- Weather APIs

---

# End-to-End Analytics Approach

The projects in this repository generally follow a structured analytics process:

```text
                    DATA
                      │
                      ▼
              Data Collection
                      │
                      ▼
               Data Cleaning
                      │
                      ▼
             Data Transformation
                      │
                      ▼
          Exploratory Data Analysis
                      │
                      ▼
              SQL / Analysis
                      │
                      ▼
              Data Modeling
                      │
                      ▼
        Dashboards / Reports / Apps
                      │
                      ▼
             Business Insights
                      │
                      ▼
             Recommendations
```

This approach focuses not only on creating visualizations but also on understanding the underlying data and converting analysis into useful business insights.

---

# Repository Structure

```text
Power-Bi-Projects/
│
├── Customer Shopping Behaviour Analysis/
│   ├── customer_shopping_behavior.csv
│   ├── Customer Behaviour Analysis.ipynb
│   ├── Customer_Behaviour_Dashboard.pbix
│   ├── Customer-Shopping-Behaviour-Analysis.pptx
│   ├── Business Problem Document.pdf
│   ├── Customer_Shopping_Behaviour_Analysis_Report.docx
│   └── README.md
│
├── Global-Data-Science-Salary-Dashboard/
│   ├── data/
│   │   ├── raw/
│   │   └── cleaned/
│   ├── notebooks/
│   │   ├── 01_data_loading.ipynb
│   │   ├── 02_data_cleaning.ipynb
│   │   ├── 03_feature_engineering.ipynb
│   │   ├── 04_eda_visualizations.ipynb
│   │   └── 05_export_for_powerbi.ipynb
│   ├── POWER_BI_PLAN.md
│   ├── requirements.txt
│   └── README.md
│
├── Riding Analysis/
│   ├── Riding Analysis Report.pbix
│   ├── Taxi_Ride_Analysis_Premium_Dark.json
│   ├── rideBookings.csv
│   ├── Dashboard Screenshots/
│   └── README.md
│
├── Starbucks Analysis Dashboard/
│   ├── Starbucks web app/          # Next.js + PostgreSQL app
│   ├── Starbucks Dashboard.pbix
│   ├── customers.csv
│   ├── items.csv
│   ├── sales.csv
│   ├── SQL Queries.txt
│   ├── Dashboard imgs/
│   └── README.md
│
├── Weather Dashboard/
│   ├── Dataset/
│   │   ├── Current.xlsx
│   │   ├── Forcast_Day.xlsx
│   │   ├── Forcast_Hour.xlsx
│   │   └── MasterReport.xlsx
│   ├── Backgrounds/
│   ├── Icons/
│   ├── Weather Dashboard.pbix
│   └── README.md
│
├── SQL Project/
│   ├── datasets/
│   │   ├── DataWarehouseAnalytics.bak
│   │   └── csv-files/
│   ├── scripts/
│   │   ├── 00_init_database.sql
│   │   ├── 01_database_exploration.sql
│   │   ├── ...
│   │   └── 13_report_products.sql
│   ├── docs/
│   └── README.md
│
└── README.md
```

---

# What These Projects Demonstrate

Together, these projects demonstrate the ability to:

- Work with raw and semi-structured datasets
- Clean and transform data
- Perform exploratory data analysis
- Use SQL for analytical and reporting queries
- Build data models
- Create calculated measures using DAX
- Design interactive Power BI dashboards and custom themes
- Build data-driven web applications with live database backends
- Integrate API-based data
- Present analytical findings clearly
- Convert data into actionable business insights

---

# Getting Started

Clone the repository:

```bash
git clone git@github-theaditya24:theaditya24/Power-Bi-Projects.git
```

Navigate into the repository:

```bash
cd Power-Bi-Projects
```

Then open the individual project folder you want to explore. Each project has its own README with detailed setup and usage instructions.

---

# Tools & Technologies

| Category | Technologies |
|---|---|
| Programming | Python |
| Data Analysis | Pandas, NumPy |
| Visualization | Matplotlib, Seaborn |
| Database | MySQL, PostgreSQL, SQL Server |
| BI | Power BI |
| Web | Next.js, React, Tailwind CSS |
| Query & Transformation | SQL, T-SQL, Power Query |
| Formula Language | DAX |
| Data Sources | CSV, Excel, APIs |
| Development | Jupyter Notebook |
| Version Control | Git, GitHub |

---

# Project Highlights

### Customer Analytics

Uses transactional customer data to understand purchasing behaviour and identify opportunities for improving customer engagement and revenue.

### Salary Analytics

Uses Data Science job-market data to understand salary patterns and compare compensation across experience levels, roles, and geographic markets.

### Operations Analytics

Analyzes 150K ride bookings to surface completion rates, vehicle performance, and cancellation root causes across a full year of operations.

### Retail Analytics

Combines a live PostgreSQL-backed web app with a Power BI report to cover both real-time store operations and executive-level sales reporting.

### Weather Analytics

Demonstrates API integration and Power BI reporting by transforming weather data into an interactive dashboard for current and forecast conditions.

### SQL Analytics

Applies analytical SQL — segmentation, ranking, trend, and reporting queries — over a layered data-warehouse database.

---

# Future Projects

This repository will continue to expand with additional data analytics projects covering areas such as:

- Sales Analytics
- Customer Churn
- Financial Analysis
- HR Analytics
- Marketing Analytics
- Supply Chain Analytics
- E-commerce Analytics
- Business Performance Analysis

---

# Author

**Aditya Raj**

B.Tech Computer Science & Engineering

**Data Analytics | Python | SQL | Power BI**

---

## Connect

- GitHub: [@theaditya24](https://github.com/theaditya24)

---

If you find these projects useful, feel free to explore the individual project folders.
