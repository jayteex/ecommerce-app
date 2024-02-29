// frontend/src/utils/currencyLogic.js
// Might not be used in the final app, we shall see
export function calculatePrice(price, currency) {
  switch (currency.toUpperCase()) {
    case 'EUR':
      return price * 0.92; 
    case 'CAD':
      return price * 1.36; 
    default:
      return price;
  }
}

export function calculateTotal(cart, currency) {
  if (!cart || Object.keys(cart).length === 0) {
    return 0;
  }

  let totalUSD = 0;
  Object.keys(cart).forEach((itemName) => {
    totalUSD += cart[itemName].price * cart[itemName].quantity;
  });
  return calculatePrice(totalUSD, currency).toFixed(2);
}

export function getCurrencySymbol(currencyFilter) {
  switch (currencyFilter) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'CAD':
      return '$';
    default:
      return '';
  }
}
