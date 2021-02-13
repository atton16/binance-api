import {
  BinanceOrderSide,
  BinanceOrderStatus,
  BinanceOrderType,
  BinanceTimeInForce,
} from './BinanceTypes';

// tslint:disable: max-classes-per-file
export class BinanceOrderACKResponse {
  public symbol: string;
  public orderId: number;
  public orderListId: number;
  public clientOrderId: string;
  public transactTime: Date;

  constructor(opt: {
    symbol: string,
    orderId: number,
    orderListId: number,
    clientOrderId: string,
    transactTime: number,
  }) {
    this.symbol = opt.symbol;
    this.orderId = opt.orderId;
    this.orderListId = opt.orderListId;
    this.clientOrderId = opt.clientOrderId;
    this.transactTime = new Date(opt.transactTime);
  }
}

export class BinanceOrderRESULTResponse extends BinanceOrderACKResponse {
  public price: string;
  public origQty: string;
  public executedQty: string;
  public cummulativeQuoteQty: string;
  public status: BinanceOrderStatus;
  public timeInForce: BinanceTimeInForce;
  public type: BinanceOrderType;
  public side: BinanceOrderSide;

  constructor(opt: {
    symbol: string,
    orderId: number,
    orderListId: number,
    clientOrderId: string,
    transactTime: number,
    price: string,
    origQty: string,
    executedQty: string,
    cummulativeQuoteQty: string,
    status: BinanceOrderStatus,
    timeInForce: BinanceTimeInForce,
    type: BinanceOrderType,
    side: BinanceOrderSide,
  }) {
    super(opt);
    this.price = opt.price;
    this.origQty = opt.origQty;
    this.executedQty = opt.executedQty;
    this.cummulativeQuoteQty = opt.cummulativeQuoteQty;
    this.status = opt.status;
    this.timeInForce = opt.timeInForce;
    this.type = opt.type;
    this.side = opt.side;
  }
}

export class BinanceOrderFULLResponse extends BinanceOrderRESULTResponse {
  public fills: Array<{
    price: string,
    qty: string,
    commission: string,
    commissionAsset: string,
  }>;
  constructor(opt: {
    symbol: string,
    orderId: number,
    orderListId: number,
    clientOrderId: string,
    transactTime: number,
    price: string,
    origQty: string,
    executedQty: string,
    cummulativeQuoteQty: string,
    status: BinanceOrderStatus,
    timeInForce: BinanceTimeInForce,
    type: BinanceOrderType,
    side: BinanceOrderSide,
    fills: any[],
  }) {
    super(opt);
    this.fills = opt.fills;
  }
}
