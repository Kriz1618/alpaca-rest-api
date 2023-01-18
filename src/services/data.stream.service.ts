import Alpaca from '@alpacahq/alpaca-trade-api';
import * as cron from 'node-cron';
import { getCronSchedule } from '../commons';
import {
  SubscribeDataParams,
  DataParams
} from '../types';

const alpaca = new Alpaca({
  paper: true,
});

const websocket = alpaca.data_stream_v2;

websocket.onConnect(() => {
  // websocket.subscribeForTrades(["AAPL"]);
});

websocket.onStateChange((status) => { 
  console.log("Data stream status:", status);
});

websocket.onError((err) => {
  console.log("Error:", err);
});

websocket.onStockTrade((trade) => {
  console.log("Trade:", trade);
});

websocket.onStockBar((bar) => {
  console.log("Bar:", bar);
});

websocket.onStockQuote((quote) => {
  console.log('Quote', quote);
});

websocket.onStockDailyBar((bar) => {
  console.log('Daily Bar', bar);
});

websocket.onLulds((lulds) => {
  console.log('Lulds', lulds);
});

export const subscribeDataStream = (params: SubscribeDataParams) => {
  const {symbols, time, date } = params;
  websocket.subscribe(symbols);

  const endTime = new Date();
  const today = new Date();

  if (date && Number(date) > today.getTime()) {
    endTime.setTime(Number(date));
  } else {
    endTime.setMinutes(endTime.getMinutes() + (time || 5));
  }

  const schedule = getCronSchedule(endTime);

  cron.schedule(schedule, () => {
    unSubscribeDataStream(symbols);
  });

  return 'subscribed';
};

export const unSubscribeDataStream = async (params: DataParams) => {
  websocket.unsubscribe(params);
  return 'unsubscribed';
};

export const dataStreamConnection = () => {
  websocket.connect();
  // setTimeout(() =>  subscribeDataStream({ symbols: ['AAPL','TMF'], time: 2}), 10000);
};
