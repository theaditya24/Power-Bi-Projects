# Weather Dashboard

An interactive Power BI weather dashboard designed to transform weather API data into a clear and visually engaging view of current weather conditions and forecasts.

## Project Overview

The Weather Dashboard provides an interactive way to monitor weather conditions using data obtained through a weather API.

The project combines API-based data collection, structured datasets, and Power BI visualization to create a dashboard that can be used to explore current conditions and upcoming forecasts.

The dashboard focuses on:

- Current weather conditions
- Daily weather forecasts
- Hourly weather forecasts
- Temperature trends
- Weather conditions
- Precipitation information
- Wind conditions
- Location-based weather analysis

---

## Objectives

The main objectives of this project are:

- Connect weather data from an API
- Transform API responses into structured datasets
- Prepare weather data for Power BI
- Analyze current and forecast weather conditions
- Create an interactive and visually appealing dashboard
- Present weather information in a simple and understandable format

---

## Data Sources

The project uses weather data obtained through a weather API.

The processed datasets are organized into:

```text
Dataset/
├── Current.xlsx
├── Forcast_Day.xlsx
├── Forcast_Hour.xlsx
└── MasterReport.xlsx
```

These datasets contain information used to build the current-weather and forecast sections of the dashboard.

> API credentials are not included in this repository.

---

## Tools & Technologies

- Microsoft Power BI
- Power Query
- Weather API
- Microsoft Excel
- Data Transformation
- Data Visualization

---

## Dashboard Features

### Current Weather

Displays the latest available weather information such as:

- Temperature
- Weather condition
- Feels-like temperature
- Wind information
- Humidity
- Other current weather metrics

### Daily Forecast

Provides a multi-day view of upcoming weather conditions.

### Hourly Forecast

Provides a more detailed view of weather changes throughout the day.

### Interactive Visualizations

The dashboard uses interactive Power BI visuals to allow users to explore weather information dynamically.

---

## Data Workflow

```text
Weather API
     ↓
API Response
     ↓
Data Transformation
     ↓
Excel Dataset
     ↓
Power BI
     ↓
Interactive Weather Dashboard
```

---

## Project Structure

```text
Weather Dashboard/
│
├── Backgrounds/
│   ├── Group 1 (58).png
│   ├── Group 1 (61).png
│   ├── Group 2 (26).png
│   ├── Group 2 (28) (2).png
│   └── Group 3 (16) (1).png
│
├── Dataset/
│   ├── Current.xlsx
│   ├── Forcast_Day.xlsx
│   ├── Forcast_Hour.xlsx
│   └── MasterReport.xlsx
│
├── Icons/
│   └── Weather icons
│
├── Weather Dashboard.pbix
└── README.md
```

---

## How to Use

### 1. Clone the repository

```bash
git clone https://github.com/theaditya24/Power-Bi-Projects.git
```

### 2. Navigate to the project

```bash
cd "Power-Bi-Projects/Weather Dashboard"
```

### 3. Open the Power BI file

Open:

```text
Weather Dashboard.pbix
```

using Power BI Desktop.

---

## API Configuration

If you want to refresh the weather data using your own API key:

1. Create an account with a weather API provider.
2. Generate an API key.
3. Configure the API request in Power Query.
4. Replace the existing API key with your own key.
5. Refresh the Power BI data.
6. Verify that the current and forecast datasets are updated.

### Security

Never commit API keys or other credentials to GitHub.

Use a secure configuration method or Power Query parameters when working with private API credentials.

---

## Dashboard Capabilities

The dashboard is designed to provide a quick answer to:

- What is the current weather?
- What will the weather look like over the next few days?
- How will temperature change throughout the day?
- What weather conditions are expected?
- How do different weather metrics change over time?

---

## Skills Demonstrated

This project demonstrates practical skills in:

- Power BI
- Power Query
- API Integration
- Data Transformation
- Data Modeling
- Data Visualization
- Dashboard Design
- Excel Data Handling
- Interactive Reporting

---

## Future Improvements

- Add automatic scheduled data refresh
- Add multiple-city comparison
- Add historical weather analysis
- Add weather alerts
- Add precipitation probability analysis
- Add temperature trend forecasting
- Add air quality information
- Add location search functionality

---

## Author

**Aditya Raj**

Data Analytics | Python | SQL | Power BI
