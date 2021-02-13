import * as moment from 'moment';
import * as request from 'request-promise';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as WebSocket from 'ws';
import { BinanceExecutionReportStream } from './BinanceExecutionReportStream';
import { BinanceOutboundAccountPositionStream } from './BinanceOutboundAccountPositionStream';
// tslint:disable: no-var-requires
// tslint:disable: variable-name
const ms = require('ms');

export class BinanceUserDataStream {
  private _$ = new BehaviorSubject<any>(null);
  private baseUrl = 'https://api.binance.com';
  private wsBaseUrl = 'wss://stream.binance.com:9443';
  private listenKey: string;
  private ws: WebSocket;
  private wsReconnectTimeout: NodeJS.Timeout;
  private wsReconnectPeriod = '24h';
  private keepAliveInterval: NodeJS.Timeout;
  private keepAlivePeriod = '30m';

  public get $(): Observable<
    BinanceOutboundAccountPositionStream|
    BinanceExecutionReportStream
  > {
    return this._$.asObservable().pipe(filter((i) => i !== null));
  }

  public close(opt: {
    apiKey: string,
  }): Promise<{}> {
    if (!this.ws) {
      console.warn('No connection to close.');
      return Promise.resolve({});
    }
    this.ws.close();
    clearInterval(this.keepAliveInterval);
    this.ws = undefined;
    this.keepAliveInterval = undefined;
    return request.delete({
      qs: {
        listenKey: this.listenKey,
      },
      headers: this._APIKeyHeader(opt.apiKey),
      uri: new URL('/api/v1/userDataStream', this.baseUrl).toString(),
    }).then((res) => {
      this.listenKey = undefined;
      return res;
    // tslint:disable-next-line: no-unused-expression
    }).catch(() => null);
  }

  public async start(opt: {
    apiKey: string,
  }) {
    if (this.ws) {
      console.warn('Start new user data stream without explicitly closing the last connection.');
      this.close({apiKey: opt.apiKey});
    }
    const { listenKey } = await this._start({apiKey: opt.apiKey});
    this.listenKey = listenKey;
    this.keepAliveInterval = setInterval(() => {
      this._keepAlive({apiKey: opt.apiKey});
    }, ms(this.keepAlivePeriod));
    this.wsReconnectTimeout = setTimeout(() => {
      console.info(`Reconnect User Data Stream (${moment().format('L LT')})`);
      this.close({apiKey: opt.apiKey}).then(() => {
        this.start({apiKey: opt.apiKey});
      });
    }, ms(this.wsReconnectPeriod));
    const path = `/ws/${listenKey}`;
    const url = new URL(path, this.wsBaseUrl).toString();

    this.ws = new WebSocket(url);
    // tslint:disable: max-line-length
    this.ws.onmessage = (event: { data: WebSocket.Data, type: string, target: WebSocket }): void => {
      const raw = JSON.parse(event.data as string);
      if (raw.e === 'outboundAccountPosition') {
        this._$.next(new BinanceOutboundAccountPositionStream(raw));
      } else if (raw.e === 'executionReport') {
        this._$.next(new BinanceExecutionReportStream(raw));
      } else {
        console.warn('Unknown user data stream type!');
        this._$.next(raw);
      }
    };

    this.ws.onclose = (event) => {
      console.debug('WebSocket is closed now.');
    };

    this.ws.onerror = (event) => {
      console.error('WebSocket error observed:', event);
    };
  }

  private _start(opt: {
    apiKey: string,
  }): Promise<{listenKey: string}> {
    return request.post({
      headers: this._APIKeyHeader(opt.apiKey),
      json: true,
      uri: new URL('/api/v1/userDataStream', this.baseUrl).toString(),
    }).then((res) => res);
  }

  private _keepAlive(opt: {
    apiKey: string,
  }): Promise<{}> {
    return request.put({
      qs: {
        listenKey: this.listenKey,
      },
      headers: this._APIKeyHeader(opt.apiKey),
      uri: new URL('/api/v1/userDataStream', this.baseUrl).toString(),
    }).then((res) => {
      console.info(`USER DATA STREAM KEEPALIVE SENT! (${moment().format('L LT')})`);
      return res;
    });
  }

  private _APIKeyHeader(apiKey: string): {
    'X-MBX-APIKEY': string,
  } {
    return {
      'X-MBX-APIKEY': apiKey,
    };
  }
}
