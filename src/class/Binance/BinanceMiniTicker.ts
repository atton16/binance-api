import { round } from '../../utils/Number/round';
import { Ticker } from '../Generic/Ticker';

interface IBinanceMiniTickerRaw {
  e: '24hrMiniTicker';   // Event type
  E: number;             // Event time
  s: string;             // Symbol
  c: string;             // Close price
  o: string;             // Open price
  h: string;             // High price
  l: string;             // Low price
  v: string;             // Total traded base asset volume
  q: string;             // Total traded quote asset volume
}

export class BinanceMiniTicker {
  public eventType: '24hrMiniTicker';
  public eventTime: Date;
  public symbol: string;
  public closePrice: number;
  public openPrice: number;
  public highPrice: number;
  public lowPrice: number;
  public volumes: number;
  public quotes: number;
  public raw: IBinanceMiniTickerRaw;

  constructor(raw: IBinanceMiniTickerRaw) {
    this.raw = raw;
    this.eventType = raw.e;
    this.eventTime = new Date(raw.E);
    this.symbol = raw.s;
    this.closePrice = Number(raw.c).valueOf();
    this.openPrice = Number(raw.o).valueOf();
    this.highPrice = Number(raw.h).valueOf();
    this.lowPrice = Number(raw.l).valueOf();
    this.volumes = Number(raw.v).valueOf();
    this.quotes = Number(raw.q).valueOf();
  }

  public toTicker(rounding: number = 4): Ticker {
    return new Ticker({
      highPrice: this.highPrice,
      lastPrice: this.closePrice,
      lowPrice: this.lowPrice,
      openPrice: this.openPrice,
      priceChange: round(this.closePrice - this.openPrice, rounding),
      symbol: this.symbol,
      window: '24h',
    });
  }
}
