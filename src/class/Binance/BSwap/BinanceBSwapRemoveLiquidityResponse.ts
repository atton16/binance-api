export class BinanceBSwapRemoveLiquidityResponse {
  public operationId: number;

  constructor(opt: {
    operationId: number,
  }) {
    this.operationId = opt.operationId;
  }
}
