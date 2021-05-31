export class BinanceBSwapGetPoolListResponse {
  public poolId: number;
  public poolName: string;
  public assets: string[];

  constructor(opt: {
    poolId: number,
    poolName: string,
    assets: string[],
  }) {
    this.poolId = opt.poolId;
    this.poolName = opt.poolName;
    this.assets = opt.assets;
  }
}
