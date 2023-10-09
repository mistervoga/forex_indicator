// ForexApi.ts

interface ForexApiResponse {
  price: number; // Assuming the API response has a 'price' property of type number
  // You can define other properties if they exist in the API response
}

export async function fetchForexPrice(pair: string): Promise<number> {
  // Replace with your actual forex data API URL
  const apiUrl = `https://api.example.com/forex?pair=${pair}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: ForexApiResponse = await response.json(); // Type assertion to ForexApiResponse
    return data.price;
  } catch (error: any) {
    throw new Error(`Error fetching forex data: ${error.message}`);
  }
}
