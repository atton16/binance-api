import * as moment from 'moment';
import * as request from 'request-promise';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as WebSocket from 'ws';
// tslint:disable: no-var-requires
// tslint:disable: variable-name
const ms = require('ms');
import { IBinanceCancelOrderResponse } from '../../interface/IBinanceCancelOrderResponse';
import { Portfolio } from '../Generic/Portfolio';
import { Ticker } from '../Generic/Ticker';
import { BinanceExchangeInfo } from './BinanceExchangeInfo';
import { BinanceGetOrderResponse } from './BinanceGetOrderResponse';
import { BinanceKlineStream } from './BinanceKlineStream';
import { BinanceMiniTicker } from './BinanceMiniTicker';
import {
  BinanceOrderACKResponse,
  BinanceOrderFULLResponse,
  BinanceOrderRESULTResponse,
} from './BinanceOrderResponse';
import { BinanceQueryOrderResponse } from './BinanceQueryOrderResponse';
import { BinanceSignableAPI } from './BinanceSignableAPI';
import { BinanceTradeStream } from './BinanceTradeStream';
import {
  BinanceChartIntervals,
  BinanceKlinesResponse,
  BinanceOrderSide,
  BinanceOrderType,
  BinanceTimeInForce,
} from './BinanceTypes';
import { BinanceUserDataStream } from './BinanceUserDataStream';
import { BinanceWebSocket } from './BinanceWebSocket';
import { BinanceSavingsAPI } from './Savings/Flexible/BinanceSavingsAPI';

export class BinanceAPI extends BinanceSignableAPI {
  public userDataStream = new BinanceUserDataStream();
  public savings = new BinanceSavingsAPI();
  private baseUrl = 'https://api.binance.com';
  private wsBaseUrl = 'wss://stream.binance.com:9443';
  private ws: {
    [key: string]: BinanceWebSocket<any>,
  } = {};
  private wsReconnectPeriod = '24h';

  public exchangeInfo(): Promise<BinanceExchangeInfo> {
    return request.get({
      json: true,
      uri: new URL('/api/v1/exchangeInfo', this.baseUrl).toString(),
    }).then((res) => new BinanceExchangeInfo(res));
  }

  public accountInfo(opt: {
    apiKey: string,
    secretKey: string,
    timestamp?: number,
  }): Promise<Portfolio> {
    const obj = {
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    const signedQs = this._signQs(obj, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      json: true,
      uri: new URL('/api/v3/account', this.baseUrl).toString(),
    }).then((res) => new Portfolio(res));
  }

