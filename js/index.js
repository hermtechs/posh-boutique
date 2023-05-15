const orderButton = document.querySelectorAll(".order-product");
document.addEventListener("DOMContentLoaded", documentReady);
function documentReady() {
  orderButton.forEach((button) => {
    button.href = `https://wa.me/97470923424?text=https://I'm%20interested%20in%20your%20car%20for%20sale`;
  });
}
