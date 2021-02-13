export class BinancePurchaseFlexibleProductResponse {
  public purchaseId: number;

  constructor(opt: {
    purchaseId: number,
  }) {
    this.purchaseId = opt.purchaseId;
  }
}
