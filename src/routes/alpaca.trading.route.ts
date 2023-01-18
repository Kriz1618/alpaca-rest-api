import { Router } from "express";
import { Request, Response, NextFunction } from "express";

import {
  createNewOrder,
  getAccountData,
  getAccountConfig,
  getPositions,
  getAssetData,
  getAssetsData,
  getAccountOrders,
  getMarketCalendarHistory,
  getPortfolioHistoryData,
  getSymbolQuotesData,
  getSymbolTradesData,
  getNews,
  subscribeCrypto,
  subscribeData,
  unsubscribeCrypto,
  unSubscribedData,
} from '../controllers';

import {
  assetQueryValidator,
  assetsQueryValidator,
  orderBodyValidator,
  ordersQueryValidator,
  marketCalendarValidator,
  subscribeDataValidator,
  symbolQueryValidator,
  unSubscribeDataValidator,
  subscribeCryptoValidator,
  unSubscribeCryptoValidator
} from './validators';

const router = Router();

router.get('/account', getAccountData);

router.get('/positions', getPositions);

router.get('/history', getPortfolioHistoryData);

router.get(
  '/asset',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      assetQueryValidator.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  getAssetData
);

router.get(
  '/assets',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      assetsQueryValidator.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  getAssetsData
);

router.get(
  '/calendar',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      marketCalendarValidator.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  getMarketCalendarHistory
);

router.get(
  '/symbol/quotes',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      symbolQueryValidator.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  getSymbolQuotesData
);

router.get(
  '/symbol/trades',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      symbolQueryValidator.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  getSymbolTradesData
);

router.get('/news', getNews);

router.get('/config', getAccountConfig);

router.get(
  '/orders',
 async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ordersQueryValidator.validateAsync(req.query);
    next();
  } catch (error) {
    return res.status(400).json(`Invalid request! ${(error as Error).message}`);
  }
 },
  getAccountOrders
);

router.post(
  '/order',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await orderBodyValidator.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  createNewOrder,
);

router.post(
  '/data/subscribe',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await subscribeDataValidator.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  subscribeData,
);

router.post(
  '/data/unsubscribe',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await unSubscribeDataValidator.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  unSubscribedData,
);

router.post(
  '/crypto/subscribe',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await subscribeCryptoValidator.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  subscribeCrypto,
);

router.post(
  '/crypto/unsubscribe',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await unSubscribeCryptoValidator.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  unsubscribeCrypto,
);

export default router;