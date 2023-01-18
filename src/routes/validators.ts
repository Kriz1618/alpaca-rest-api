import Joi from "joi";

export const orderBodyValidator = Joi.object({
  symbol: Joi.string().min(4).required(), // any valid ticker symbol
  qty: Joi.number().required(),
  notional: Joi.number().optional(), // qty or notional required, not both
  side: Joi.string().valid('buy', 'sell'),
  type: Joi.string().valid('market', 'limit', 'stop', 'stop_limit', 'trailing_stop'),
  time_in_force: Joi.string().valid('day', 'gtc', 'opg', 'ioc'),
  limit_price: Joi.number(), // optional,
  stop_price: Joi.number(), // optional,
  client_order_id: Joi.string().min(4).optional(), // optional,
  extended_hours: Joi.bool().optional(), // optional,
  order_class: Joi.string().min(4).optional(), // optional,
  take_profit: Joi.object().optional(), // optional,
  stop_loss: Joi.object().optional(), // optional,
  trail_price: Joi.string().min(4).optional(), // optional,
  trail_percent: Joi.string().min(4).optional() // optional,
});

export const assetsQueryValidator = Joi.object({
  status: Joi.string()
    .valid('active', 'inactive')
    .optional()
  , // “active”. By default, all statuses are included.
  asset_class: Joi.string()
    .valid('us_equity', 'crypto')
    .optional()
  , // Defaults to us_equity..
  exchange: Joi.string()
    .valid('AMEX', 'ARCA', 'BATS', 'NASDAQ', 'NYSEARCA', 'OTC', 'FTXU')
    .optional()
});

export const assetQueryValidator = Joi.object({
  symbol: Joi.string().required(),
});

export const symbolQueryValidator = Joi.object({
  symbol: Joi.string().required(),
  days: Joi.string().pattern(/^[0-9]+$/).required(),
});

export const ordersQueryValidator = Joi.object({
  status: Joi.string().valid('open', 'close', 'all').required(),
  direction: Joi.string().valid('asc', 'desc'),
  limit: Joi.string().pattern(/^[0-9]+$/),
  after: Joi.string(),
  until: Joi.string(),
  orderId: Joi.string(),
});

export const marketCalendarValidator = Joi.object({
  start: Joi.string().required(),
  end: Joi.string().required(),
});

const subscribeParams = {
  trades: Joi.array().items(Joi.string()),
  quotes: Joi.array().items(Joi.string()),
  bars: Joi.array().items(Joi.string()),
  updatedBars: Joi.array().items(Joi.string()),
  dailyBars: Joi.array().items(Joi.string()),
}

export const subscribeDataValidator = Joi.object({
  symbols: Joi.object({
    ...subscribeParams,
    statuses: Joi.array().items(Joi.string()),
    lulds: Joi.array().items(Joi.string())
  }),
  time: Joi.number(),
  date: Joi.string().length(13).pattern(/^[0-9]+$/)
});

export const unSubscribeDataValidator = Joi.object({
  ...subscribeParams,
  statuses: Joi.array().items(Joi.string()),
  lulds: Joi.array().items(Joi.string())
});

export const subscribeCryptoValidator = Joi.object({
  symbols: Joi.object({
    ...subscribeParams,
    orderbooks: Joi.array().items(Joi.string()),
  }),
  time: Joi.number(),
  date: Joi.string().length(13).pattern(/^[0-9]+$/)
});

export const unSubscribeCryptoValidator = Joi.object({
  ...subscribeParams,
  orderbooks: Joi.array().items(Joi.string()),
});

export const getEventTradesValidator = Joi.object({
  since: Joi.string().pattern(/^[0-9]+$/),
});

export const accountBodyValidator = Joi.object({
  contact: Joi.object({
    email_address: Joi.string(),
    phone_number: Joi.string(),
    street_address: Joi.array().items(Joi.string()),
    city: Joi.string(),
    state: Joi.string(),
    postal_code: Joi.string(),
    country: Joi.string(),
  }).required(),
  identity: Joi.object({
    given_name: Joi.string(),
    family_name: Joi.string(),
    date_of_birth: Joi.string(),
    tax_id: Joi.string(),
    tax_id_type: Joi.string(),
    country_of_citizenship: Joi.string(),
    country_of_birth: Joi.string(),
    country_of_tax_residence: Joi.string(),
    funding_source: Joi.array().items(Joi.string()),
  }).required(),
  trusted_contact: Joi.object({
    given_name: Joi.string(),
    family_name: Joi.string(),
    email_address: Joi.string()
  }),
  disclosures: Joi.object({
    is_control_person: Joi.bool(),
    is_affiliated_exchange_or_finra: Joi.bool(),
    is_politically_exposed: Joi.bool(),
    immediate_family_exposed: Joi.bool()
  }),
  agreements: Joi.array().length(3).items(Joi.object({
    agreement: Joi.string(),
    signed_at: Joi.string(),
    ip_address: Joi.string()
  })).required(),
  documents: Joi.array().items(Joi.object({
    document_type: Joi.string(),
    document_sub_type: Joi.string(),
    content: Joi.string(),
    mime_type: Joi.string()
  }))
});
