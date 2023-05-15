const orderButton = document.querySelectorAll(".order-product");
document.addEventListener("DOMContentLoaded", documentReady);
function documentReady() {
  orderButton.forEach((button) => {
    // button.href = `https://wa.me/97470923424?text=I'm%20interested%20in%20your%20car%20%sale20%https://poshboutiqueug.netlify.app/product/`;
    button.href =
      "https://wa.me/97470923424?text=Hello,%20I%20would%20like%20to%20buy%20this%20product%20from%20your%20website%20https://poshboutiqueug.com/190203537";
  });
}
