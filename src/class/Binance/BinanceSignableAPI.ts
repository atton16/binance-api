import * as crypto from 'crypto';
import * as querystring from 'querystring';

export class BinanceSignableAPI {
  protected _signBody(obj: any, secretKey: string): string {
    return querystring.stringify(this._signQs(obj, secretKey));
  }

  protected _signQs(obj: any, secretKey: string): any {
    const form = querystring.stringify(obj);
    const signature = crypto.createHmac('sha256', secretKey)
                       .update(form)
                       .digest('hex');
    const signedObj = Object.assign({}, obj, {signature});
    return signedObj;
  }

  protected _signHeader(contentLength: number, apiKey: string): {
    'Content-Length': number,
    'Content-Type': string,
    'X-MBX-APIKEY': string,
  } {
    return {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey,
    };
  }
}
