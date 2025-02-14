// Automatic Typing
// document.addEventListener('DOMContentLoaded', function () {
//   var typingEffect = new Typed('.multitext', {
//     strings: ['Hustlestar'],
//     typeSpeed: 50,
//     backSpeed: 50,
//     loop: true,
//   });
// });

// Cart
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const removeCart = document.querySelector('#close-cart');

// Open Cart
cartIcon.onclick = () => {
  cart.classList.add('cart-active');
};
// Close Cart
removeCart.onclick = () => {
  cart.classList.remove('cart-active');
};

// Cart working JS
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
// Making Function
function ready() {
  // Remove Items From Cart
  const removeCartButton = document.getElementsByClassName('cart-remove');
  for (let i = 0; i < removeCartButton.length; i++) {
    const button = removeCartButton[i];
    button.addEventListener('click', removeCartItem);
  }
  // Quantity Changes
  const quantityInputs = document.getElementsByClassName('cart-quantity');
  for (let i = 0; i < quantityInputs.length; i++) {
    const inputs = quantityInputs[i];
    inputs.addEventListener('change', quantityChanged);
  }

  const addCart = document.getElementsByClassName('add-cart');
  for (let i = 0; i < addCart.length; i++) {
    const button = addCart[i];
    button.addEventListener('click', addCartCLicked);
  }
}

// Remove Item From Cart
function removeCartItem(event) {
  const button = event.target;
  button.parentElement.remove();
  updateTotal();
}

// Quantity Changes
function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

window.addEventListener('DOMContentLoaded', (event) => {
  const cartItems = document.getElementsByClassName('cart-content')[0];
  cartItems.innerHTML = '';

  // Preloader
  const preload = document.querySelector('.preloader');
  setTimeout(function () {
    preload.classList.add('hide-preloader');
  }, 3000);
});

// Add Cart
function addCartCLicked(event) {
  const button = event.target;
  const shopProducts = button.parentElement;

  // Get the unique product ID from the data-id of the button
  const productId = button.getAttribute('data-id');

  const title =
    shopProducts.getElementsByClassName('product-title')[0].innerText;
  const price = shopProducts.getElementsByClassName('price')[0].innerText;
  const productImg = shopProducts.getElementsByClassName('product-img')[0].src;

  addProductToCart(title, price, productImg, productId); // Pass the data-id as an argument
  updateTotal();
}

