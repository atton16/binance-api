import request from '../../../polyfill/request-promise';
import { BinanceSignableAPI } from '../BinanceSignableAPI';
import { BinanceBSwapAddLiquidityResponse } from './BinanceBSwapAddLiquidityResponse';
import { BinanceBSwapGetLiquidityInfoResponse } from './BinanceBSwapGetLiquidityInfoResponse';
import { BinanceBSwapGetPoolListResponse } from './BinanceBSwapGetPoolListResponse';
import { BinanceBSwapRemoveLiquidityResponse } from './BinanceBSwapRemoveLiquidityResponse';

// Reference: https://binance-docs.github.io/apidocs/spot/en/#bswap-endpoints
export class BinanceBSwapSavingsAPI extends BinanceSignableAPI {
  private baseUrl = 'https://api.binance.com';

  // List All Swap Pools (MARKET_DATA)
  // GET /sapi/v1/bswap/pools
  public pools(opt: {
    apiKey: string,
    secretKey: string,
  }): Promise<BinanceBSwapGetPoolListResponse[]> {
    const signedQs = this._signQs({}, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      json: true,
      uri: new URL('/sapi/v1/bswap/pools', this.baseUrl).toString(),
    }).then((res) => res.map((r: any) => new BinanceBSwapGetPoolListResponse(r)));
  }

  // Get liquidity information of a pool (USER_DATA)
  // GET /sapi/v1/bswap/liquidity (HMAC SHA256)
  public liquidity(opt: {
    apiKey: string,
    secretKey: string,
    poolId?: number,
    recvWindow?: number,
    timestamp?: number,
  }): Promise<BinanceBSwapGetLiquidityInfoResponse[]> {
    const obj: any = {
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.poolId) { obj.poolId = opt.poolId; }
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedQs = this._signQs(obj, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      json: true,
      uri: new URL('/sapi/v1/bswap/liquidity', this.baseUrl).toString(),
    }).then((res) => res.map((r: any) => new BinanceBSwapGetLiquidityInfoResponse(r)));
  }

  // Add Liquidity (TRADE)
  // POST /sapi/v1/bswap/liquidityAdd (HMAC SHA256)
  public addLiquidity(opt: {
    apiKey: string,
    secretKey: string,
    poolId: number,
    asset: string,
    quantity: number,
    recvWindow?: number,
    timestamp?: number,
  }): Promise<BinanceBSwapAddLiquidityResponse> {
    const obj: any = {
      poolId: opt.poolId,
      asset: opt.asset,
      quantity: opt.quantity,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedForm = this._signBody(obj, opt.secretKey);
    const signedHeaders = this._signHeader(signedForm.length, opt.apiKey);
    return request.post({
      body: signedForm,
      headers: signedHeaders,
      json: true,
      uri: new URL('/sapi/v1/bswap/liquidityAdd', this.baseUrl).toString(),
    }).then((res) => new BinanceBSwapAddLiquidityResponse(res));
  }

  // Remove Liquidity (TRADE)
  // POST /sapi/v1/bswap/liquidityRemove (HMAC SHA256)
  public removeLiquidity(opt: {
    apiKey: string,
    secretKey: string,
    poolId: number,
    type: 'SINGLE'|'COMBINATION',
    asset: string[],
    shareAmount: number,
    recvWindow?: number,
    timestamp?: number,
  }): Promise<BinanceBSwapRemoveLiquidityResponse> {
    const obj: any = {
      poolId: opt.poolId,
      type: opt.type,
      asset: opt.asset,
      shareAmount: opt.shareAmount,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedForm = this._signBody(obj, opt.secretKey);
    const signedHeaders = this._signHeader(signedForm.length, opt.apiKey);
    return request.post({
      body: signedForm,
      headers: signedHeaders,
      json: true,
      uri: new URL('/sapi/v1/bswap/liquidityRemove', this.baseUrl).toString(),
    }).then((res) => new BinanceBSwapRemoveLiquidityResponse(res));
  }
}
