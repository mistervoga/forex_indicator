// ForexApi.ts

interface ForexApiResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: { [currency: string]: number };
}

export async function fetchForexPrice(
  basePair: string,
  selectedPair: string
): Promise<number> {
  const apiKey = "9f9d64e9cd084b74ac22e3972ec0c1f5"; // Replace with your API key

  // Construct the API URL for the specific currency pair
  const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=${basePair}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Network response was not ok (${response.status}: ${response.statusText})`
      );
    }

    const data: ForexApiResponse = await response.json();
    console.log(data);
    // Extract the price for the specified currency pair
    const price = data.rates[selectedPair];

    if (typeof price !== "number") {
      throw new Error(`Price data for ${selectedPair} not available.`);
    }

    return price;
  } catch (error: any) {
    throw new Error(`Error fetching forex data: ${error.message}`);
  }
}
