// Product Data
const products = [
    {
        id: 1,
        name: 'Yellow Rubber Work Gloves',
        desc: 'Durable rubber gloves with cotton lining',
        price: 120,
        image: 'images/1-cat.jpg'
    },
    {
        id: 2,
        name: 'Professional Safety Glove Set',
        desc: 'Multi-purpose safety gloves assorted colors',
        price: 180,
        image: 'images/2-cat.jpg'
    },
    {
        id: 3,
        name: 'Welding Protection Gloves',
        desc: 'Heat-resistant with reinforced leather cuff',
        price: 250,
        image: 'images/3-cat.jpg'
    },
    {
        id: 4,
        name: 'Industrial Yellow Safety Gloves',
        desc: 'CE certified with blue cuff and grip',
        price: 200,
        image: 'images/4-cat.jpg'
    },
    {
        id: 5,
        name: 'Safety Shoes SLS-103',
        desc: 'Premium steel-toe with anti-slip sole',
        price: 1299,
        image: 'images/5-cat_orig.jpg'
    },
    {
        id: 6,
        name: 'Black Safety Boots',
        desc: 'Professional with reinforced toe support',
        price: 1199,
        image: 'images/6-cat_orig.jpg'
    },
    {
        id: 7,
        name: 'White Cotton Protection Apron',
        desc: 'Heavy-duty industrial protection apron',
        price: 150,
        image: 'images/7-cat.jpg'
    },
    {
        id: 8,
        name: 'Safety Shoes Premium',
        desc: 'Maximum comfort and protection shoes',
        price: 1499,
        image: 'images/8-cat.jpg'
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});

// Render Products
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-price">₹${product.price}</div>
                <div class="product-actions">
                    <input type="number" id="qty-${product.id}" value="1" min="1" max="10">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const qty = parseInt(document.getElementById(`qty-${productId}`).value);
    
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.qty += qty;
    } else {
        cart.push({
            ...product,
            qty: qty
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').textContent = count;
    renderCart();
}

// Render Cart
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.getElementById('total-price').textContent = '0';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.qty} = <span class="cart-item-price">₹${itemTotal}</span></p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    }).join('');
    
    document.getElementById('total-price').textContent = total;
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Toggle Cart
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const itemsList = cart.map(item => `${item.name} (₹${item.price} × ${item.qty})`).join('\n');
    
    alert(`Thank you for your order!\n\nItems:\n${itemsList}\n\nTotal: ₹${total}\n\nWe will contact you at the provided email/phone to confirm your order.`);
    
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    toggleCart();
}

// Contact Form
function handleContactForm(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.children[0].value;
    const email = form.children[1].value;
    const message = form.children[2].value;
    
    alert(`Thank you, ${name}!\n\nWe received your message and will get back to you at ${email} soon.`);
    form.reset();
}

// Scroll to Products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 2000);
}
