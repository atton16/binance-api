interface IBinanceOutboundAccountInfoStreamRaw {
  e: 'outboundAccountInfo';
  E: number;
  m: number;
  t: number;
  b: number;
  s: number;
  T: boolean;
  W: boolean;
  D: boolean;
  u: number;
  B: Array<{
    a: string,
    f: string,
    l: string,
  }>;
}

export class BinanceOutboundAccountInfoStream {
  public eventType: 'outboundAccountInfo';
  public eventTime: Date;
  public makerCommission: number;
  public takerCommission: number;
  public buyerCommission: number;
  public sellerCommission: number;
  public canTrade: boolean;
  public canWithdraw: boolean;
  public canDeposit: boolean;
  public updateTime: Date;
  public balances: Array<{ asset: string, free: string, locked: string }>;

  constructor(raw: IBinanceOutboundAccountInfoStreamRaw) {
    this.eventType = raw.e;
    this.eventTime = new Date(raw.E);
    this.makerCommission = raw.m;
    this.takerCommission = raw.t;
    this.buyerCommission = raw.b;
    this.sellerCommission = raw.s;
    this.canTrade = raw.T;
    this.canWithdraw = raw.W;
    this.canDeposit = raw.D;
    this.updateTime = new Date(raw.u);
    this.balances = raw.B.map((b) => {
      return {
        asset: b.a,
        free: b.f,
        locked: b.l,
      };
    });
  }

  get raw(): IBinanceOutboundAccountInfoStreamRaw {
    return {
      e: this.eventType,
      E: this.eventTime.valueOf(),
      m: this.makerCommission,
      t: this.takerCommission,
      b: this.buyerCommission,
      s: this.sellerCommission,
      T: this.canTrade,
      W: this.canWithdraw,
      D: this.canDeposit,
      u: this.updateTime.valueOf(),
      B: this.balances.map((b) => {
        return {
          a: b.asset,
          f: b.free,
          l: b.locked,
        };
      }),
    };
  }
}
