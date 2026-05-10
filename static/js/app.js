// Product Data
const products = [
    {
        name: 'Yellow Rubber Work Gloves',
        image: 'static/images/1-cat.jpg',
        price: '$12.99'
    },
    {
        name: 'Professional Safety Glove Set',
        image: 'static/images/2-cat.jpg',
        price: '$24.99'
    },
    {
        name: 'Welding Protection Gloves',
        image: 'static/images/3-cat.jpg',
        price: '$34.99'
    },
    {
        name: 'Industrial Yellow Safety Gloves',
        image: 'static/images/4-cat.jpg',
        price: '$18.99'
    },
    {
        name: 'Safety Shoes SLS-103',
        image: 'static/images/5-cat_orig.jpg',
        price: '$79.99'
    },
    {
        name: 'Black Safety Boots',
        image: 'static/images/6-cat_orig.jpg',
        price: '$89.99'
    },
    {
        name: 'White Cotton Protection Apron',
        image: 'static/images/7-cat.jpg',
        price: '$15.99'
    },
    {
        name: 'Safety Shoes Premium',
        image: 'static/images/8-cat.jpg',
        price: '$99.99'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupSmoothScroll();
});

// Render Products
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="service-item">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="product-price">${product.price}</div>
        </div>
    `).join('');
}

// Smooth scrolling for nav links
function setupSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}
