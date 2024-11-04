// Selectors
const searchForm = document.querySelector(".search-form");
const shoppingCart = document.querySelector(".shopping-cart");
const loginForm = document.querySelector(".login-form");
const navbar = document.querySelector(".navbar");
const cartCountDisplay = document.querySelector("#cart-count"); // Display element for cart count

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to update cart count display
const updateCartCount = () => {
  cartCountDisplay.textContent = cartItems.length;
};

// Function to add item to cart
const addToCart = (item) => {
  cartItems.push(item);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartCount();
};

// Event listener for add to cart buttons
document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productCard = event.target.closest(".box"); // Find the closest product card
    const itemName = productCard.querySelector("h3").textContent; // Get the product name
    const itemPrice = productCard.querySelector("span").textContent; // Get the product price

    addToCart({ name: itemName, price: itemPrice });
    alert(`${itemName} has been added to the cart!`); // Optional: alert the user
  });
});

// Toggle functions for search, cart, and login forms
const toggleActiveClass = (element) => {
  element.classList.toggle("active");
};

const closeAllForms = () => {
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};

// Event listeners for buttons
document.querySelector("#search-btn").addEventListener("click", () => {
  toggleActiveClass(searchForm);
  closeAllFormsExcept(searchForm);
});

document.querySelector("#cart-btn").addEventListener("click", () => {
  toggleActiveClass(shoppingCart);
  closeAllFormsExcept(shoppingCart);
});

document.querySelector("#login-btn").addEventListener("click", () => {
  toggleActiveClass(loginForm);
  closeAllFormsExcept(loginForm);
});

document.querySelector("#menu-btn").addEventListener("click", () => {
  toggleActiveClass(navbar);
  closeAllFormsExcept(navbar);
});

// Close all forms when clicking outside
document.addEventListener("click", (event) => {
  const isInsideForm = searchForm.contains(event.target) ||
                      shoppingCart.contains(event.target) ||
                      loginForm.contains(event.target) ||
                      navbar.contains(event.target);

  if (!isInsideForm) {
    closeAllForms();
  }
});

// Function to close all forms except the one passed as a parameter
const closeAllFormsExcept = (activeForm) => {
  if (activeForm !== searchForm) searchForm.classList.remove("active");
  if (activeForm !== shoppingCart) shoppingCart.classList.remove("active");
  if (activeForm !== loginForm) loginForm.classList.remove("active");
  if (activeForm !== navbar) navbar.classList.remove("active");
};

// Close forms on scroll
window.onscroll = closeAllForms;

// Swiper configuration for product slider
const initSwiper = (selector) => {
  return new Swiper(selector, {
    loop: true,
    spaceBetween: 10,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
};

// Initialize Swipers
initSwiper(".product-slider");
initSwiper(".review-slider");

// Update cart count on page load
updateCartCount();
