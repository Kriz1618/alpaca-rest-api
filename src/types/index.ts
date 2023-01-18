export type AssetsParams = {
  status?: string,
  asset_class?: string,
  exchange?: string,
  symbol?: string,
};

export type SymbolParams = {
  symbol: string,
  days: string
};

export type MarketCalendarParams = {
  start: string,
  end: string
};

export type AnnouncementsParams = {
  ca_types: string,
  since: string,
  until: string,
  symbol?: string,
  cusip?: string,
  date_type?: string,
};

export type DataParams = {
  trades?: string[],
  quotes?: string[],
  bars?: string[],
  updatedBars?: string[],
  dailyBars?: string[],
  statuses?: string[],
  lulds?: string[],
};

export type SubscribeDataParams = {
  symbols: DataParams,
  time?: number,
  date?: string,
};

export type CryptoParams = {
  trades?: string[],
  quotes?: string[],
  bars?: string[],
  updatedBars?: string[],
  dailyBars?: string[],
  orderbooks?: string[],
};

export type SubscribeCryptoParams = {
  symbols: CryptoParams,
  time?: number,
  date?: string,
};

export type TradeParams = {
  since?: string,
};

type UserContact = {
  email_address: string,
  phone_number: string,
  street_address: string[],
  city: string,
  state: string,
  postal_code: string,
  country: string,
};

type UserIdentity = {
  given_name: string,
  family_name: string,
  date_of_birth: string,
  tax_id: string,
  tax_id_type: string,
  country_of_citizenship: string,
  country_of_birth: string,
  country_of_tax_residence: string,
  funding_source: string[],
};

type UserTrustedContact = {
  given_name: string,
  family_name: string,
  email_address: string
};

type UserDisclosure = {
  is_control_person: boolean,
  is_affiliated_exchange_or_finra: boolean,
  is_politically_exposed: boolean,
  immediate_family_exposed: boolean
};

type UserAgreement = {
  agreement: string,
  signed_at: string,
  ip_address: string 
};

type UserDocument = {
  document_type: string,
  document_sub_type: string,
  content: string,
  mime_type: string
};

export type UserInfo = {
  contact: UserContact,
  identity: UserIdentity,
  trusted_contact: UserTrustedContact,
  disclosures?: UserDisclosure,
  agreements?: UserAgreement[],
  documents?: UserDocument[],
};
