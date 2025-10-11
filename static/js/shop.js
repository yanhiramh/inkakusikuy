document.addEventListener('DOMContentLoaded', function() {
    // Initialize shop page
    if (document.getElementById('products-container')) {
        loadProducts();
    }
});

// Load products from API
function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    
    // Show loading indicator
    productsContainer.innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading products...</p>
        </div>
    `;
    
    // Fetch products
    fetch('/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Failed to load products. Please try again later.
                </div>
            `;
        });
}

// Display products in the shop
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    
    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="alert alert-info" role="alert">
                No products available at this time.
            </div>
        `;
        return;
    }
    
    // Clear container
    productsContainer.innerHTML = '';
    
    // Create products grid
    const productsGrid = document.createElement('div');
    productsGrid.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4';
    
    // Display products directly
    productsGrid.innerHTML = products.map(product => `
        <div class="col">
            <div class="card h-100 product-card">
                <div class="card-image-container bg-light d-flex align-items-center justify-content-center p-3" style="height: 200px;">
                    ${product.image ? 
                        `<img src="/static/images/${product.image}" alt="${product.name}" class="img-fluid" style="max-height: 180px; object-fit: contain;">` :
                        `<i class="fas fa-${product.icon || 'gift'} fa-3x text-primary"></i>`
                    }
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text text-primary fw-bold">S/ ${product.price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    productsContainer.appendChild(productsGrid);
}

