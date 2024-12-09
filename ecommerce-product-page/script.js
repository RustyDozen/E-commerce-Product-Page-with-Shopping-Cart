// Sample product data
const products = [
    { id: 1, name: 'Product A', price: 750, image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Product B', price: 1200, image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Product C', price: 950, image: 'https://via.placeholder.com/50' },
];

// Cart storage
let cart = [];

// DOM Elements
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');

// Display Products
function displayProducts() {
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
        </div>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
        productList.appendChild(productElement);
    });
}

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Update Cart
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
        cartItems.appendChild(cartItemElement);
    });

    totalPrice.textContent = `₹${total.toFixed(2)}`;
}

// Remove one item at a time from Cart
function removeFromCart(id) {
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }

    updateCart();
}

// Initialize
displayProducts();
