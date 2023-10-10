// ForexApi.ts

interface ForexApiResponse {
  price: number;
}

export async function fetchForexPrice(pair: string): Promise<number> {
  const apiKey = "9f9d64e9cd084b74ac22e3972ec0c1f5"; // Replace with your API key

  // Construct the API URL for the specific currency pair
  const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=USD`;

  try {
    const response = await fetch(apiUrl);

    console.log(response.json());
    if (!response.ok) {
      throw new Error(
        `Network response was not ok (${response.status}: ${response.statusText})`
      );
    }

    const data = await response.json();

    // Extract the price for the specified currency pair
    const price = data.rates[pair];

    if (typeof price !== "number") {
      throw new Error(`Price data for ${pair} not available.`);
    }

    return price;
  } catch (error: any) {
    throw new Error(`Error fetching forex data: ${error.message}`);
  }
}
