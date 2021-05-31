export class BinanceBSwapGetLiquidityInfoResponse {
  public poolId: number;
  public poolName: string;
  public updateTime: Date;
  public liquidity: Record<string, number>;
  public share: {
    shareAmount: number;
    sharePercentage: number;
    asset: Record<string, number>;
  };

  constructor(opt: {
    poolId: number,
    poolName: string,
    updateTime: number,
    liquidity: Record<string, string>,
    share: {
      shareAmount: string;
      sharePercentage: string;
      asset: Record<string, string>;
    },
  }) {
    this.poolId = opt.poolId;
    this.poolName = opt.poolName;
    this.updateTime = new Date(opt.updateTime);
    this.liquidity = {};
    let keys = Object.keys(opt.liquidity);
    for (const key of keys) {
      this.liquidity[key] = Number(opt.liquidity[key]).valueOf();
    }
    this.share = {
      shareAmount: Number(opt.share.shareAmount).valueOf(),
      sharePercentage: Number(opt.share.sharePercentage).valueOf(),
      asset: {},
    };
    keys = Object.keys(opt.share.asset);
    for (const key of keys) {
      this.share.asset[key] = Number(opt.share.asset[key]).valueOf();
    }
  }
}
