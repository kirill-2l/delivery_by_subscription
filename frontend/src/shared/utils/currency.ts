export const CurrencyName = {
  USD: 'USD',
  EURO: 'EURO',
} as const;

export type CurrencyNameType = (typeof CurrencyName)[keyof typeof CurrencyName];

export const currencyToSymbol = (currency: CurrencyNameType) => {
  const map = {
    [CurrencyName.USD]: '$',
    [CurrencyName.EURO]: '€',
    default: '$',
  };

  return map[currency] ?? map.default;
};
