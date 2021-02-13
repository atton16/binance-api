export class BinanceLendingAccountResponse {
  public positionAmountVos: Array<{
    amount: number;
    amountInBTC: number;
    amountInUSDT: number;
    asset: string;
  }>;
  public totalAmountInBTC: number;
  public totalAmountInUSDT: number;
  public totalFixedAmountInBTC: number;
  public totalFixedAmountInUSDT: number;
  public totalFlexibleInBTC: number;
  public totalFlexibleInUSDT: number;

  constructor(opt: {
    positionAmountVos: any,
    totalAmountInBTC: string,
    totalAmountInUSDT: string,
    totalFixedAmountInBTC: string,
    totalFixedAmountInUSDT: string,
    totalFlexibleInBTC: string,
    totalFlexibleInUSDT: string,
  }) {
    this.positionAmountVos = opt.positionAmountVos.map((pos: any) => {
      return {
        amount: Number(pos.amount).valueOf(),
        amountInBTC: Number(pos.amountInBTC).valueOf(),
        amountInUSDT: Number(pos.amountInUSDT).valueOf(),
        asset: pos.asset,
      };
    });
    this.totalAmountInBTC = Number(opt.totalAmountInBTC).valueOf();
    this.totalAmountInUSDT = Number(opt.totalAmountInUSDT).valueOf();
    this.totalFixedAmountInBTC = Number(opt.totalFixedAmountInBTC).valueOf();
    this.totalFixedAmountInUSDT = Number(opt.totalFixedAmountInUSDT).valueOf();
    this.totalFlexibleInBTC = Number(opt.totalFlexibleInBTC).valueOf();
    this.totalFlexibleInUSDT = Number(opt.totalFlexibleInUSDT).valueOf();
  }
}
