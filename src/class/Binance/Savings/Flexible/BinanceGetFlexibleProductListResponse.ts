export class BinanceGetFlexibleProductListResponse {
  public asset: string;
  public avgAnnualInterestRate: number;
  public canPurchase: boolean;
  public canRedeem: boolean;
  public dailyInterestPerThousand: number;
  public featured: boolean;
  public minPurchaseAmount: number;
  public productId: string;
  public purchasedAmount: number;
  public status: 'PURCHASING'|string;
  public upLimit: number;
  public upLimitPerUser: number;

  constructor(opt: {
    asset: string,
    avgAnnualInterestRate: string,
    canPurchase: boolean,
    canRedeem: boolean,
    dailyInterestPerThousand: string,
    featured: boolean,
    minPurchaseAmount: string,
    productId: string,
    purchasedAmount: string,
    status: string,
    upLimit: string,
    upLimitPerUser: string,
  }) {
    this.asset = opt.asset;
    this.avgAnnualInterestRate = Number(opt.avgAnnualInterestRate).valueOf();
    this.canPurchase = opt.canPurchase;
    this.canRedeem = opt.canRedeem;
    this.dailyInterestPerThousand = Number(opt.dailyInterestPerThousand).valueOf();
    this.featured = opt.featured;
    this.minPurchaseAmount = Number(opt.minPurchaseAmount).valueOf();
    this.productId = opt.productId;
    this.purchasedAmount = Number(opt.purchasedAmount).valueOf();
    this.status = opt.status;
    this.upLimit = Number(opt.upLimit).valueOf();
    this.upLimitPerUser = Number(opt.upLimitPerUser).valueOf();
  }
}