function addProductToCart(title, price, productImg, productId) {
  const cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  const cartItems = document.getElementsByClassName('cart-content')[0];
  const cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  // Check if the product already exists in the cart by comparing the data-id
  const cartItemsIds = cartItems.getElementsByClassName('cart-product-title');
  for (let i = 0; i < cartItemsIds.length; i++) {
    const existingProductId = cartItemsIds[i].getAttribute('data-id');
    if (existingProductId === productId) {
      alert('You have already added this item to the cart');
      return; // Prevent adding the item if it's already in the cart
    }
  }

  // Create the cart box with the product details

  const cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title" data-id="${productId}">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove -->
                       <i class='bx bxs-trash-alt cart-remove'></i>
                       `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  // Add event listeners for removing the item and changing the quantity
  cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem);
  cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);
}

// Update Total
function updateTotal() {
  const cartContents = document.getElementsByClassName('cart-content')[0];
  const cartBoxes = cartContents.getElementsByClassName('cart-box');
  let total = 0;

  // Loop through each cart item to calculate the total price
  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const priceElement = cartBox.getElementsByClassName('cart-price')[0];
    const quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    const price = parseFloat(priceElement.innerText.replace('GMD', ''));
    const quantity = quantityElement.value;
    total += price * quantity;

    // Round the total to 2 decimal places
    total = Math.round(total * 100) / 100;

    // Update the displayed total price
    document.getElementsByClassName('total-price')[0].innerText = 'GMD' + total;
  }
}

// Update Total
function updateTotal() {
  const cartContents = document.getElementsByClassName('cart-content')[0];
  const cartBoxes = cartContents.getElementsByClassName('cart-box');
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const priceElement = cartBox.getElementsByClassName('cart-price')[0];
    const quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    const price = parseFloat(priceElement.innerText.replace('GMD', ''));
    const quantity = quantityElement.value;
    total = total + price * quantity;

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = 'GMD' + total;
  }
}

// Whatsapp starts
// WhatsApp functionality for "Buy Now" button
const whatsappBtn = document.querySelectorAll('.whatsapp-btn');

for (let i = 0; i < whatsappBtn.length; i++) {
  const whatsappbtns = whatsappBtn[i];
  whatsappbtns.addEventListener('click', sendToWhatsApp);
}

// Function to generate the message and send to WhatsApp
function sendToWhatsApp() {
  const cartContents = document.getElementsByClassName('cart-content')[0];
  const cartItems = cartContents.getElementsByClassName('cart-box');
  let message = 'Hello Hustlestar I want to buy these items:\n\n';

  // Loop through the cart items to build the message
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const title =
      item.getElementsByClassName('cart-product-title')[0].innerText;
    const price = item.getElementsByClassName('cart-price')[0].innerText;
    const quantity = item.getElementsByClassName('cart-quantity')[0].value;
    const img = item.getElementsByClassName('cart-img')[0].src;

    // Add product info to message
    message += `Product: ${title}\nPrice: ${price}\nQuantity: ${quantity}\nImage: ${img}\n\n`;
  }

  // Add total price to the message
  const total = document.getElementsByClassName('total-price')[0].innerText;
  message += `Total: ${total}`;

  // WhatsApp message link with your phone number
  const whatsappNumber = '2207709979';

  // Detect if the user is on a mobile device
  const isMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);

  // Choose the correct WhatsApp link
  const whatsappLink = isMobile
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` // Open in WhatsApp app
    : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
        message
      )}`; // Open in WhatsApp Web

  // const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // Open WhatsApp with the generated message
  window.open(whatsappLink, '_blank');
}

// Whatsapp ends

// Modal Displaying
const modal = document.getElementById('myModal');
const modalImg = document.getElementById('img01');
const captionText = document.getElementById('caption');

const newImages = document.querySelectorAll('.modal-triger'); // all images with class modal-triger

newImages.forEach(function (img) {
  img.onclick = function () {
    modal.style.display = 'block';
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  };
});
// Modal Closing
const closeModal = document.getElementsByClassName('close')[0];

closeModal.onclick = function () {
  modal.style.display = 'none';
};

// Testimonial Section
// testimonials slides
let index = 0;

const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

// show nextTestimonials
function showNextTestimonials() {
  const currentTestimonial = testimonials[index];
  currentTestimonial.classList.add('scroll-out-left');

  // add an event to the currentTestimonial
  currentTestimonial.addEventListener(
    'animationend',
    () => {
      currentTestimonial.classList.remove('actives', 'scroll-out-left');
    },
    { once: true }
  );

  index = (index + 1) % totalTestimonials;
  // nexttestimonial
  const nextTestimonial = testimonials[index];
  nextTestimonial.classList.add('actives');
}
setInterval(showNextTestimonials, 10000);

// Hero img
// const heroImg = [
//   '/assets/images/hero0.png',
//   '/assets/images/hero2.png',
//   '/assets/images/hero3.png',
// ];

// let heroCurrentImg = 0;
// const hero = document.getElementsByClassName("hero");
// console.log(hero);

// function changeHeroImg() {
  
//   hero.style.backgroundImage = `
//   linear-gradient(rgba(44, 44, 44, 0.882),
//         rgba(27, 27, 27, 0.808)),
//       url('${heroImg[heroCurrentImg]}');
//   `
//   heroCurrentImg = (heroCurrentImg + 1) % heroImg.length;
// }

// setInterval(changeHeroImg, 2000);

// changeHeroImg();