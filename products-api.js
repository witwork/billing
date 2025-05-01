/**
 * Products API Handler
 * 
 * This file handles the API calls to fetch products from Strapi backend
 * and displaying them on the website
 */

const API_URL = 'http://139.84.141.1:1337';

// Function to fetch product list from API
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/api/product-lists/fetch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return { data: [] };
    }
}

// Function to render product cards in the swiper
function renderProductCards(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear existing content
    if (container.innerHTML) {
        container.innerHTML = '';
    }

    // Group products into rows of 3
    const productsArray = products.data || [];
    
    // Using row layout with Bootstrap-style columns
    let html = '<div class="row row--eq-height col-12">';
    
    productsArray.forEach((product, index) => {
        // Create a product card
        html += `
          <div class="col-lg-6 col-xl-4 cursor--auto">
            <div class="tariff__item tariff__item--retail trf-item mix">
              <div class="tariff__header">
                <div class="tariff__name">
                  <span class="">${product.title || 'Product'}</span>
                </div>
                <div class="tariff-info__desc" style="margin-top: 30px; margin-bottom: 30px">
                  Delivery Time: <span style="color: #00b500;">10m</span>
                  <br>
                  Stock Now: <span style="color: ${product.active ? '#00b500' : '#fc0101'};">${product.active ? 'Available' : 'Out of Stock'}</span>
                </div>
              </div>
              <div class="tariff__info tariff-info">
                <ul class="tariff-info__list">
                  ${renderProductDetails(product)}
                </ul>
              </div>
              <div class="tariff__months months trf-months">
                <label>
                  <span class="months__discount month-discount">0%</span>
                  <input class="months-one" type="radio" checked="">
                  <span></span>
                  <span class="months__note">1 month</span>
                </label>
                <label>
                  <span class="months__discount month-discount">5%</span>
                  <input type="radio">
                  <span></span>
                  <span class="months__note">Quarterly</span>
                </label>
                <label>
                  <span class="months__discount month-discount">10%</span>
                  <input type="radio">
                  <span></span>
                  <span class="months__note">Half Yearly</span>
                </label>
                <label>
                  <span class="months__discount month-discount">15%</span>
                  <input type="radio">
                  <span></span>
                  <span class="months__note">Yearly</span>
                </label>
              </div>
              <div class="tariff__bottom">
                <div class="tariff__price tariff__price--transfer trf-rate-value">
                  <b style="color: #0150c8;">$${product.price || '0.00'}</b> 
                  <span style="color: #464647;">per month</span>
                </div>
              </div>
              <div class="tariff__footer">
                <div class="tariff__order">
                  <a href="product-detail.html?id=${product.id}" class="btn tariff__order-btn tariff-link" style="color: #fff;" data-link="on">
                    <span>ORDER SERVER</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
    });

    html += '</div>';
    
    // Insert the HTML into the container
    container.innerHTML = html;
}

// Helper function to render product details
function renderProductDetails(product) {
    // Extract properties to display as specs
    const specs = [
        { icon: 'layer_56.png', value: product.itemTypeName || 'Server' },
        { icon: 'layer_56.png', value: product.project || 'Project' }
    ];
    
    // If externalData exists and has properties, add them
    if (product.externalData) {
        // Add any other properties from externalData that you want to display
        if (product.externalData.processingmodule_count) {
            specs.push({ 
                icon: 'layer_56.png', 
                value: `${product.externalData.processingmodule_count} Processing Modules` 
            });
        }
    }

    // Add more default specs for display
    specs.push({ icon: 'layer_56.png', value: product.processingModules || 'Location' });
    specs.push({ icon: 'layer_56.png', value: product.needProcessing ? 'Processing Required' : 'Ready to deploy' });
    
    // Generate HTML for each spec
    let html = '';
    specs.forEach(spec => {
        html += `
        <li class="tariff-info__item">
          <div class="tariff-info__icon">
            <img src="images/${spec.icon}" alt="" width="38" height="42">
          </div>
          <div class="tariff-info__text">
            <div class="tariff-info__title">
              <b>${spec.value}</b>
            </div>
          </div>
        </li>
        `;
    });
    
    return html;
}

// Function to initialize product display
async function initProductDisplay(containerId = 'swiper-wrapper-06e4bb2e7410bda10') {
    const products = await fetchProducts();
    renderProductCards(products, containerId);
}

// Function to get a single product by ID
async function getProductById(productId) {
    try {
        const products = await fetchProducts();
        return products.data.find(p => p.id == productId || p.productId == productId);
    } catch (error) {
        console.error('Error getting product by ID:', error);
        return null;
    }
}

// Function to render a single product on the product detail page
async function renderProductDetail(productId) {
    const product = await getProductById(productId);
    if (!product) {
        console.error('Product not found');
        return;
    }

    // Update product title
    const titleElements = document.querySelectorAll('.product-title');
    titleElements.forEach(el => {
        el.textContent = product.title;
    });

    // Update product price
    const priceElements = document.querySelectorAll('.product-price');
    priceElements.forEach(el => {
        el.textContent = `$${product.price}`;
    });

    // Update product description
    const descElements = document.querySelectorAll('.product-description');
    descElements.forEach(el => {
        el.textContent = product.description || 'No description available';
    });

    // Add more elements to update as needed for your product page
}

// Helper function to get URL parameters
function getUrlParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the product detail page
    const productId = getUrlParam('id');
    if (productId) {
        renderProductDetail(productId);
    } else {
        // If not on product detail, initialize the product list
        initProductDisplay();
    }
});