// Show listing page JavaScript

// Initialize map token and listing data (will be set from the template)
let mapToken;
let listing;

// Initialize the page
function initShowPage(token, listingData) {
    mapToken = token;
    listing = listingData;
    
    console.log('Map Token:', mapToken);
    console.log('Listing:', listing);
    console.log('Maplibre available:', typeof maplibregl !== 'undefined');
    
    // Initialize GST toggle functionality
    initGSTToggle();
}

// GST Toggle functionality
function initGSTToggle() {
    const gstToggle = document.getElementById('gstToggle');
    const priceElement = document.getElementById('listing-price');
    const taxInfoElement = document.querySelector('.tax-info');
    
    if (!gstToggle || !priceElement || !listing) {
        return;
    }
    
    const basePrice = listing.price;
    
    gstToggle.addEventListener('change', function() {
        if (this.checked) {
            // Calculate and display price with 18% GST
            const totalPrice = basePrice * 1.18;
            priceElement.textContent = '$' + totalPrice.toLocaleString('en-US', {maximumFractionDigits: 0});
            // Show the GST info text
            if (taxInfoElement) {
                taxInfoElement.style.display = 'inline';
            }
        } else {
            // Display original price
            priceElement.textContent = '$' + basePrice.toLocaleString('en-US');
            // Hide the GST info text
            if (taxInfoElement) {
                taxInfoElement.style.display = 'none';
            }
        }
    });
}
