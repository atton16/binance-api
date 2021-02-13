import { Subject } from 'rxjs';
import * as WebSocket from 'ws';

export class BinanceWebSocket<T> {
  public $: Subject<T>;
  public ws: WebSocket;
  public wsReconnectTimeout: NodeJS.Timeout;
}
