import { BinanceSymbolType } from '../Binance/BinanceTypes';

export class Portfolio {
  public makerCommission: number;
  public takerCommission: number;
  public buyerCommission: number;
  public sellerCommission: number;
  public canTrade: boolean;
  public canWithdraw: boolean;
  public canDeposit: boolean;
  public updateTime: Date;
  public accountType: BinanceSymbolType;
  public balances: Array<{ asset: string, free: string, locked: string }>;

  constructor(opt: {
    makerCommission: number,
    takerCommission: number,
    buyerCommission: number,
    sellerCommission: number,
    canTrade: boolean,
    canWithdraw: boolean,
    canDeposit: boolean,
    updateTime: number,
    accountType: BinanceSymbolType,
    balances: any[],
  }) {
    this.makerCommission = opt.makerCommission;
    this.takerCommission = opt.takerCommission;
    this.buyerCommission = opt.buyerCommission;
    this.sellerCommission = opt.sellerCommission;
    this.canTrade = opt.canTrade;
    this.canWithdraw = opt.canWithdraw;
    this.canDeposit = opt.canDeposit;
    this.updateTime = new Date(opt.updateTime);
    this.accountType = opt.accountType;
    this.balances = opt.balances;
  }
}
