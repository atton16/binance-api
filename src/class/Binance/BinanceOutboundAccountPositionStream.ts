interface IBinanceOutboundAccountPositionStreamRaw {
  e: 'outboundAccountPosition';
  E: number;
  u: number;
  B: Array<{
    a: string,
    f: string,
    l: string,
  }>;
}

export class BinanceOutboundAccountPositionStream {
  public eventType: 'outboundAccountPosition';
  public eventTime: Date;
  public updateTime: Date;
  public balances: Array<{ asset: string, free: string, locked: string }>;

  constructor(raw: IBinanceOutboundAccountPositionStreamRaw) {
    this.eventType = raw.e;
    this.eventTime = new Date(raw.E);
    this.updateTime = new Date(raw.u);
    this.balances = raw.B.map((b) => {
      return {
        asset: b.a,
        free: b.f,
        locked: b.l,
      };
    });
  }

  get raw(): IBinanceOutboundAccountPositionStreamRaw {
    return {
      e: this.eventType,
      E: this.eventTime.valueOf(),
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
