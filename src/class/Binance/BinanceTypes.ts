export type BinanceSymbolStatus = 'PRE_TRADING' | 'TRADING' | 'POST_TRADING' |
  'END_OF_DAY' | 'HALT' | 'AUCTION_MATCH' | 'BREAK';
export type BinanceSymbolType = 'SPOT';
export type BinanceOrderStatus = 'NEW' | 'PARTIALLY_FILLED' | 'FILLED' |
  'CANCELED' | 'PENDING_CANCEL' | 'REJECTED' | 'EXPIRED';
export type BinanceOrderType = 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT' |
  'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT' | 'LIMIT_MAKER' ;
export type BinanceOrderSide = 'BUY' | 'SELL';
export type BinanceTimeInForce = 'GTC' | 'IOC' | 'FOK';
export type BinanceChartIntervals = '1m' | '3m' | '5m' | '15m' | '30m' |
  '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';
export type BinanceRateLimitType = 'REQUEST_WEIGHT' | 'ORDERS' | 'RAW_REQUESTS';
export type BinanceRateLimitInterval = 'SECOND' | 'MINUTE' | 'DAY';
export type BinanceKlinesResponse = Array<[
  number,       // Open time
  string,       // Open
  string,       // High
  string,       // Low
  string,       // Close
  string,       // Volume
  number,       // Close time
  string,       // Quote asset volume
  number,       // Number of trades
  string,       // Taker buy base asset volume
  string,       // Taker buy quote asset volume
  string,       // Ignore.
]>;
export type BinanceOrderExecutionType = 'NEW' | 'CANCELED' | 'REPLACED' | 'REJECTED' | 'TRADE' | 'EXPIRED';
