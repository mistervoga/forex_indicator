export class ForexTrendIndicator {
  private period: number;
  private prices: number[];
  private indicatorType: "SMA" | "EMA";

  constructor(period: number, indicatorType: "SMA" | "EMA" = "SMA") {
    this.period = period;
    this.prices = [];
    this.indicatorType = indicatorType;
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

  calculateEMA(): number {
    if (this.prices.length < this.period) {
      return NaN; // Not enough data to calculate EMA
    }

    const k = 2 / (this.period + 1); // Smoothing factor
    let ema = this.prices[0];

    for (let i = 1; i < this.prices.length; i++) {
      ema = this.prices[i] * k + ema * (1 - k);
    }

    return ema;
  }

  isLongTermBullish(): boolean {
    if (this.prices.length < this.period) {
      return false; // Not enough data to determine the trend
    }

    const currentPrice = this.prices[this.prices.length - 1];
    const indicator =
      this.indicatorType === "SMA" ? this.calculateSMA() : this.calculateEMA();

    return currentPrice >= indicator;
  }

  isLongTermBearish(): boolean {
    if (this.prices.length < this.period) {
      return false; // Not enough data to determine the trend
    }

    const currentPrice = this.prices[this.prices.length - 1];
    const indicator =
      this.indicatorType === "SMA" ? this.calculateSMA() : this.calculateEMA();

    return currentPrice < indicator;
  }
}
