export class BinanceGetFlexibleProductPositionResponse {
  public annualInterestRate: number;
  public asset: string;
  public avgAnnualInterestRate: number;
  public canRedeem: boolean;
  public dailyInterestRate: number;
  public freeAmount: number;
  public freezeAmount: number; // NOTE: deprecated
  public lockedAmount: number; // NOTE: deprecated
  public productId: string;
  public productName: string;
  public redeemingAmount: number;
  public todayPurchasedAmount: number;
  public totalAmount: number;
  public totalInterest: number;

  constructor(opt: {
    annualInterestRate: string,
    asset: string,
    avgAnnualInterestRate: string,
    canRedeem: boolean,
    dailyInterestRate: string,
    freeAmount: string,
    freezeAmount: string, // NOTE: deprecated
    lockedAmount: string, // NOTE: deprecated
    productId: string,
    productName: string,
    redeemingAmount: string,
    todayPurchasedAmount: string,
    totalAmount: string,
    totalInterest: string,
  }) {
    this.annualInterestRate = Number(opt.annualInterestRate).valueOf();
    this.asset = opt.asset;
    this.avgAnnualInterestRate = Number(opt.avgAnnualInterestRate).valueOf();
    this.canRedeem = opt.canRedeem;
    this.dailyInterestRate = Number(opt.dailyInterestRate).valueOf();
    this.freeAmount = Number(opt.freeAmount).valueOf();
    this.freezeAmount = Number(opt.freezeAmount).valueOf(); // NOTE: deprecated
    this.lockedAmount = Number(opt.lockedAmount).valueOf(); // NOTE: deprecated
    this.productId = opt.productId;
    this.productName = opt.productName;
    this.redeemingAmount = Number(opt.redeemingAmount).valueOf();
    this.todayPurchasedAmount = Number(opt.todayPurchasedAmount).valueOf();
    this.totalAmount = Number(opt.totalAmount).valueOf();
    this.totalInterest = Number(opt.totalInterest).valueOf();
  }
}
