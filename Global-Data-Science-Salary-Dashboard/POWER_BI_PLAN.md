# Power BI Dashboard Plan: Global Data Salaries

## 🎯 Dashboard Goal
Visualize the global landscape of data science salaries, highlighting the differences between India and the Global market to help job seekers understand salary expectations.

## 📊 Dataset Connection
- **Source File:** `data/cleaned/power_bi_data.csv`
- **Table Name in Power BI:** `Salaries`

## 1️⃣ Key Performance Indicators (KPIs) (Top Cards)
Place these at the top of your dashboard for quick stats.
1.  **Avg Salary (USD)**: Average of `Salary (USD)`.
2.  **Median Salary (USD)**: Median of `Salary (USD)`.
3.  **Total Jobs Analyzed**: Count of `Job Title`.
4.  **Top Paying Role**: Job Category with highest max salary.

## 2️⃣ Visualization Strategy (Charts)

### A. Comparisons (The "Story")
-   **Chart:** Clustered Bar Chart
-   **Axis:** `Location Group` (India vs Global)
-   **Values:** Average `Salary (USD)` and Max `Salary (USD)`
-   **Why:** Immediately shows the salary gap.

### B. Role Analysis
-   **Chart:** Horizontal Bar Chart
-   **Axis:** `Job Category`
-   **Values:** Average `Salary (USD)`
-   **Why:** Shows which career path pays the most.

### C. Experience Impact
-   **Chart:** Line or Area Chart
-   **Axis:** `Experience Level` (Sort: Entry < Mid < Senior < Exec)
-   **Values:** Median `Salary (USD)`
-   **Why:** Shows career progression value.

### D. Work Types
-   **Chart:** Donut Chart
-   **Legend:** `Work Model` (Remote/On-site/Hybrid)
-   **Values:** Count of Jobs
-   **Why:** Shows flexibility trends.

## 3️⃣ Slicers (Filters)
Add these on the left or top panel to allow users to drill down.
1.  **Year:** Filter by 2023, 2024.
2.  **Experience:** Filter specifically for "Entry Level" vs "Senior".
3.  **Location Group:** Filter to see ONLY India data or ONLY Global.

## 🎨 Theme & Design
-   **Theme:** Use a "Dark" or "Colorblind Friendly" theme in Power BI.
-   **Title:** "Global vs. India: Data Science Salary Dashboard"
