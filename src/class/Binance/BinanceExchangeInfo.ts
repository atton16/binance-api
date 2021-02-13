import {
  IBinanceExchangeMaxNumAlgoOrdersFilter,
  IBinanceExchangeMaxNumOrdersFilter,
} from '../../interface/IBinanceExchangeFilter';
import {
  IBinanceSymbolIcebergPartsFilter,
  IBinanceSymbolLotSizeFilter,
  IBinanceSymbolMarketLotSizeFilter,
  IBinanceSymbolMaxNumAlgoOrdersFilter,
  IBinanceSymbolMaxNumIcebergOrdersFilter,
  IBinanceSymbolMaxNumOrdersFilter,
  IBinanceSymbolMinNotionalFilter,
  IBinanceSymbolPercentPriceFilter,
  IBinanceSymbolPriceFilter,
} from '../../interface/IBinanceSymbolFilter';
import {
  BinanceOrderType,
  BinanceRateLimitInterval,
  BinanceRateLimitType,
  BinanceSymbolStatus,
} from './BinanceTypes';

export class BinanceExchangeInfo {
  public timezone: string;
  public serverTime: Date;
  public rateLimits: Array<{
    rateLimitType: BinanceRateLimitType,
    interval: BinanceRateLimitInterval,
    intervalNum: number,
    limit: number,
  }>;
  public exchangeFilters: Array<
    IBinanceExchangeMaxNumOrdersFilter |
    IBinanceExchangeMaxNumAlgoOrdersFilter
  >;
  public symbols: Array<{
    symbol: string,
    status: BinanceSymbolStatus,
    quotePrecision: number,
    orderTypes: BinanceOrderType[],
    icebergAllowed: boolean,
    isSpotTradingAllowed: boolean,
    isMarginTradingAllowed: boolean,
    filters: Array<
      IBinanceSymbolPriceFilter |
      IBinanceSymbolPercentPriceFilter |
      IBinanceSymbolLotSizeFilter |
      IBinanceSymbolMinNotionalFilter |
      IBinanceSymbolIcebergPartsFilter |
      IBinanceSymbolMarketLotSizeFilter |
      IBinanceSymbolMaxNumOrdersFilter |
      IBinanceSymbolMaxNumAlgoOrdersFilter |
      IBinanceSymbolMaxNumIcebergOrdersFilter
    >,
  }>;
  constructor(opt: {
    timezone: string,
    serverTime: number,
    rateLimits: any[],
    exchangeFilters: any[],
    symbols: any[],
  }) {
    this.timezone = opt.timezone;
    this.serverTime = new Date(opt.serverTime);
    this.rateLimits = opt.rateLimits;
    this.exchangeFilters = opt.exchangeFilters;
    this.symbols = opt.symbols;
  }
}
