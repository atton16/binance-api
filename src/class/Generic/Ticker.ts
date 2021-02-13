export class Ticker {
  public window: string;
  public symbol: string;
  public priceChange: number;
  public lastPrice: number;
  public highPrice: number;
  public lowPrice: number;
  public openPrice: number;

  constructor({
    window = '24h',
    symbol,
    priceChange,
    lastPrice,
    highPrice,
    lowPrice,
    openPrice,
  }: {
    window: string,
    symbol: string,
    priceChange: number | string,
    lastPrice: number | string,
    highPrice: number | string,
    lowPrice: number | string,
    openPrice: number | string,
  }) {
    this.window = window;
    this.symbol = symbol;
    this.priceChange = Number(priceChange).valueOf();
    this.lastPrice = Number(lastPrice).valueOf();
    this.highPrice = Number(highPrice).valueOf();
    this.lowPrice = Number(lowPrice).valueOf();
    this.openPrice = Number(openPrice).valueOf();
  }
}
