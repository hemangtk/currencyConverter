# FXCalc - Currency Converter Mobile App

## Overview
FXCalc is a mobile application built with React Native that allows users to quickly and easily convert currencies using real-time exchange rates.

## Features
- Convert between 10 major currencies (USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, BRL)
- Real-time exchange rate fetching
- Swap currencies with a single button
- Clean, intuitive user interface

## Screenshots
[Add screenshots of your app here]

## Prerequisites
- Node.js
- npm or yarn
- React Native development environment
- Expo CLI (recommended)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fxcalc.git
   cd fxcalc
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Add your ExchangeRate-API key:
   - Open `FXCalcApp.tsx`
   - Replace `const API_KEY: string = '4282c9f71c035ca9e5d6e4fc';` with your API key

## Running the App
```bash
npx expo start
```

## Technologies Used
- React Native
- TypeScript
- ExchangeRate-API
- @react-native-picker/picker

## API Configuration
- API Provider: ExchangeRate-API
- Endpoint: https://v6.exchangerate-api.com/v6/[API_KEY]/pair/[FROM_CURRENCY]/[TO_CURRENCY]

## Limitations
- Limited to 10 predefined currencies
- Requires active internet connection
- Free API plan may have usage restrictions

## Future Improvements
- Add more currencies
- Create historical rate tracking
- Add currency flag icons
- Add a graph for the recent rate changes
