export const formatPrice = (value, locale, currency) => {
  console.log('value', value);
  console.log('locale', locale);
  console.log('currency', currency);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};