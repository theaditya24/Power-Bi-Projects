# Global Data Science Salary Dashboard

A data analytics project that explores global Data Science job market and salary trends, with a focused comparison between India and the rest of the world using Python and Power BI.

## Project Overview

The Data Science job market is influenced by several factors such as experience, job role, location, remote work, and employment characteristics.

This project analyzes these factors to understand:

- Salary distribution across experience levels
- Salary differences between India and global markets
- Highest-paying Data Science roles
- Impact of remote work on compensation
- Salary trends across different job categories
- Global job market patterns

The project follows an end-to-end analytics workflow:

**Raw Data → Data Cleaning → Feature Engineering → Exploratory Analysis → Power BI Dataset → Interactive Dashboard**

---

## Objectives

The main objectives of this project are:

- Analyze Data Science salary trends globally
- Compare Indian salaries with international salaries
- Understand the relationship between experience and compensation
- Identify high-paying job roles
- Analyze remote work patterns
- Prepare a clean dataset for Power BI
- Build an interactive salary analytics dashboard

---

## Dataset

The project uses the **Data Science Salaries 2024** dataset.

The dataset contains information related to Data Science and Machine Learning jobs, including attributes such as:

- Job title
- Experience level
- Employment type
- Salary
- Salary currency
- Employee residence
- Remote work ratio
- Company location
- Company size

The original dataset is stored separately and should be placed inside:

```text
data/raw/
```

Expected filename:

```text
data_science_salaries_2024.csv
```

---

## Tools & Technologies

### Programming & Analysis

- Python
- Pandas
- NumPy

### Data Visualization

- Matplotlib
- Seaborn

### Business Intelligence

- Microsoft Power BI
- DAX

### Development Environment

- Jupyter Notebook
- VS Code

---

## Project Workflow

### 1. Data Loading

The raw salary dataset is loaded into Python using Pandas.

Initial analysis includes:

- Dataset dimensions
- Data types
- Missing values
- Duplicate records
- Unique categories
- Statistical summaries

---

### 2. Data Cleaning

The dataset is prepared for analysis by:

- Handling missing values
- Removing duplicate records
- Standardizing categorical values
- Correcting data types
- Cleaning salary-related fields
- Validating location and experience categories

---

### 3. Feature Engineering

Additional analytical features are created to improve the analysis.

Examples include:

- India vs Global location grouping
- Experience-level categorization
- Salary normalization
- Remote-work classification
- Job-role grouping

These features allow more meaningful comparisons across different segments.

---

### 4. Exploratory Data Analysis

Python visualizations are used to investigate:

- Salary distributions
- Salary by experience level
- Salary by job title
- Salary by location
- Remote work trends
- India vs Global salary differences
- Distribution of Data Science roles

---

## Power BI Dashboard

The processed dataset is prepared for Power BI to create an interactive salary analytics dashboard.

### Dashboard Analysis

The dashboard focuses on:

- Total job records
- Average salary
- Salary by experience level
- Salary by job role
- India vs Global comparison
- Remote work analysis
- Geographic salary trends
- Highest-paying roles

Interactive filters allow users to analyze salary trends across different dimensions.

---

## Key Business Questions

The project answers questions such as:

- How does experience affect Data Science salaries?
- How do Indian salaries compare with global salaries?
- Which Data Science roles have the highest compensation?
- Does remote work influence salary?
- Which locations offer better compensation?
- Which experience level dominates the job market?
- How does salary vary across different job roles?

---

## Project Structure

```text
Global-Data-Science-Salary-Dashboard/
│
├── data/
│   ├── raw/
│   │   └── data_science_salaries_2024.csv
│   │
│   └── cleaned/
│       └── cleaned_dataset.csv
│
├── notebooks/
│   ├── 01_data_loading.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_feature_engineering.ipynb
│   ├── 04_eda_visualizations.ipynb
│   └── 05_export_for_powerbi.ipynb
│
├── POWER_BI_PLAN.md
├── requirements.txt
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/theaditya24/Power-Bi-Projects.git
```

Navigate to the project:

```bash
cd "Power-Bi-Projects/Global-Data-Science-Salary-Dashboard"
```

Install the required Python libraries:

```bash
pip install -r requirements.txt
```

---

## Running the Project

Run the notebooks in the following order:

```text
01_data_loading.ipynb
        ↓
02_data_cleaning.ipynb
        ↓
03_feature_engineering.ipynb
        ↓
04_eda_visualizations.ipynb
        ↓
05_export_for_powerbi.ipynb
```

The final processed dataset can then be imported into Power BI for dashboard development.

---

## Skills Demonstrated

This project demonstrates practical experience in:

- Data Cleaning
- Exploratory Data Analysis
- Feature Engineering
- Data Transformation
- Statistical Analysis
- Data Visualization
- Business Intelligence
- Power BI
- DAX
- Python
- Pandas
- NumPy
- Seaborn
- Matplotlib

---

## Future Improvements

- Add year-over-year salary analysis
- Add salary prediction using Machine Learning
- Add cost-of-living adjusted salary comparison
- Add country-level salary mapping
- Add job demand analysis
- Integrate live job-market data
- Automate the Python-to-Power BI data pipeline

---

## Author

**Aditya Raj**

Data Analytics | Python | SQL | Power BI
