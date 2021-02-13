import { countDecimals } from '../../utils/Number/countDecimals';
import { round } from '../../utils/Number/round';

export class BinanceUtils {
  public static orderMaxPrice(filters: any, avgPrice: any) {
    let price = avgPrice.price;
    let priceFilter: any;
    let percentPrice: any;
    filters.forEach((filter: any) => {
      if (filter.filterType === 'PRICE_FILTER') { priceFilter = filter; return; }
      if (filter.filterType === 'PERCENT_PRICE') { percentPrice = filter; return; }
    });
    const tickSize = parseFloat(priceFilter.tickSize);

    price *= percentPrice.multiplierUp;

    if (price > priceFilter.maxPrice) {
      price = priceFilter.maxPrice;
    }

    return round(price, countDecimals(tickSize));
  }
}
