export interface IBinanceSymbolPriceFilter {
  filterType: 'PRICE_FILTER';
  minPrice: string;
  maxPrice: string;
  tickSize: string;
}

export interface IBinanceSymbolPercentPriceFilter {
  filterType: 'PERCENT_PRICE';
  multiplierUp: string;
  multiplierDown: string;
  avgPriceMins: string;
}

export interface IBinanceSymbolLotSizeFilter {
  filterType: 'LOT_SIZE';
  minQty: string;
  maxQty: string;
  stepSize: string;
}

export interface IBinanceSymbolMinNotionalFilter {
  filterType: 'MIN_NOTIONAL';
  minNotional: string;
  applyToMarket: boolean;
  avgPriceMins: number;
}

export interface IBinanceSymbolIcebergPartsFilter {
  filterType: 'ICEBERG_PARTS';
  limit: number;
}

export interface IBinanceSymbolMarketLotSizeFilter {
  filterType: 'MARKET_LOT_SIZE';
  minQty: string;
  maxQty: string;
  stepSize: string;
}

export interface IBinanceSymbolMaxNumOrdersFilter {
  filterType: 'MAX_NUM_ORDERS';
  limit: number;
}

export interface IBinanceSymbolMaxNumAlgoOrdersFilter {
  filterType: 'MAX_NUM_ALGO_ORDERS';
  maxNumAlgoOrders: number;
}

export interface IBinanceSymbolMaxNumIcebergOrdersFilter {
  filterType: 'MAX_NUM_ICEBERG_ORDERS';
  maxNumIcebergOrders: number;
}
