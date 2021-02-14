export class PriceTicker {
  public symbol: string;
  public price: number;

  constructor(opt: { symbol: string, price: string }) {
    this.symbol = opt.symbol;
    this.price = parseFloat(opt.price);
  }
}
