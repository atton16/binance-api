import {
  BinanceOrderExecutionType,
  BinanceOrderSide,
  BinanceOrderStatus,
  BinanceOrderType,
  BinanceTimeInForce,
} from './BinanceTypes';

interface IBinanceExecutionReportStreamRaw {
  e: 'executionReport';
  E: number;
  s: string;
  c: string;
  S: BinanceOrderSide;
  o: BinanceOrderType;
  f: BinanceTimeInForce;
  q: string;
  p: string;
  P: string;
  F: string;
  g: number;
  C: string;
  x: BinanceOrderExecutionType;
  X: BinanceOrderStatus;
  r: string;
  i: number;
  l: string;
  z: string;
  L: string;
  n: string;
  N: string|null;
  T: number;
  t: number;
  I: number;
  w: boolean;
  m: boolean;
  M: boolean;
  O: number;
  Z: string;
  Y: string;
}

export class BinanceExecutionReportStream {
  public eventType: 'executionReport';
  public eventTime: Date;
  public symbol: string;
  public clientOrderId: string;
  public side: BinanceOrderSide;
  public type: BinanceOrderType;
  public timeInForce: BinanceTimeInForce;
  public qty: string;
  public price: string;
  public stopPrice: string;
  public icebergQty: string;
  public orderListId: number;
  public origClientOrderId: string;
  public executionType: BinanceOrderExecutionType;
  public status: BinanceOrderStatus;
  public rejectReason: string;
  public orderId: number;
  public lastExecutedQty: string;
  public cumulativeFilledQty: string;
  public lastExecutedPrice: string;
  public commissionAmount: string;
  public commissionAsset: string|null;
  public transactionTime: Date;
  public tradeId: number;
  public isWorking: boolean;
  public isMaker: boolean;
  public orderCreateTime: Date;
  public cumulativeTransactedQty: string;
  public lastTransactedQty: string;

  constructor(raw: IBinanceExecutionReportStreamRaw) {
    this.eventType = raw.e;
    this.eventTime = new Date(raw.E);
    this.symbol = raw.s;
    this.clientOrderId = raw.c;
    this.side = raw.S;
    this.type = raw.o;
    this.timeInForce = raw.f;
    this.qty = raw.q;
    this.price = raw.p;
    this.stopPrice = raw.P;
    this.icebergQty = raw.F;
    this.orderListId = raw.g;
    this.origClientOrderId = raw.C;
    this.executionType = raw.x;
    this.status = raw.X;
    this.rejectReason = raw.r;
    this.orderId = raw.i;
    this.lastExecutedQty = raw.l;
    this.cumulativeFilledQty = raw.z;
    this.lastExecutedPrice = raw.L;
    this.commissionAmount = raw.n;
    this.commissionAsset = raw.N;
    this.transactionTime = new Date(raw.T);
    this.tradeId = raw.t;
    this.isWorking = raw.w;
    this.isMaker = raw.m;
    this.orderCreateTime = new Date(raw.O);
    this.cumulativeTransactedQty = raw.Z;
    this.lastTransactedQty = raw.Y;
  }

  get raw(): IBinanceExecutionReportStreamRaw {
    return {
      e: this.eventType,
      E: this.eventTime.valueOf(),
      s: this.symbol,
      c: this.clientOrderId,
      S: this.side,
      o: this.type,
      f: this.timeInForce,
      q: this.qty,
      p: this.price,
      P: this.stopPrice,
      F: this.icebergQty,
      g: this.orderListId,
      C: this.origClientOrderId,
      x: this.executionType,
      X: this.status,
      r: this.rejectReason,
      i: this.orderId,
      l: this.lastExecutedQty,
      z: this.cumulativeFilledQty,
      L: this.lastExecutedPrice,
      n: this.commissionAmount,
      N: this.commissionAsset,
      T: this.transactionTime.valueOf(),
      t: this.tradeId,
      I: -1,
      w: this.isWorking,
      m: this.isMaker,
      M: false,
      O: this.orderCreateTime.valueOf(),
      Z: this.cumulativeTransactedQty,
      Y: this.lastTransactedQty,
    };
  }
}
