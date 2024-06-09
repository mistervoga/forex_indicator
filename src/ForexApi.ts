// forexapi.ts

const API_URL = "https://api.example.com/forex"; // Replace with actual API URL if needed

export async function getLatestPrice(pair: string): Promise<number> {
  // Simulate fetching price from an API
  try {
    const response = await fetch(`${API_URL}/latest?pair=${pair}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error("Error fetching the latest price:", error);
    throw error;
  }
}

export function simulatePrice(previousPrice: number): number {
  // Simulate the price change
  const volatility = 0.02; // Simulated volatility percentage
  const change = (Math.random() * 2 - 1) * volatility; // Random change between -volatility and +volatility
  const newPrice = previousPrice * (1 + change);
  return parseFloat(newPrice.toFixed(4)); // Return price rounded to 4 decimal places
}
