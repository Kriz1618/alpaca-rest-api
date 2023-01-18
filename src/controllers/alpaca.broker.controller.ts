import { Handler } from "express";
import { handleError } from "../commons";
import {
  createNewAccount,
  getAccounts,
  pullAssets,
  pullTradeEvents
} from "../services";

export const getBrokerAccounts: Handler = async (req, res) => {
  try {
    const accounts = await getAccounts(req.params);
    return res.json(accounts);
  } catch (error) {
    return res.status(500).json(handleError(error));
  }
};

export const getBrokerAssets: Handler = async (req, res) => {
  try {
    const assets = await pullAssets(req.query);
    return res.json(assets);
  } catch (error) {
    return res.status(500).json(handleError(error));
  }
};

export const getTradeEvents: Handler = async (req, res) => {
  try {
    const trades = await pullTradeEvents(req.query);
    return res.json(trades);
  } catch (error) {
    return res.status(500).json(handleError(error));
  }
};

export const createAccount: Handler = async (req, res) => {
  try {
    const response = await createNewAccount(req.body);
    return res.json(response);
  } catch (error) {
    return res.status(500).json(handleError(error));
  }
};
