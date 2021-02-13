import {
  BinanceOrderSide,
  BinanceOrderStatus,
  BinanceOrderType,
  BinanceTimeInForce,
} from './BinanceTypes';

export class BinanceQueryOrderResponse {
  public symbol: string;
  public orderId: number;
  public orderListId: number;
  public clientOrderId: string;
  public transactTime: Date;
  public price: number;
  public origQty: number;
  public executedQty: number;
  public cummulativeQuoteQty: number;
  public status: BinanceOrderStatus;
  public timeInForce: BinanceTimeInForce;
  public type: BinanceOrderType;
  public side: BinanceOrderSide;
  public stopPrice: number;
  public icebergQty: number;
  public time: Date;
  public updateTime: Date;
  public isWorking: boolean;
  public origQuoteOrderQty: number;

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
    origQuoteOrderQty: string,
  }) {
    this.symbol = opt.symbol;
    this.orderId = opt.orderId;
    this.orderListId = opt.orderListId;
    this.clientOrderId = opt.clientOrderId;
    this.price = Number(opt.price).valueOf();
    this.origQty = Number(opt.origQty).valueOf();
    this.executedQty = Number(opt.executedQty).valueOf();
    this.cummulativeQuoteQty = Number(opt.cummulativeQuoteQty).valueOf();
    this.status = opt.status;
    this.timeInForce = opt.timeInForce;
    this.type = opt.type;
    this.side = opt.side;
    this.stopPrice = Number(opt.stopPrice).valueOf();
    this.icebergQty = Number(opt.icebergQty).valueOf();
    this.time = new Date(opt.time);
    this.updateTime = new Date(opt.updateTime);
    this.isWorking = opt.isWorking;
    this.origQuoteOrderQty = Number(opt.origQuoteOrderQty).valueOf();
  }
}
