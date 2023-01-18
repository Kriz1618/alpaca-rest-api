import { Router } from "express";
import { Request, Response, NextFunction } from "express";

import {
  createAccount,
  getBrokerAccounts,
  getBrokerAssets,
  getTradeEvents
} from '../controllers';

import {
  accountBodyValidator,
  assetsQueryValidator,
  getEventTradesValidator
} from './validators';

const router = Router();

router.post(
  '/account',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      accountBodyValidator.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  createAccount
);

router.get('/accounts', getBrokerAccounts);

router.get('/accounts/:accountId', getBrokerAccounts);

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
  getBrokerAssets
);

router.get('/assets/:symbol', getBrokerAssets);

router.get(
  '/events/trades',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getEventTradesValidator.validateAsync(req.query);
      next();
    } catch (error) {
      return res.status(400).json(`Invalid request! ${(error as Error).message}`);
    }
  },
  getTradeEvents
);

export default router;