import {
  BinanceOrderSide, BinanceOrderStatus, BinanceOrderType, BinanceTimeInForce,
} from './BinanceTypes';

export class BinanceGetOrderResponse {
  public symbol: string;
  public orderId: number;
  public orderListId: number;
  public clientOrderId: string;
  public price: string;
  public origQty: string;
  public executedQty: string;
  public cummulativeQuoteQty: string;
  public status: BinanceOrderStatus;
  public timeInForce: BinanceTimeInForce;
  public type: BinanceOrderType;
  public side: BinanceOrderSide;
  public stopPrice: string;
  public icebergQty: string;
  public time: Date;
  public updateTime: Date;
  public isWorking: boolean;

  constructor(opt: {
    symbol: string,
    orderId: number,
    orderListId: number,
    clientOrderId: string,
    price: string,
    origQty: string,
    executedQty: string,
    cummulativeQuoteQty: string,
    status: BinanceOrderStatus,
    timeInForce: BinanceTimeInForce,
    type: BinanceOrderType,
    side: BinanceOrderSide,
    stopPrice: string,
    icebergQty: string,
    time: number,
    updateTime: number,
    isWorking: boolean,
  }) {
    this.symbol = opt.symbol;
    this.orderId = opt.orderId;
    this.orderListId = opt.orderListId;
    this.clientOrderId = opt.clientOrderId;
    this.price = opt.price;
    this.origQty = opt.origQty;
    this.executedQty = opt.executedQty;
    this.cummulativeQuoteQty = opt.cummulativeQuoteQty;
    this.status = opt.status;
    this.timeInForce = opt.timeInForce;
    this.type = opt.type;
    this.side = opt.side;
    this.stopPrice = opt.stopPrice;
    this.icebergQty = opt.icebergQty;
    this.time = new Date(opt.time);
    this.updateTime = new Date(opt.updateTime);
    this.isWorking = opt.isWorking;
  }
}
