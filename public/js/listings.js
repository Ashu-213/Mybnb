// Tax toggle functionality for listings
let switchToggle = document.getElementById('flexSwitchCheckDefault');
let originalPrices = []; // Store original prices

// Initialize and store original prices on page load
let prices = document.querySelectorAll('.card-text strong');
prices.forEach(priceElement => {
    let priceText = priceElement.textContent;
    let priceMatch = priceText.match(/\$([\d,]+)/);
    if (priceMatch) {
        originalPrices.push(parseFloat(priceMatch[1].replace(/,/g, '')));
    }
});

switchToggle.addEventListener('click', function () {
    let taxInfo = document.getElementsByClassName('tax-info');
    let prices = document.querySelectorAll('.card-text strong');
    
    for (let i = 0; i < prices.length; i++) {
        if (originalPrices[i]) {
            if (switchToggle.checked) {
                // Calculate price with 18% GST
                let totalPrice = originalPrices[i] * 1.18;
                prices[i].textContent = '$' + totalPrice.toLocaleString('en-US', {maximumFractionDigits: 0});
                // Show the GST info text
                if (taxInfo[i]) {
                    taxInfo[i].style.display = 'inline';
                }
            } else {
                // Show original price
                prices[i].textContent = '$' + originalPrices[i].toLocaleString('en-US');
                // Hide the GST info text
                if (taxInfo[i]) {
                    taxInfo[i].style.display = 'none';
                }
            }
        }
    }
});
