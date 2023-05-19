const client = contentful.createClient({
  space: "74qhpdisy2mq",
  environment: "master", // defaults to 'master' if not set
  accessToken: "dwhouqiLZE7TM9bjII1u52irpIOZolnWiBk59dN8kmQ",
});

const productPhotoElement = document.querySelector(".product-photo");
const productPriceElement = document.querySelector(".price-value");
const orderBtnElement = document.querySelector(".product-photo");
const productNameElement = document.querySelector(".product-name");

//getting product id from path
const urlPath = window.location.pathname.split("/")[2];

const selectedProductId = urlPath;
document.addEventListener("DOMContentLoaded", () => {
  getProducts();
});
const getProducts = async () => {
  await client.getEntries().then((res) => {
    const allProducts = res.items;
    const selectedProduct = allProducts.find((prod) => {
      return prod.sys.id === selectedProductId;
    });
    // console.log(selectedProduct.fields.productName);
    const { productName, productCurrentPrice, productPhoto } =
      selectedProduct.fields;
    const { url } = productPhoto.fields.file;
    const imageUrl = `https:${url}`;
    updateProductDOM(
      productName,
      imageUrl,
      productCurrentPrice,
      selectedProductId
    );
  });
};

const updateProductDOM = (
  productName,
  imageUrl,
  productCurrentPrice,
  selectedProductId
) => {
  productPhotoElement.src = imageUrl;
  productPriceElement.innerText = productCurrentPrice;
  productNameElement.innerText = productName;
  orderBtnElement.href = `https://${selectedProductId}`;
};
