const orderButton = document.querySelectorAll(".order-product");
document.addEventListener("DOMContentLoaded", documentReady);
function documentReady() {
  orderButton.forEach((button) => {
    // button.href = `https://wa.me/97470923424?text=I'm%20interested%20in%20your%20car%20%sale20%https://poshboutiqueug.netlify.app/product/`;
    // const productId = button.parentElement.parentElement.parentElement.id;
    const productId = button.parentElement.parentElement.parentElement.id;
    button.href = `https://wa.me/97470923424?text=Hello,%20I%20would%20like%20to%20buy%20this%20product%20from%20your%20website%20https://poshboutiqueug.onrender.com/products/${productId}`;
  });
}

//navingation
const navbars = document.querySelector(".nav-bars");
const smallLinksContainer = document.querySelector(".side-menu-links");
const sideMenulinks = document.querySelectorAll(".side-links a");

navbars.addEventListener("click", () => {
  if (navbars.classList.contains("rotate")) {
    navbars.classList.remove("rotate");
    smallLinksContainer.classList.add("show-mobile-menu");
  } else {
    navbars.classList.add("rotate");
    smallLinksContainer.classList.remove("show-mobile-menu");
  }
});

sideMenulinks.forEach((link) =>
  link.addEventListener("click", () => {
    navbars.classList.remove("rotate");
    smallLinksContainer.classList.add("show-mobile-menu");
  })
);
