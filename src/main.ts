// main.ts

import { ForexTrendIndicator } from "./ForexTrendIndicator";
import { getLatestPrice, simulatePrice } from "./ForexApi";

const PAIR = "EURUSD"; // Replace with the currency pair you are interested in
const PERIOD = 50; // Example period for the moving average
const INITIAL_PRICE = 1.1; // Example initial price for simulation

async function main() {
  const trendIndicator = new ForexTrendIndicator(PERIOD);
  let currentPrice = INITIAL_PRICE;

  try {
    // Simulate fetching prices in a loop
    while (true) {
      // Uncomment the line below to fetch real prices from an API
      // currentPrice = await getLatestPrice(PAIR);

      // Simulate the price
      currentPrice = simulatePrice(currentPrice);
      trendIndicator.addPrice(currentPrice);
      console.log(
        `Price: ${currentPrice}, SMA: ${trendIndicator.calculateSMA()}`
      );

      if (trendIndicator.isLongTermBullish()) {
        console.log("The trend is bullish.");
      } else if (trendIndicator.isLongTermBearish()) {
        console.log("The trend is bearish.");
      } else {
        console.log("Not enough data to determine the trend.");
      }

      // Wait for a while before fetching the next price (e.g., 1 minute)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1,000 ms = 1 second (for faster simulation)
    }
  } catch (error) {
    console.error("Error in main execution:", error);
  }
}

main();
