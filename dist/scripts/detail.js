const price = document.querySelector(".house-price span");
const priceValue = parseInt(price.textContent, 10);
const priceFormatted = priceValue.toLocaleString("nl-NL");
const formattedPrice = formatPrice(priceValue);

function formatPrice(priceValue) {
    return new Intl.NumberFormat("nl-NL").format(priceValue);
}

price.textContent = formattedPrice;
