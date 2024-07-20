# Cryptonite

Cryptonite is a cryptocurrency tracking application developed for a Groww assignment. It provides real-time price updates, market data, and visual representations of price trends for various cryptocurrencies.

## Abilities

### Price Tracking
- Real-time price updates for various cryptocurrencies.
- Historical price data to analyze trends over different time periods.

### Market Data
- Market capitalization, trading volume, and circulating supply of cryptocurrencies.
- Price changes over different timeframes (currently set to 30 days).

### Charts and Graphs
- Visual representation of price trends using line charts, candlestick charts, etc.
- Comparison of different cryptocurrencies on a single chart.

## Running the App Locally

To run the Cryptonite app on your local machine, follow these steps:

### Prerequisites
- Node.js
- npm

### Steps

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/PrathamAsrani/Cryptonite.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd Cryptonite
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Set Up Environment Variables:**

    Create a `.env` file in the root directory of the project and add the necessary environment variables.

    ```plaintext
    NEXT_PUBLIC_COIN_GECKO_COINS_API=https://api.coingecko.com/api/v3/coins
    ```

5. **Run the Development Server:**

    ```bash
    npm run dev
    ```

6. **Open the App in Your Browser:**

    Open your browser and go to `http://localhost:3000` to see the app in action.

## Example .env File

Here's an example of what your `.env` file might look like:

```plaintext
NEXT_PUBLIC_COIN_GECKO_COINS_API=https://api.coingecko.com/api/v3/coins
