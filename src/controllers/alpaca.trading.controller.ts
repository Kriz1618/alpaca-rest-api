import { Handler } from "express";
import { handleError } from "../commons";
import {
  createOrder,
  getAccount,
  getAccountConfiguration,
  getOrders,
  getAsset,
  getAssets,
  getMarketCalendar,
  getPortfolioHistory,
  getPositionsStatus,
  getSymbolQuotes,
  getSymbolTrades,
  pullNews,
  subscribeDataStream,
  unSubscribeDataStream,
  subscribeCryptoStream,
  unsubscribeCryptoStream
} from "../services";
import {
  CryptoParams,
  SubscribeCryptoParams,
  SubscribeDataParams,
  DataParams,
} from "../types";

export const getAccountData: Handler = async (req, res) => {
  try {
    const accountData = await getAccount();
    return res.json(accountData);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};

export const getAccountConfig: Handler = async (req, res) => {
  try {
    const accountData = await getAccountConfiguration();
    return res.json(accountData);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};

export const getPositions: Handler = async (_, res) => {
  try {
    const accountData = await getPositionsStatus();
    return res.json(accountData);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};

export const getAccountOrders: Handler = async (req, res) => {
  try {
    const orders = await getOrders(req.query);
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};

export const getPortfolioHistoryData: Handler = async (_, res) => {
  try {
    const history = await getPortfolioHistory();
    return res.json(history);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};

export const getNews: Handler = async (_, res) => {
  try {
    const news = await pullNews();
    return res.json(news);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};

export const createNewOrder: Handler = async (req, res) => {
  try {
    const createdOrder = await createOrder(req.body);
    return res.json(createdOrder);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};

export const getAssetsData: Handler = async (req, res) => {
  try {
    const assets = await getAssets(req.query);
    return res.json({ assets });
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });  
  }
};

export const getAssetData: Handler = async (req, res) => {
  try {
    const { symbol } = req.query;
    const asset = await getAsset(symbol as string);
    return res.json({ asset });
  } catch (error) {
    return res.status(500).json({ error: handleError(error) }); 
  }
};

export const getSymbolQuotesData: Handler = async (req, res) => {
  try {
    const quotes = await getSymbolQuotes(req.query);
    return res.json({ quotes });
  } catch (error) {
    return res.status(500).json({ error: handleError(error) }); 
  }
};

export const getSymbolTradesData: Handler = async (req, res) => {
  try {
    const trades = await getSymbolTrades(req.query as any);
    return res.json({ trades });
  } catch (error) {
    return res.status(500).json({ error: handleError(error) }); 
  }
};

export const getMarketCalendarHistory: Handler = async (req, res) => {
  try {
    const history = await getMarketCalendar(req.query as any);
    return res.json(history);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};

export const subscribeData: Handler = async (req, res) => {
  try {
    const response = await subscribeDataStream(req.body as SubscribeDataParams);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};

export const unSubscribedData: Handler = async (req, res) => {
  try {
    const response = await unSubscribeDataStream(req.body as DataParams);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};

export const subscribeCrypto: Handler = async (req, res) => {
  try {
    const response = await subscribeCryptoStream(req.body as SubscribeCryptoParams);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};

export const unsubscribeCrypto: Handler = async (req, res) => {
  try {
    const response = await unsubscribeCryptoStream(req.body as CryptoParams);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: handleError(error) });
  }
};
