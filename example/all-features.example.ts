import { BinanceAPI } from '../src';

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
api.bswap.pools({...cred}).then(console.log);
api.bswap.liquidity({...cred}).then(console.log);
api.bswap.addLiquidity({...cred, poolId: 0, asset: 'BTC', quantity: 1}).then(console.log);
api.bswap.removeLiquidity({...cred, poolId: 0, asset: ['BTC'], type: 'SINGLE', shareAmount: 1}).then(console.log);