interface IBinanceTradeStreamRaw {
  e: 'trade';
  E: number;
  s: string;
  t: number;
  p: string;
  q: string;
  b: number;
  a: number;
  T: number;
  m: boolean;
  M: boolean;
}

export class BinanceTradeStream {
  public eventType: 'trade';
  public eventTime: Date;
  public symbol: string;
  public tradeId: number;
  public price: number;
  public quantity: number;
  public buyerOrderId: number;
  public sellerOrderId: number;
  public tradeTime: Date;
  public isBuyerMarketMaker: boolean;
  public raw: IBinanceTradeStreamRaw;

  constructor(raw: IBinanceTradeStreamRaw) {
    this.raw = raw;
    this.eventType = raw.e;
    this.eventTime = new Date(raw.E);
    this.symbol = raw.s;
    this.tradeId = raw.t;
    this.price = Number(raw.p).valueOf();
    this.quantity = Number(raw.q).valueOf();
    this.buyerOrderId = raw.b;
    this.sellerOrderId = raw.a;
    this.tradeTime = new Date(raw.T);
    this.isBuyerMarketMaker = raw.m;
  }
}
