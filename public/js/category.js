const client = contentful.createClient({
  space: "74qhpdisy2mq",
  environment: "master", // defaults to 'master' if not set
  accessToken: "dwhouqiLZE7TM9bjII1u52irpIOZolnWiBk59dN8kmQ",
});
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

const categoryTitle = document.querySelector(".category-title");
const categoryItemsContainer = document.querySelector(
  ".category-items-container"
);
//getting product id from path
const urlPath = window.location.pathname.split("/")[2];

const clickedCategory = urlPath;

itemsInCategory = [];
document.addEventListener("DOMContentLoaded", () => {
  getCategoryName();
});

const getCategoryName = async () => {
  const categoryName = await client.getEntry(clickedCategory).then((res) => {
    return res.fields.categoryName;
  });
  const allProducts = await client
    .getEntries({ content_type: "products" })
    .then((res) => {
      return res.items;
    })
    .catch((err) => {
      console.log(err);
    });

  categoryTitle.innerText = categoryName;
  //   console.log(categoryName, allProducts);
  getCorrespondingProducts(allProducts, categoryName);
};
// get Products With Same Product Category name as clicked category link
const getCorrespondingProducts = (allProducts, categoryName) => {
  //   console.log(allProducts);
  const correspondingProducts = allProducts.filter((prod) => {
    return prod.fields.productCategory[0] == categoryName;
  });

  updateDOM(correspondingProducts);
};

//updating dom with products in clicked category
function updateDOM(correspondingProducts) {
  const categoryProductsHTML = correspondingProducts.map((item) => {
    // console.log(item);
    const { productPhoto, productCurrentPrice, productOldPrice, productName } =
      item.fields;
    const { url } = productPhoto.fields.file;
    const imageUrl = `https:${url}`;
    const productId = item.sys.id;

    return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1" id="=${productId}">
  <div class="product-item bg-light mb-4">
      <div class="product-img position-relative overflow-hidden">
          <img class="img-fluid w-100" src="${imageUrl}" alt="${productName}">
      </div>
      <div class="text-center py-4">
          <h6 class="h6 text-decoration-none text-truncate product-name">${productName}</h6>
          <div class="d-flex align-items-center justify-content-center mt-2">
              <h5>shs.${productCurrentPrice}</h5><h6 class="text-muted ml-2"><del>${productOldPrice}</del></h6>
          </div>
      <a href="https://wa.me/97470923424?text=Hello,%20I%20would%20like%20to%20buy%20this%20product%20from%20your%20website%20https://poshboutiqueug.onrender.com/products/${productId}" class="order-product">Order <i class="fa fa-whatsapp" aria-hidden="true"></i> </a>
      </div>
  </div>
</div>`;
  });
  categoryItemsContainer.innerHTML = categoryProductsHTML;
}
