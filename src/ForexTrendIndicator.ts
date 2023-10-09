// ForexTrendIndicator.ts

export class ForexTrendIndicator {
  private period: number;
  private prices: number[];

  constructor(period: number) {
    this.period = period;
    this.prices = [];
  }

  addPrice(price: number): void {
    this.prices.push(price);

    if (this.prices.length > this.period) {
      this.prices.shift(); // Remove the oldest price if we have too many
    }
  }

  calculateSMA(): number {
    const sum = this.prices.reduce((acc, price) => acc + price, 0);
    return sum / this.prices.length;
  }

  isLongTermBullish(): boolean {
    if (this.prices.length < this.period) {
      return false; // Not enough data to determine the trend
    }

    const currentPrice = this.prices[this.prices.length - 1];
    const sma = this.calculateSMA();

    return currentPrice > sma;
  }

  isLongTermBearish(): boolean {
    if (this.prices.length < this.period) {
      return false; // Not enough data to determine the trend
    }

    const currentPrice = this.prices[this.prices.length - 1];
    const sma = this.calculateSMA();

    return currentPrice < sma;
  }
}
