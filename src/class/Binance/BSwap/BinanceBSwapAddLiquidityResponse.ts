export class BinanceBSwapAddLiquidityResponse {
  public operationId: number;

  constructor(opt: {
    operationId: number,
  }) {
    this.operationId = opt.operationId;
  }
}
