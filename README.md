# Binance Client API SDK for Node.js

Binance Client API SDK for Node.js

## Features

- Binance REST API
- Binance User Data Stream
- Binance Web Socket Streams
- Binance Savings Endpoints (Flexible only)

## Install

```sh
npm install @atton16/binance-api
```

## Examples

```typescript
import { BinanceAPI } from '@atton16/binance-api';

const cred = {
  apiKey: '',
  secretKey: '',
};

const api = new BinanceAPI();
api.accountInfo({...cred}).then(console.log);
api.accountTradeList({...cred, symbol: 'BTCUSDT'}).then(console.log);
api.allOrders({...cred, symbol: 'BTCUSDT'}).then(console.log);
api.avgPrice('BTCUSDT').then(console.log);
api.cancelOrder({...cred, symbol: 'BTCUSDT', orderId: 1234}).then(console.log);
api.exchangeInfo().then(console.log);
api.klineStream('BTCUSDT', '1d').subscribe(console.log);
api.klines('BTCUSDT', '1d').then(console.log);
api.miniTickerStream('BTCUSDT').subscribe(console.log);
api.openOrders({...cred}).then(console.log);
api.order({...cred, symbol: 'BTCUSDT', side: 'BUY', type: 'LIMIT', price: 40000}).then(console.log);
api.priceTicker().then(console.log);
api.queryOrder({...cred, symbol: 'BTCUSDT'}).then(console.log);
api.savings.flexible.account({...cred}).then(console.log);
api.savings.flexible.products({...cred}).then((products) => {
  console.log(products);
  products.forEach((p) => {
    api.savings.flexible.leftDailyPurchaseQuota({...cred, productId: p.productId}).then(console.log);
    api.savings.flexible.leftDailyRedemptionQuota({...cred, productId: p.productId, type: 'FAST'}).then(console.log);
    api.savings.flexible.purchase({...cred, productId: p.productId, amount: 100}).then(console.log);
    api.savings.flexible.redeem({...cred, productId: p.productId, amount: 100, type: 'FAST'}).then(console.log);
  });
});
api.savings.flexible.positions({...cred, asset: 'BTC'}).then(console.log);
api.ticker24h('BTCUSDT').then(console.log);
api.tradeStream('BTCUSDT').subscribe(console.log);
api.userDataStream.start({apiKey: cred.apiKey}).then(() => {
  api.userDataStream.$.subscribe(console.log);
  setTimeout(() => {
    api.userDataStream.close({apiKey: cred.apiKey});
  }, 1000);
});
```

## License

Copyright 2020 Attawit Kittikrairit

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
