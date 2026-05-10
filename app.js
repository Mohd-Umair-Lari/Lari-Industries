// Product Data
const products = [
    {
        name: 'Yellow Rubber Work Gloves',
        image: 'images/1-cat.jpg'
    },
    {
        name: 'Professional Safety Glove Set',
        image: 'images/2-cat.jpg'
    },
    {
        name: 'Welding Protection Gloves',
        image: 'images/3-cat.jpg'
    },
    {
        name: 'Industrial Yellow Safety Gloves',
        image: 'images/4-cat.jpg'
    },
    {
        name: 'Safety Shoes SLS-103',
        image: 'images/5-cat_orig.jpg'
    },
    {
        name: 'Black Safety Boots',
        image: 'images/6-cat_orig.jpg'
    },
    {
        name: 'White Cotton Protection Apron',
        image: 'images/7-cat.jpg'
    },
    {
        name: 'Safety Shoes Premium',
        image: 'images/8-cat.jpg'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupSmoothScroll();
});

// Render Products
function renderProducts() {
    const grid = document.getElementById('services-grid');
    grid.innerHTML = products.map(product => `
        <div class="service-item">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
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
