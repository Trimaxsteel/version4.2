// Cart System with Categories
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize
updateCartUI();

// Add to Cart (called from shop.html buttons)
function addToCart(name, price, category, image) {
  cart.push({
    id: Date.now(),
    name,
    price,
    category,
    image,
    quantity: 1
  });
  saveCart();
  showCartNotification(name);
}

// Remove Item
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

// Save to LocalStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// Update UI
function updateCartUI() {
  // Update cart button
  cartBtn.textContent = `🛒 Cart (${cart.length})`;

  // Render cart items
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="flex justify-between items-center mb-2 p-2 border-b">
      <div class="flex items-center">
        <img src="${item.image}" alt="${item.name}" class="w-10 h-10 object-cover mr-2">
        <div>
          <p class="font-medium">${item.name}</p>
          <p class="text-sm">₹${item.price} × ${item.quantity}</p>
        </div>
      </div>
      <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
        ✕
      </button>
    </div>
  `).join('');

  // Update total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('cart-total').textContent = `₹${total}`;
}

// Cart Notification
function showCartNotification(name) {
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg animate-bounce';
  notification.textContent = `Added ${name} to cart!`;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2000);
}

// Toggle Cart Visibility
cartBtn.addEventListener('click', () => {
  cartSidebar.classList.toggle('translate-x-full');
});

// Checkout (non-functional)
checkoutBtn.addEventListener('click', () => {
  alert('Checkout would go here in a real implementation!');
});

// Mobile Menu Toggle (reuse your existing logic if needed)
document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});