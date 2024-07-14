import request from '../../../../polyfill/request-promise';
import { BinanceSignableAPI } from '../../BinanceSignableAPI';
import { BinanceGetFlexibleProductListResponse } from './BinanceGetFlexibleProductListResponse';
import { BinanceGetFlexibleProductPositionResponse } from './BinanceGetFlexibleProductPositionResponse';
import { BinanceGetLeftDailyPurchaseQuotaOfFlexibleProductResponse } from './BinanceGetLeftDailyPurchaseQuotaOfFlexibleProductResponse';
import { BinanceGetLeftDailyRedemptionQuotaOfFlexibleProductResponse } from './BinanceGetLeftDailyRedemptionQuotaOfFlexibleProductResponse';
import { BinanceLendingAccountResponse } from './BinanceLendingAccountResponse';
import { BinancePurchaseFlexibleProductResponse } from './BinancePurchaseFlexibleProductResponse';

// Reference: https://binance-docs.github.io/apidocs/spot/en/#savings-endpoints
export class BinanceFlexibleSavingsAPI extends BinanceSignableAPI {
  private baseUrl = 'https://api.binance.com';

  // Get Flexible Product List (USER_DATA)
  // GET /sapi/v1/lending/daily/product/list (HMAC SHA256)
  public products(opt: {
    apiKey: string,
    secretKey: string,
    status?: 'ALL'|'SUBSCRIBABLE'|'UNSUBSCRIBABLE',
    featured?: 'ALL'|'true',
    recvWindow?: number,
    timestamp?: number,
  }): Promise<BinanceGetFlexibleProductListResponse[]> {
    const obj: any = {
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.status) { obj.status = opt.status; }
    if (opt.featured) { obj.featured = opt.featured; }
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedQs = this._signQs(obj, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      json: true,
      uri: new URL('/sapi/v1/lending/daily/product/list', this.baseUrl).toString(),
    }).then((res) => res.map((r: any) => new BinanceGetFlexibleProductListResponse(r)));
  }

  // Get Left Daily Purchase Quota of Flexible Product (USER_DATA)
  // GET /sapi/v1/lending/daily/userLeftQuota (HMAC SHA256)
  public leftDailyPurchaseQuota(opt: {
    apiKey: string,
    secretKey: string,
    productId: string,
    recvWindow?: number,
    timestamp?: number,
  }): Promise<BinanceGetLeftDailyPurchaseQuotaOfFlexibleProductResponse> {
    const obj: any = {
      productId: opt.productId,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedQs = this._signQs(obj, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      json: true,
      uri: new URL('/sapi/v1/lending/daily/userLeftQuota', this.baseUrl).toString(),
    }).then((res) => new BinanceGetLeftDailyPurchaseQuotaOfFlexibleProductResponse(res));
  }

  // Purchase Flexible Product (USER_DATA)
  // POST /sapi/v1/lending/daily/purchase (HMAC SHA256)
  public purchase(opt: {
    apiKey: string,
    secretKey: string,
    productId: string,
    amount: number,
    recvWindow?: number,
    timestamp?: number,
  }): Promise<BinancePurchaseFlexibleProductResponse> {
    const obj: any = {
      productId: opt.productId,
      amount: opt.amount,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedForm = this._signBody(obj, opt.secretKey);
    const signedHeaders = this._signHeader(signedForm.length, opt.apiKey);
    return request.post({
      body: signedForm,
      headers: signedHeaders,
      json: true,
      uri: new URL('/sapi/v1/lending/daily/purchase', this.baseUrl).toString(),
    }).then((res) => new BinancePurchaseFlexibleProductResponse(res));
  }

  // Get Left Daily Redemption Quota of Flexible Product (USER_DATA)
  // GET /sapi/v1/lending/daily/userRedemptionQuota (HMAC SHA256)
  public leftDailyRedemptionQuota(opt: {
    apiKey: string,
    secretKey: string,
    productId: string,
    type: 'FAST'|'NORMAL',
    recvWindow?: number,
    timestamp?: number,
  }): Promise<BinanceGetLeftDailyRedemptionQuotaOfFlexibleProductResponse> {
    const obj: any = {
      productId: opt.productId,
      type: opt.type,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedQs = this._signQs(obj, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      json: true,
      uri: new URL('/sapi/v1/lending/daily/userRedemptionQuota', this.baseUrl).toString(),
    }).then((res) => new BinanceGetLeftDailyRedemptionQuotaOfFlexibleProductResponse(res));
  }

  // Redeem Flexible Product (USER_DATA)
  // POST /sapi/v1/lending/daily/redeem (HMAC SHA256)
  public redeem(opt: {
    apiKey: string,
    secretKey: string,
    productId: string,
    amount: number,
    type: 'FAST'|'NORMAL',
    recvWindow?: number,
    timestamp?: number,
  }): Promise<undefined> {
    const obj: any = {
      productId: opt.productId,
      amount: opt.amount,
      type: opt.type,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedForm = this._signBody(obj, opt.secretKey);
    const signedHeaders = this._signHeader(signedForm.length, opt.apiKey);
    return request.post({
      body: signedForm,
      headers: signedHeaders,
      json: true,
      uri: new URL('/sapi/v1/lending/daily/redeem', this.baseUrl).toString(),
    }).then((res) => undefined); // NOTE: this endpoint reponse with empty object "{}"
  }

  // Get Flexible Product Position (USER_DATA)
  // GET /sapi/v1/lending/daily/token/position (HMAC SHA256)
  public positions(opt: {
    apiKey: string,
    secretKey: string,
    asset: string,
    recvWindow?: number,
    timestamp?: number,
  }): Promise<BinanceGetFlexibleProductPositionResponse[]> {
    const obj: any = {
      asset: opt.asset,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedQs = this._signQs(obj, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      json: true,
      uri: new URL('/sapi/v1/lending/daily/token/position', this.baseUrl).toString(),
    }).then((res) => res.map((r: any) => new BinanceGetFlexibleProductPositionResponse(r)));
  }

  // Lending Account (USER_DATA)
  // GET /sapi/v1/lending/union/account (HMAC SHA256)
  public account(opt: {
    apiKey: string,
    secretKey: string,
    recvWindow?: number,
    timestamp?: number,
  }) {
    const obj: any = {
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedQs = this._signQs(obj, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      json: true,
      uri: new URL('/sapi/v1/lending/union/account', this.baseUrl).toString(),
    }).then((res) => new BinanceLendingAccountResponse(res));
  }

  // Get Purchase Record (USER_DATA)
  // GET /sapi/v1/lending/union/purchaseRecord (HMAC SHA256)

  // Get Redemption Record (USER_DATA)
  // GET /sapi/v1/lending/union/redemptionRecord (HMAC SHA256)

  // Get Interest History (USER_DATA)
  // GET /sapi/v1/lending/union/interestHistory (HMAC SHA256)
}
