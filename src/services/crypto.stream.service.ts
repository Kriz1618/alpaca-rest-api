import Alpaca from '@alpacahq/alpaca-trade-api';
import * as cron from 'node-cron';
import { getCronSchedule } from '../commons';
import { 
  SubscribeCryptoParams,
  CryptoParams,
} from '../types';

const alpaca = new Alpaca({
  paper: true,
});

const websocket = alpaca.crypto_stream_v2;
const data = alpaca.data_ws;

websocket.onConnect(() => {
});

websocket.onStateChange((status) => { 
  console.log("Crypto stream status:", status);
});

websocket.onError((err) => {
  console.log("Error:", err);
});

websocket.onCryptoBar((bar) => {
  console.log("Crypto Bar:", bar);
});

websocket.onCryptoDailyBar((bar) => {
  console.log("Crypto Daily Bar:", bar);
});

websocket.onCryptoOrderbook((order) => {
  console.log("Crypto Order Book:", order);
});

websocket.onCryptoQuote((quote) => {
  console.log("Crypto Quote:", quote);
});

websocket.onCryptoTrade((trade) => {
  console.log("Crypto Trade:", trade);
});

websocket.onCryptoUpdatedBar((bar) => {
  console.log("Crypto updated bar:", bar);
});

websocket.onDisconnect(() => {
  console.log('Disconnected');
});

export const subscribeCryptoStream = (params: SubscribeCryptoParams) => {
  const {time, date, symbols } = params;
  websocket.subscribe(symbols);
  
  const endTime = new Date();
  const today = new Date();

  if (date && Number(date) > today.getTime()) {
    endTime.setTime(Number(date));
  } else {
    endTime.setMinutes(endTime.getMinutes() + (time || 3));
  }

  const schedule = getCronSchedule(endTime);

  cron.schedule(schedule, () => {
    websocket.unsubscribe(symbols);
    console.log('Unsubscribted');
  });

  return 'subscribed';
};

export const unsubscribeCryptoStream = async (params: CryptoParams) => {
  websocket.unsubscribe(params);
  return 'unsubscribed';
};

export const cryptoStreamConnection = () => {
  websocket.connect();
};
