// Product Data - Using actual images from the Images folder
const products = [
    // ─── Aprons ───────────────────────────────────────────
    {
        category: 'Aprons',
        name: 'Leather Welding Apron',
        image: 'Images/Aprons/Leather Welding Apron .jpeg',
        price: '₹1,499'
    },
    {
        category: 'Aprons',
        name: 'Industrial Leather Apron',
        image: 'Images/Aprons/Apron 1.jpg',
        price: '₹1,299'
    },
    {
        category: 'Aprons',
        name: 'Heavy Duty Welding Apron',
        image: 'Images/Aprons/Leather Welding Apron 2.jpeg',
        price: '₹1,649'
    },
    {
        category: 'Aprons',
        name: 'Cotton Safety Apron',
        image: 'Images/Aprons/cotton apron 1 .jpg',
        price: '₹549'
    },
    {
        category: 'Aprons',
        name: 'Cotton Work Apron – Type B',
        image: 'Images/Aprons/cotton apron 2 .jpg',
        price: '₹599'
    },
    {
        category: 'Aprons',
        name: 'Industrial Dangri Suit',
        image: 'Images/Aprons/Dangri1 248 kb.jpg',
        price: '₹1,899'
    },
    {
        category: 'Aprons',
        name: 'Cotton Lab Coat',
        image: 'Images/Aprons/LabCoat 01.jpg',
        price: '₹999'
    },
    {
        category: 'Aprons',
        name: 'Lab Coat – Premium',
        image: 'Images/Aprons/LabCoat 02.jpg',
        price: '₹1,149'
    },

    // ─── Asbestos Gloves ──────────────────────────────────
    {
        category: 'Asbestos Gloves',
        name: 'Asbestos Safety Gloves – Type A',
        image: 'Images/Asbestos Gloves/ASbestos Gloves 1 (1) (1).jpg',
        price: '₹749'
    },
    {
        category: 'Asbestos Gloves',
        name: 'Asbestos Safety Gloves – Type B',
        image: 'Images/Asbestos Gloves/ASbestos Gloves 2 (1).jpg',
        price: '₹799'
    },
    {
        category: 'Asbestos Gloves',
        name: 'Asbestos Safety Gloves – Type C',
        image: 'Images/Asbestos Gloves/ASbestos Gloves 3 (1).jpg',
        price: '₹849'
    },

    // ─── Export Gloves ────────────────────────────────────
    {
        category: 'Export Gloves',
        name: 'Canadian Drill Gloves',
        image: 'Images/Export gloves images/Drill Canadian.jpg',
        price: '₹699'
    },
    {
        category: 'Export Gloves',
        name: 'Premium Driving Gloves',
        image: 'Images/Export gloves images/Driving gloves.jpg',
        price: '₹1,199'
    },
    {
        category: 'Export Gloves',
        name: 'Cow Leather Driving Gloves',
        image: 'Images/Export gloves images/Driving cow lether.jpg',
        price: '₹1,049'
    },
    {
        category: 'Export Gloves',
        name: 'Drill Canvas Gloves',
        image: 'Images/Export gloves images/Drill canvas gloves.jpg',
        price: '₹499'
    },
    {
        category: 'Export Gloves',
        name: 'Split Leather Drill Gloves',
        image: 'Images/Export gloves images/Drill split leather gloves.jpg',
        price: '₹899'
    },
    {
        category: 'Export Gloves',
        name: 'Lined Driving Gloves',
        image: 'Images/Export gloves images/Driving with linning.jpg',
        price: '₹1,349'
    },

    // ─── Industrial Gloves ────────────────────────────────
    {
        category: 'Industrial Gloves',
        name: 'Leather Welding Gloves',
        image: 'Images/Gloves Images/Leather Welding  Gloves.jpg',
        price: '₹649'
    },
    {
        category: 'Industrial Gloves',
        name: 'Cut Resistance Gloves – Type A',
        image: 'Images/Gloves Images/Cut Rsistance 1.jpg',
        price: '₹899'
    },
    {
        category: 'Industrial Gloves',
        name: 'Cut Resistance Gloves – Type B',
        image: 'Images/Gloves Images/Cut Rsistance 2.jpg',
        price: '₹949'
    },
    {
        category: 'Industrial Gloves',
        name: 'PVC Polka Dot Gloves',
        image: 'Images/Gloves Images/polka dot gloves 1.jpg',
        price: '₹349'
    },
    {
        category: 'Industrial Gloves',
        name: 'Drill Work Gloves',
        image: 'Images/Gloves Images/Drill Gloves 1 jpg (1) cc.jpg',
        price: '₹549'
    },
    {
        category: 'Industrial Gloves',
        name: 'Buckle Leather Gloves',
        image: 'Images/Gloves Images/Buckle leather gloves1-Photoroomjpg.jpg',
        price: '₹1,099'
    },
    {
        category: 'Industrial Gloves',
        name: 'Cotton Knitted Hand Gloves',
        image: 'Images/Gloves Images/cotton-knitted-hand-gloves-500x500.jpg',
        price: '₹199'
    },
    {
        category: 'Industrial Gloves',
        name: 'Industrial Safety Gloves',
        image: 'Images/Gloves Images/safety-gloves-500x500.jpg',
        price: '₹449'
    },
    {
        category: 'Industrial Gloves',
        name: 'PVC Dotted Safety Gloves',
        image: 'Images/Gloves Images/Pvc dotted gloves.jpg',
        price: '₹399'
    },
    {
        category: 'Industrial Gloves',
        name: 'Leather Cotton Combo Gloves',
        image: 'Images/Gloves Images/LEATHER COTTON GLOVES 1.jpg',
        price: '₹549'
    },
    {
        category: 'Industrial Gloves',
        name: 'Welder Gauntlet Gloves',
        image: 'Images/Gloves Images/welder gloves 1.jpg',
        price: '₹749'
    },
    {
        category: 'Industrial Gloves',
        name: 'Ropeman Grain Leather Gloves',
        image: 'Images/Gloves Images/Ropeman Grain Leather Gloves 2.jpg',
        price: '₹1,249'
    },
    {
        category: 'Industrial Gloves',
        name: 'Leather Leg Guard',
        image: 'Images/Gloves Images/LEATHER LEG GAURD.jpg',
        price: '₹1,599'
    },
    {
        category: 'Industrial Gloves',
        name: 'Leather Safety Spats',
        image: 'Images/Gloves Images/leather spats 2.jpg',
        price: '₹999'
    },

    // ─── Harness Leather ──────────────────────────────────
    {
        category: 'Harness Leather',
        name: '6mm Thick Harness Leather Sheet',
        image: 'Images/Harness leather thick/6 mm Thick leather 1.jpg',
        price: '₹2,499'
    },
    {
        category: 'Harness Leather',
        name: '6mm Thick Leather – Grade B',
        image: 'Images/Harness leather thick/6 mm Thick 2.jpg',
        price: '₹2,299'
    },
    {
        category: 'Harness Leather',
        name: '6mm Thick Leather – Grade C',
        image: 'Images/Harness leather thick/6 mm Thick leather 3.jpeg',
        price: '₹2,149'
    },

    // ─── Hosiery Gloves ───────────────────────────────────
    {
        category: 'Hosiery Gloves',
        name: 'White Hosiery Hand Gloves',
        image: 'Images/Hosery Gloves/HoseryGloves 1.jpg',
        price: '₹149'
    },
    {
        category: 'Hosiery Gloves',
        name: 'Hosiery Work Gloves – Type B',
        image: 'Images/Hosery Gloves/Hosery Gloves 2.jpg',
        price: '₹179'
    },
    {
        category: 'Hosiery Gloves',
        name: 'Hosiery Safety Gloves – Type C',
        image: 'Images/Hosery Gloves/Hosery Gloves 3.jpg',
        price: '₹199'
    },
    {
        category: 'Hosiery Gloves',
        name: 'Polka Dot Hosiery Gloves',
        image: 'Images/Hosery Gloves/POLKA 1.jpg',
        price: '₹249'
    },
    {
        category: 'Hosiery Gloves',
        name: 'Heavy Polka Dot Gloves',
        image: 'Images/Hosery Gloves/POLKA3.jpg',
        price: '₹329'
    },

    // ─── Kevlar Gloves ────────────────────────────────────
    {
        category: 'Kevlar Gloves',
        name: 'Kevlar Para-Aramid Gloves – Type A',
        image: 'Images/Kevlar Gloves/IMG-20230807-WA0009.jpg',
        price: '₹1,899'
    },
    {
        category: 'Kevlar Gloves',
        name: 'Kevlar Para-Aramid Gloves – Type B',
        image: 'Images/Kevlar Gloves/IMG-20230809-WA0001.jpg',
        price: '₹1,999'
    },
    {
        category: 'Kevlar Gloves',
        name: 'Kevlar Heat Resistant Gloves',
        image: 'Images/Kevlar Gloves/IMG-20230809-WA0004.jpg',
        price: '₹2,149'
    },
    {
        category: 'Kevlar Gloves',
        name: 'Kevlar Cut Proof Gloves',
        image: 'Images/Kevlar Gloves/IMG-20230809-WA0014.jpg',
        price: '₹2,299'
    },

    // ─── Leather Sheets ───────────────────────────────────
    {
        category: 'Leather Sheets',
        name: 'Brown Leather Sheet',
        image: 'Images/LEATHER/Brown Leather.jpg',
        price: '₹3,499'
    },
    {
        category: 'Leather Sheets',
        name: 'Black Leather Sheet – Premium',
        image: 'Images/LEATHER/Black leather 2.jpg',
        price: '₹3,999'
    },
    {
        category: 'Leather Sheets',
        name: 'Black Leather Hide',
        image: 'Images/LEATHER/Black Leather 1.jpg',
        price: '₹2,899'
    },
    {
        category: 'Leather Sheets',
        name: 'Brown Tanned Leather',
        image: 'Images/LEATHER/Brown leather 1.jpg',
        price: '₹2,699'
    },

    // ─── Leather Washers ──────────────────────────────────
    {
        category: 'Leather Washers',
        name: 'Leather Washer – Standard',
        image: 'Images/Leather Washer/Leather washer 1 a .jpg',
        price: '₹199'
    },
    {
        category: 'Leather Washers',
        name: 'Leather Washer – Heavy Duty',
        image: 'Images/Leather Washer/Leather washer 2 a .jpg',
        price: '₹249'
    },
    {
        category: 'Leather Washers',
        name: 'Foot Valve Leather Washer',
        image: 'Images/Leather Washer/FOOT VALVE WASHER 1J.jpg',
        price: '₹349'
    },
    {
        category: 'Leather Washers',
        name: 'Spud Washer – Industrial',
        image: 'Images/Leather Washer/SPUD WASHER 1.jpg',
        price: '₹449'
    },
    {
        category: 'Leather Washers',
        name: 'Foot Valve Washer – Type B',
        image: 'Images/Leather Washer/FOOT VALVE WASHER 2 J.jpg',
        price: '₹299'
    },

    // ─── Leather Strips ───────────────────────────────────
    {
        category: 'Leather Strips',
        name: 'Leather Strap – Natural',
        image: 'Images/Leather strip/Leather Strap 1.jpg',
        price: '₹399'
    },
    {
        category: 'Leather Strips',
        name: 'Leather Strap – Brown',
        image: 'Images/Leather strip/Leather Strap 2.jpg',
        price: '₹449'
    },
    {
        category: 'Leather Strips',
        name: 'Leather Strap – Wide',
        image: 'Images/Leather strip/Leather Strap 3.jpg',
        price: '₹549'
    },
    {
        category: 'Leather Strips',
        name: 'Rectangular Leather Strip',
        image: 'Images/Leather strip/leather rectangular 2 jpg.jpg',
        price: '₹299'
    },

    // ─── Saddlery ─────────────────────────────────────────
    {
        category: 'Saddlery',
        name: 'Premium Horse Saddle',
        image: 'Images/Saddlery/saddle jpg.jpg',
        price: '₹12,999'
    },
    {
        category: 'Saddlery',
        name: 'Saddle with Bridle Set',
        image: 'Images/Saddlery/saddle with bradle image 2.jpg',
        price: '₹15,499'
    },
    {
        category: 'Saddlery',
        name: 'Saddle with Bridle – Compact',
        image: 'Images/Saddlery/saddle with bradle jpg.jpg',
        price: '₹11,999'
    },

    // ─── Saddlery Items ───────────────────────────────────
    {
        category: 'Saddlery',
        name: 'Horse Harness & Trotting Items',
        image: 'Images/saddlery items/Harness and trotting items.JPG',
        price: '₹8,499'
    },
    {
        category: 'Saddlery',
        name: 'Harness Set – Complete',
        image: 'Images/saddlery items/Harness and trotting items 2.JPG',
        price: '₹9,999'
    },
    {
        category: 'Saddlery',
        name: 'Leather Harnesses – Premium',
        image: 'Images/saddlery items/Harnesses.JPG',
        price: '₹7,499'
    },
    {
        category: 'Saddlery',
        name: 'Western Saddle – Production Grade',
        image: 'Images/saddlery items/Western saddle production.jpg',
        price: '₹18,999'
    },

    // ─── Tarpaulin ────────────────────────────────────────
    {
        category: 'Tarpaulin',
        name: 'Waterproof Tarpaulin – Blue',
        image: 'Images/Tarpoline/Tarpoline image 01.jpg',
        price: '₹1,899'
    },
    {
        category: 'Tarpaulin',
        name: 'Heavy Duty Tarpaulin',
        image: 'Images/Tarpoline/Tarpoline image 02.jpg',
        price: '₹2,499'
    },
    {
        category: 'Tarpaulin',
        name: 'Industrial Tarpaulin Sheet',
        image: 'Images/Tarpoline/Tarpoline image 04.jpg',
        price: '₹2,199'
    }
];

