import cart, { addToCart, calculateTotal, clearCart, removeCartItem } from './cart.js';
import products from './product.js';

document.addEventListener('DOMContentLoaded', () => {
  const productListElement = document.getElementById('product-list');
  const shoppingCartElement = document.getElementById('shopping-cart');
  const clearCartButton = document.getElementById('clear-cart');

  // Display product list
  for (const product of products) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productListElement.appendChild(productElement);
  }

  // Add event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartHandler);
  });

  // Display shopping cart
  function displayCart() {
    shoppingCartElement.innerHTML = '';

    for (const item of cart) {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('shopping-cart-item');
      cartItemElement.innerHTML = `
        <div>
          <strong>${item.product.name}</strong>
          <span>Price: $${item.product.price.toFixed(2)}</span>
          <span>Quantity: ${item.quantity}</span>
        </div>
        <button class="remove-item" data-id="${item.product.id}">Remove</button>
      `;
      shoppingCartElement.appendChild(cartItemElement);
    }

    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<strong>Total: $${calculateTotal()}</strong>`;
    shoppingCartElement.appendChild(totalElement);

    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', removeItemHandler);
    });
  }

  // Event handler for "Add to Cart" button
  function addToCartHandler(event) {
    const productId = parseInt(event.target.dataset.id);
    const quantity = 1; // You can modify this to handle variable quantities

    const product = products.find(product => product.id === productId);
    addToCart(product, quantity);
    displayCart();
  }

  // Event handler for "Remove" button
  function removeItemHandler(event) {
    const productId = parseInt(event.target.dataset.id);
    removeCartItem(productId);
    displayCart();
  }

  // Event listener for "Clear Cart" button
  clearCartButton.addEventListener('click', () => {
    clearCart();
    displayCart();
  });

  // Initial display of the cart
  displayCart();
});