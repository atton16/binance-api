import { BinanceChartIntervals } from './BinanceTypes';

interface IBinanceKlineStreamRaw {
  e: 'kline';            // Event type
  E: number;             // Event time
  s: string;             // Symbol
  k: {
    t: number;           // Kline start time
    T: number;           // Kline close time
    s: string;           // Symbol
    i: BinanceChartIntervals;           // Interval
    f: number;           // First trade ID
    L: number;           // Last trade ID
    o: string;           // Open price
    c: string;           // Close price
    h: string;           // High price
    l: string;           // Low price
    v: string;           // Base asset volume
    n: number;           // Number of trades
    x: boolean;          // Is this kline closed?
    q: string;           // Quote asset volume
    V: string;           // Taker buy base asset volume
    Q: string;           // Taker buy quote asset volume
    B: string;           // Ignore
  };
}

export class BinanceKlineStream {
  public eventType: 'kline';
  public eventTime: Date;
  public symbol: string;
  public kline: {
    startTime: Date,
    closeTime: Date,
    symbol: string,
    interval: BinanceChartIntervals,
    firstTradeId: number,
    lastTradeId: number,
    openPrice: number,
    closePrice: number,
    highPrice: number,
    lowPrice: number,
    baseAssetVolume: number,
    numberOfTrade: number,
    isClosed: boolean,
    quoteAssetVolume: number,
    takerBuyBaseAssetVolume: number,
    takerBuyQuoteAssetVolume: number,
  };
  public raw: IBinanceKlineStreamRaw;

  constructor(raw: IBinanceKlineStreamRaw) {
    this.raw = raw;
    this.eventType = raw.e;
    this.eventTime = new Date(raw.E);
    this.symbol = raw.s;
    this.kline = {
      startTime: new Date(raw.k.t),
      closeTime: new Date(raw.k.t),
      symbol: raw.k.s,
      interval: raw.k.i,
      firstTradeId: raw.k.f,
      lastTradeId: raw.k.L,
      openPrice: Number(raw.k.o).valueOf(),
      closePrice: Number(raw.k.c).valueOf(),
      highPrice: Number(raw.k.h).valueOf(),
      lowPrice: Number(raw.k.l).valueOf(),
      baseAssetVolume: Number(raw.k.v).valueOf(),
      numberOfTrade: Number(raw.k.n).valueOf(),
      isClosed: raw.k.x,
      quoteAssetVolume: Number(raw.k.q).valueOf(),
      takerBuyBaseAssetVolume: Number(raw.k.V).valueOf(),
      takerBuyQuoteAssetVolume: Number(raw.k.Q).valueOf(),
    };
  }
}
