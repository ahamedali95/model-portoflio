# Model Portfolio Information Page

## Overview
This project is designed to display information about model portfolios. A model portfolio is a theoretical collection of securities with specific weightings. We actively buy and sell securities in an actual account to best match the model portfolio’s weights. The page provides metadata about the portfolio, historical performance data, and a detailed view of its holdings.

## Features
- **Portfolio Metadata**: Displays key details such as name, description, inception date, and strategy type.
- **Historical Performance**: Visualizes the portfolio's past performance.
- **Portfolio Holdings**: Shows the current securities in the portfolio, including their weights, prices, and other relevant details.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, ESLint, Vitest, React Router, Apollo GraphQL Client
- **Backend**: Express.js, Apollo GraphQL Server
- **Data**: Mock Data supplied through Express

## API Endpoints - @deprecated and replaced w/ GraphQL 
### 1. Portfolio Metadata
- `GET /api/portfolios/:id`
  - Returns metadata for a specific portfolio.

### 2. Historical Performance
- `GET /api/portfolios/:id/performance`
  - Returns time-series performance data.

### 3. Portfolio Holdings
- `GET /api/portfolios/:id/holdings`
  - Returns the current securities and weights in the portfolio.



## Setup Instructions
1. Clone the repository:
   git clone https://github.com/your-repo/model-portfolio.git

   cd model-portfolio

## Download NodeJS

`Node >= 20`
`NPM > 10`

## Install dependencies
`npm install`

## Start the development server:
`npm run start`

## Access the app at 
`http://localhost:3000`

## Future Enhancements

1. Integrate a database. Data model:

![Portfolio Overview](/datamodel.png)