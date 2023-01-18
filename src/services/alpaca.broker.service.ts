import axios from 'axios';
import { getDateFrom } from '../commons';
import { BROKER_SECRET, BROKER_API_KEY } from '../config';
import { AssetsParams, TradeParams, UserInfo } from '../types';


export const getAccounts = async (params: any) => {
  let resource = 'accounts'

  if (params.accountId) {
    resource = `${resource}/${params.accountId}`;
  }

  return callAPI(resource);
};

export const pullAssets = async (assetParams: AssetsParams) => {
  const { symbol, status,  asset_class, exchange } = assetParams;
  let resource = 'assets';
  const params = {};

  if (symbol) {
    resource = `${resource}/${symbol}`;
  } else {
    Object.assign(params, {
      status: status || 'active',
      asset_class: asset_class || 'crypto',
      exchange: exchange || 'FTXU',
    });
  }

  return callAPI(resource, 'get', params);
};

export const pullTradeEvents = async (tradeParams: TradeParams) => {
  const params = {
    since: getDateFrom(tradeParams.since || 2),
    until: new Date()
  }

  return callAPI('events/trades', 'get', params);
};

export const createNewAccount = async (params: UserInfo) => {
  return callAPI('accounts', 'post', {}, params);
};

const generateAuthToken = () => {
  return Buffer.from(`${BROKER_API_KEY}:${BROKER_SECRET}`, 'utf8').toString('base64');
};

const callAPI = async (endpoint: string, method = 'get', params = {}, data = {}) => {
  const response = await axios({
    method,
    url: `https://broker-api.sandbox.alpaca.markets/v1/${endpoint}`,
    params,
    data,
    headers: {
      'Authorization': `Basic ${generateAuthToken()}`,
      'content-type': 'application/json',
    }
  });

  if (!response.data) {
    return response;
  }

  return response.data;
};
