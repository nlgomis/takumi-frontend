// events.js
export const CART_UPDATED = 'CART_UPDATED';

export const dispatchCartUpdate = (cartData) => {
  // Create and dispatch a custom event when cart is updated
  const event = new CustomEvent(CART_UPDATED, { detail: cartData });
  window.dispatchEvent(event);
};