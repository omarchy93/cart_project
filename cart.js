const cart = [];

export function addToCart(product, quantity) {
  const existingItem = cart.find(item => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
}

export function removeCartItem(productId) {
  const index = cart.findIndex(item => item.product.id === productId);
  
  if (index !== -1) {
    cart.splice(index, 1);
  }
}

export function clearCart() {
  cart.length = 0;
}

export function calculateTotal() {
  let total = 0;
  
  for (const item of cart) {
    total += item.product.price * item.quantity;
  }
  
  return total.toFixed(2);
}

export default cart;