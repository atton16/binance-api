export class BinanceGetLeftDailyPurchaseQuotaOfFlexibleProductResponse {
  public asset: string;
  public leftQuota: number;

  constructor(opt: {
    asset: string,
    leftQuota: string,
  }) {
    this.asset = opt.asset;
    this.leftQuota = Number(opt.leftQuota).valueOf();
  }
}