  public accountTradeList(opt: {
    apiKey: string,
    secretKey: string,
    symbol: string,
    startTime?: number,
    endTime?: number,
    fromId?: number,
    limit?: number,
    recvWindow?: number,
    timestamp?: number,
  }): Promise<Portfolio> {
    const obj: any = {
      symbol: opt.symbol,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.startTime) { obj.startTime = opt.startTime; }
    if (opt.endTime) { obj.endTime = opt.endTime; }
    if (opt.fromId) { obj.fromId = opt.fromId; }
    if (opt.limit) { obj.limit = opt.limit; }
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedQs = this._signQs(obj, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      json: true,
      uri: new URL('/api/v3/myTrades', this.baseUrl).toString(),
    }).then((res) => new Portfolio(res));
  }

  public order(opt: {
    apiKey: string,
    secretKey: string,
    symbol: string,
    side: BinanceOrderSide,
    type: BinanceOrderType,
    timeInForce?: BinanceTimeInForce,
    quantity?: number,
    quoteOrderQty?: number,
    price?: number,
    newClientOrderId?: string,
    stopPrice?: number,
    recvWindow?: number,
    timestamp?: number,
  }): Promise<BinanceOrderACKResponse | BinanceOrderRESULTResponse | BinanceOrderFULLResponse> {
    const obj: any = {
      symbol: opt.symbol,
      side: opt.side,
      type: opt.type,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.quantity) { obj.quantity = opt.quantity; }
    if (opt.quoteOrderQty) { obj.quoteOrderQty = opt.quoteOrderQty; }
    if (opt.price) { obj.price = opt.price; }
    if (opt.timeInForce) { obj.timeInForce = opt.timeInForce; }
    if (opt.newClientOrderId) { obj.newClientOrderId = opt.newClientOrderId; }
    if (opt.stopPrice) { obj.stopPrice = opt.stopPrice; }
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedForm = this._signBody(obj, opt.secretKey);
    const signedHeaders = this._signHeader(signedForm.length, opt.apiKey);
    return request.post({
      body: signedForm,
      headers: signedHeaders,
      json: true,
      uri: new URL('/api/v3/order', this.baseUrl).toString(),
    }).then((res) => {
      if (res.fills !== undefined) {
        return new BinanceOrderFULLResponse(res);
      } else if (res.price !== undefined) {
        return new BinanceOrderRESULTResponse(res);
      } else {
        return new BinanceOrderACKResponse(res);
      }
    });
  }

  public queryOrder(opt: {
    apiKey: string,
    secretKey: string,
    symbol: string,
    orderId?: number,
    origClientOrderId?: string,
    recvWindow?: number,
    timestamp?: number,
  }) {
    const obj: any = {
      symbol: opt.symbol,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.orderId) { obj.orderId = opt.orderId; }
    if (opt.origClientOrderId) { obj.origClientOrderId = opt.origClientOrderId; }
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedQs = this._signQs(obj, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      json: true,
      uri: new URL('/api/v3/order', this.baseUrl).toString(),
    }).then((res) => new BinanceQueryOrderResponse(res));
  }

  public cancelOrder(opt: {
    apiKey: string,
    secretKey: string,
    symbol: string,
    orderId?: number,
    origClientOrderId?: string,
    newClientOrderId?: string,
    recvWindow?: number,
    timestamp?: number,
  }): Promise<IBinanceCancelOrderResponse> {
    const obj: any = {
      symbol: opt.symbol,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.orderId) { obj.orderId = opt.orderId; }
    if (opt.origClientOrderId) { obj.origClientOrderId = opt.origClientOrderId; }
    if (opt.newClientOrderId) { obj.newClientOrderId = opt.newClientOrderId; }
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedForm = this._signBody(obj, opt.secretKey);
    const signedHeaders = this._signHeader(signedForm.length, opt.apiKey);
    return request.delete({
      body: signedForm,
      headers: signedHeaders,
      uri: new URL('/api/v3/order', this.baseUrl).toString(),
    }).then((res) => res);
  }

  public openOrders(opt: {
    apiKey: string,
    secretKey: string,
    symbol?: string,
    recvWindow?: number,
    timestamp?: number,
  }): Promise<BinanceGetOrderResponse[]> {
    const obj: any = {
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.symbol) { obj.symbol = opt.symbol; }
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedQs = this._signQs(obj, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      uri: new URL('/api/v3/openOrders', this.baseUrl).toString(),
    }).then((res) => res.map((r: any) => new BinanceGetOrderResponse(r)));
  }

  public allOrders(opt: {
    apiKey: string,
    secretKey: string,
    symbol: string,
    startTime?: number,
    endTime?: number,
    limit?: number,
    recvWindow?: number,
    timestamp?: number,
  }): Promise<BinanceGetOrderResponse[]> {
    const obj: any = {
      symbol: opt.symbol,
      timestamp: opt.timestamp ? opt.timestamp : Date.now(),
    };
    if (opt.startTime) { obj.startTime = opt.startTime; }
    if (opt.endTime) { obj.endTime = opt.endTime; }
    if (opt.limit) { obj.limit = opt.limit; }
    if (opt.recvWindow) { obj.recvWindow = opt.recvWindow; }
    const signedQs = this._signQs(obj, opt.secretKey);
    const signedHeaders = this._signHeader(0, opt.apiKey);
    return request.get({
      qs: signedQs,
      headers: signedHeaders,
      uri: new URL('/api/v3/allOrders', this.baseUrl).toString(),
    }).then((res) => res.map((r: any) => new BinanceGetOrderResponse(r)));
  }

  public avgPrice(symbol: string): Promise<{
    mins: number, price: string,
  }> {
    return request.get({
      json: true,
      qs: { symbol },
      uri: new URL('/api/v3/avgPrice', this.baseUrl).toString(),
    }).then((res) => res);
  }

  public klines(symbol: string, interval: BinanceChartIntervals, opts?: {
    startTime: Date, endTime: Date, limit: number,
  }): Promise<BinanceKlinesResponse> {
    const qs: any = { symbol, interval };
    if (opts && opts.startTime) { qs.startTime = opts.startTime.valueOf(); }
    if (opts && opts.endTime) { qs.endTime = opts.endTime.valueOf(); }
    if (opts && opts.limit) { qs.limit = opts.limit; }
    return request.get({
      json: true,
      qs,
      uri: new URL('/api/v1/klines', this.baseUrl).toString(),
    }).then((res) => res);
  }

  public ticker24h(symbol: string): Promise<Ticker> {
    return request.get({
      json: true,
      qs: { symbol },
      uri: new URL('/api/v1/ticker/24hr', this.baseUrl).toString(),
    }).then((res) => new Ticker(res));
  }

  public tradeStream(symbol: string): Observable<BinanceTradeStream> {
    return this._stream({symbol, streamType: 'trade'}, BinanceTradeStream);
  }

  public miniTickerStream(symbol: string): Observable<BinanceMiniTicker> {
    return this._stream({symbol, streamType: 'miniTicker'}, BinanceMiniTicker);
  }

  public klineStream(symbol: string, interval: BinanceChartIntervals): Observable<BinanceKlineStream> {
    return this._stream({symbol, streamType: 'kline', interval}, BinanceKlineStream);
  }

  private _stream(
    opt: {symbol: string, streamType: 'trade'|'miniTicker'|'kline', interval?: BinanceChartIntervals},
    Entity: any): Observable<any> {
    const intervalStr = opt.streamType === 'kline' ? `_${opt.interval}` : '';
    const path = `/ws/${opt.symbol.toLowerCase()}@${opt.streamType}${intervalStr}`;
    const url = new URL(path, this.wsBaseUrl).toString();
    const timeout = setTimeout(() => {
      console.debug(`Reconnect ${opt.streamType} stream (${moment().format('L LT')})`);
      this.ws[path].ws.close();
      this._stream(opt, Entity);
    }, ms(this.wsReconnectPeriod));

    if (this.ws[path]) {
      this.ws[path].ws = new WebSocket(url);
      this.ws[path].wsReconnectTimeout = timeout;
    } else {
      this.ws[path] = {
        $: new BehaviorSubject<any>(null),
        ws: new WebSocket(url),
        wsReconnectTimeout: timeout,
      };
    }
    this.ws[path].ws.onmessage = (event: { data: WebSocket.Data, type: string, target: WebSocket }): void => {
      this.ws[path].$.next(new Entity(JSON.parse(event.data as string)));
    };

    this.ws[path].ws.onclose = (event) => {
      console.debug('WebSocket is closed now.');
    };

    this.ws[path].ws.onerror = (event) => {
      console.error('WebSocket error observed:', event);
    };

    return this.ws[path].$.asObservable().pipe(filter((i) => i !== null));

  }

  private _APIKeyHeader(apiKey: string): {
    'X-MBX-APIKEY': string,
  } {
    return {
      'X-MBX-APIKEY': apiKey,
    };
  }

}
