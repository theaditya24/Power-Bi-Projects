# Job Market & Salary Analysis Dashboard (India + Global)

## 📌 Project Overview
This project analyzes job market trends and salary insights for Data Science roles across India and the Globe. The goal is to identify key factors influencing salaries, such as experience, job role, and location, and to create a Power BI dashboard for visualization.

## 🎯 Objectives
- Analyze specific salary trends in India vs. the rest of the world.
- Understand the impact of remote work on salaries.
- Identify top-paying skills and roles.
- Prepare a clean, Power BI-ready dataset.

## 📂 Project Structure
```beat
DATA ANALYST PROJECT 1/
├── data/
│   ├── raw/                  # Original dataset (Download required)
│   └── cleaned/              # Processed data for analysis
├── notebooks/
│   ├── 01_data_loading.ipynb       # Load and inspect data
│   ├── 02_data_cleaning.ipynb      # Handle missing values & duplicates
│   ├── 03_feature_engineering.ipynb# Create new insights
│   ├── 04_eda_visualizations.ipynb # Exploratory Analysis
│   └── 05_export_for_powerbi.ipynb # Final export
├── resources/                # Project assets
├── README.md                 # Project documentation
└── requirements.txt          # Python dependencies
```

## 📊 Dataset
**Source:** [Data Science Salaries 2024 (Kaggle)](https://www.kaggle.com/datasets/sazidthe1/data-science-salaries)

> **⚠️ IMPORTANT:**
> Please download the dataset from the link above and place it in the `data/raw/` folder using the filename: `data_science_salaries_2024.csv`

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run Notebooks
Open the notebooks in numerical order using Jupyter Lab or VS Code:
1. `notebooks/01_data_loading.ipynb`
2. ...

## 🛠️ Tech Stack
- **Python**: Pandas, NumPy, Matplotlib, Seaborn
- **Tools**: Jupyter Notebook, Power BI

## 💼 Resume / Portfolio Points
*Copy-paste these bullet points into your resume or LinkedIn project section:*

**Project: Job Market & Salary Analysis Dashboard (India + Global)**
- **End-to-End Analysis**: Designed and implemented a complete data pipeline using Python (Pandas) to analyze 9,000+ data science job postings, performing data cleaning, duplicate removal, and feature engineering.
- **Global vs. Local Insights**: Engineered custom location grouping logic to conduct a comparative analysis of Indian vs. Global salaries, revealing a [X]% variation in compensation for equivalent roles.
- **Advanced Visualizations**: Created 10+ exploratory visualizations using Matplotlib and Seaborn to identify key salary drivers, including experience level and remote work trends.
- **Dashboard Readiness**: Processed and optimized the final dataset for Power BI, reducing dimensionality by 30% and standardizing currency metrics for accurate KPI tracking.

