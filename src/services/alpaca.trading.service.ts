import Alpaca from '@alpacahq/alpaca-trade-api';
import { getDateFrom } from '../commons';
import {
  AssetsParams,
  MarketCalendarParams,
  SymbolParams,
} from '../types';


const alpaca = new Alpaca({
  paper: true,
});

export const getAccount = async () => {
  return await alpaca.getAccount();
};

export const getAccountConfiguration = async () => {
  return await alpaca.getAccountConfigurations();
};

export const getPositionsStatus = async () => {
  return await alpaca.getPositions();
};

export const getMarketCalendar = async (params: MarketCalendarParams) => {
  const { start, end } = params;

  return alpaca.getCalendar({
    start: new Date(start),
    end: new Date(end),
  });
};

export const getPortfolioHistory = async () => {
  return await alpaca.getPortfolioHistory({
    date_start: getDateFrom(1),
    date_end: new Date(),
    period: 'all',
    timeframe: '1D',
    extended_hours: true
  });
};

export const pullNews = async () => {
  return await alpaca.getNews({});
};

export const getOrders = async (params: any) => {
  if (params.orderId) {
    return await getOrderById(params.orderId);
  }

  return alpaca.getOrders(params);
};

const getOrderById = async (orderId: string) => {
  return alpaca.getOrder(orderId);
}

export const createOrder = async (orderParams: any) => {
  return await alpaca.createOrder(orderParams);
};

export const getAsset = async (symbol: string) => {
  return await alpaca.getAsset(symbol);
};

export const getAssets = async (params: AssetsParams) => {
  return await alpaca.getAssets(params);
};

export const getSymbolTrades = async (params: SymbolParams) => {
  const { symbol, days } = params;
  return await alpaca.getCryptoBars(
    symbol,
    {
      start: getDateFrom(days),
      end: new Date(),
      timeframe: "1Day",
    },
  );
};

export const getSymbolQuotes = async (params: any) => {
  const { symbol, days } = params;
  return await alpaca.getQuotesV2(
    symbol,
    {
      start: getDateFrom(days),
      end: new Date(),
      limit: 6
    },
  );
};
