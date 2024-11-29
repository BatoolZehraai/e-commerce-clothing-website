let cart = [];

// Function to add item to cart
function addToCart(productName, productPrice) {
  const product = {
    name: productName,
    price: parseFloat(productPrice)
  };
  cart.push(product);
  updateCart();
}

// Function to update cart modal
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    cartTotal.innerText = '0.00';
    return;
  }

  let itemsHTML = '<ul class="list-group mb-3">';
  let total = 0;

  cart.forEach((item, index) => {
    itemsHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.name}
        <span>$${item.price.toFixed(2)}</span>
      </li>
    `;
    total += item.price;
  });

  itemsHTML += '</ul>';
  cartItems.innerHTML = itemsHTML;
  cartTotal.innerText = total.toFixed(2);
}

// Event listeners for "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.card');
      const productName = card.querySelector('.card-title').innerText;
      const productPriceText = card.querySelector('.card-text').innerText;
      const productPrice = productPriceText.replace('$', '');
      addToCart(productName, productPrice);
      
      // Optionally, show a toast notification
      showToast(`${productName} added to cart!`);
    });
  });
});

// Optional: Function to show toast notifications
function showToast(message) {
  // Create toast element
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    // Create container if it doesn't exist
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
  }

  const toastHTML = `
    <div class="toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" 
         aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  const toastElement = document.createElement('div');
  toastElement.innerHTML = toastHTML;
  document.getElementById('toast-container').appendChild(toastElement);
  
  // Initialize and show the toast
  const toast = new bootstrap.Toast(toastElement.querySelector('.toast'));
  toast.show();
}
