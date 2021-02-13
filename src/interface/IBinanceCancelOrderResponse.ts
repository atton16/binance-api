import {
  BinanceOrderSide, BinanceOrderStatus, BinanceOrderType, BinanceTimeInForce,
} from '../class/Binance/BinanceTypes';

export interface IBinanceCancelOrderResponse {
  symbol: string;
  origClientOrderId: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: BinanceOrderStatus;
  timeInForce: BinanceTimeInForce;
  type: BinanceOrderType;
  side: BinanceOrderSide;
}
