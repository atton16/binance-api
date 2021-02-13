export class BinanceGetLeftDailyRedemptionQuotaOfFlexibleProductResponse {
  public asset: string;
  public dailyQuota: number;
  public leftQuota: number;
  public minRedemptionAmount: number;

  constructor(opt: {
    asset: string,
    dailyQuota: string,
    leftQuota: string,
    minRedemptionAmount: string,
  }) {
    this.asset = opt.asset;
    this.dailyQuota = Number(opt.dailyQuota).valueOf();
    this.leftQuota = Number(opt.leftQuota).valueOf();
    this.minRedemptionAmount = Number(opt.minRedemptionAmount).valueOf();
  }
}
