const orderButton = document.querySelectorAll(".order-product");
document.addEventListener("DOMContentLoaded", documentReady);
function documentReady() {
  orderButton.forEach((button) => {
    // button.href = `https://wa.me/97470923424?text=I'm%20interested%20in%20your%20car%20%sale20%https://poshboutiqueug.netlify.app/product/`;
    button.href =
      "https://wa.me/97470923424?text=hello%20I%20got%20this%20hello%20https://hello.netlify.app/#hello";
  });
}