// Get unique categories
function getCategories() {
    const cats = [...new Set(products.map(p => p.category))];
    return cats;
}

// Active category filter
let activeCategory = 'All';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCategoryFilters();
    renderProducts();
    setupSmoothScroll();
    animateOnScroll();
});

// Render category filter buttons
function renderCategoryFilters() {
    const filtersContainer = document.getElementById('category-filters');
    if (!filtersContainer) return;

    const categories = getCategories();
    let html = `<button class="filter-btn active" data-category="All" onclick="filterProducts('All')">All Products</button>`;
    categories.forEach(cat => {
        html += `<button class="filter-btn" data-category="${cat}" onclick="filterProducts('${cat}')">${cat}</button>`;
    });
    filtersContainer.innerHTML = html;
}

// Filter products by category
function filterProducts(category) {
    activeCategory = category;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });

    renderProducts();
}

// Render Products
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const filtered = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    grid.innerHTML = filtered.map((product, index) => `
        <div class="service-item" style="animation-delay: ${index * 0.05}s">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-category-badge">${product.category}</span>
            </div>
            <h3>${product.name}</h3>
            <div class="product-price">${product.price}</div>
            <a href="contact.html" class="product-enquiry-btn">Enquire Now</a>
        </div>
    `).join('');

    // Update product count
    const countEl = document.getElementById('product-count');
    if (countEl) {
        countEl.textContent = `Showing ${filtered.length} of ${products.length} products`;
    }
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

// Scroll-triggered animations
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-item, .benefit-item').forEach(el => {
        observer.observe(el);
    });
}
