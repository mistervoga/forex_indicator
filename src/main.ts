import { ForexTrendIndicator } from "./ForexTrendIndicator";
import { simulatePrice } from "./ForexApi";

const PERIOD = 14; // Example period for the moving average
const INITIAL_PRICE = 1.1; // Example initial price for simulation

async function main() {
  const fetchButton = document.getElementById("fetchInfo") as HTMLButtonElement;
  const resultDiv = document.getElementById("result") as HTMLDivElement;

  fetchButton.addEventListener("click", async () => {
    const basePair = (document.getElementById("basePair") as HTMLSelectElement)
      .value;
    const targetPair = (document.getElementById("pair") as HTMLSelectElement)
      .value;
    const pair = `${basePair}${targetPair}`;
    const indicatorType = (
      document.getElementById("indicatorType") as HTMLSelectElement
    ).value as "SMA" | "EMA";

    resultDiv.innerHTML = `<h2>Fetching data for ${pair}</h2>`;

    const trendIndicator = new ForexTrendIndicator(PERIOD, indicatorType);
    let currentPrice = INITIAL_PRICE;

    try {
      resultDiv.innerHTML += "<ul>";
      while (true) {
        // Simulate the price
        currentPrice = simulatePrice(currentPrice);
        trendIndicator.addPrice(currentPrice);

        const indicatorValue =
          indicatorType === "SMA"
            ? trendIndicator.calculateSMA()
            : trendIndicator.calculateEMA();
        const bullish = trendIndicator.isLongTermBullish();
        const bearish = trendIndicator.isLongTermBearish();

        const listItem = document.createElement("li");
        listItem.textContent = `Price: ${currentPrice}, ${indicatorType}: ${indicatorValue}, Trend: ${
          bullish ? "Bullish" : bearish ? "Bearish" : "Neutral"
        }`;
        resultDiv.appendChild(listItem);

        // Wait for a while before fetching the next price (e.g., 1 second for simulation)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      resultDiv.innerHTML += "</ul>";
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      resultDiv.innerHTML = `<p class="text-danger">Error in fetching data: ${errorMessage}</p>`;
    }
  });
}

main();
