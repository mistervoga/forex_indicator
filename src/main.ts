import { ForexTrendIndicator } from "./ForexTrendIndicator";
import { fetchForexPrice } from "./ForexApi";

// Function to fetch and display Forex information based on the selected pair
function fetchAndDisplayInfo() {
  console.log("Fetch Info button clicked."); // Debug statement

  const pairSelect = document.getElementById("basePair") as HTMLSelectElement;
  const basePairSelect = document.getElementById("pair") as HTMLSelectElement;
  const resultDiv = document.getElementById("result") as HTMLDivElement;
  const selectedPair = pairSelect.value;
  const selectedBasePair = basePairSelect.value;

  console.log("Selected Basepair:", selectedBasePair); // Debug statement
  console.log("Selected Pair:", selectedPair); // Debug statement

  fetchForexPrice(selectedBasePair, selectedPair)
    .then((price) => {
      console.log("Price:", price); // Debug statement

      const indicator = new ForexTrendIndicator(50); // 50-period moving average
      indicator.addPrice(price);

      if (indicator.isLongTermBullish()) {
        resultDiv.innerText = `Long-term bullish trend detected for ${selectedPair}.`;
      } else if (indicator.isLongTermBearish()) {
        resultDiv.innerText = `Long-term bearish trend detected for ${selectedPair}.`;
      } else {
        resultDiv.innerText = `No clear trend detected for ${selectedPair}.`;
      }

      resultDiv.classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Error:", error); // Log the error
      resultDiv.innerText = `Error: ${error.message}`;
      resultDiv.classList.remove("hidden");
    });
}

// Add event listener to the single button
const fetchButton = document.getElementById("fetchInfo");
fetchButton?.addEventListener("click", fetchAndDisplayInfo);
