const express = require("express");
const ejs = require("ejs");
const contentful = require("contentful");

const { response } = require("express");
const { url } = require("inspector");
const app = express();
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

const port = process.env.PORT || 2000;
//rendering homepage
app.listen(port, () => {
  console.log("app listening on " + port);
});

const client = contentful.createClient({
  space: "74qhpdisy2mq",
  environment: "master", // defaults to 'master' if not set
  accessToken: "dwhouqiLZE7TM9bjII1u52irpIOZolnWiBk59dN8kmQ",
});

const allEntryIdsArray = [];
let featuredProducts = [];
let offers = [];
let recentProducts = [];

client
  .getEntries()
  .then((response) =>
    response.items.forEach((item) => {
      allEntryIdsArray.push(item.sys.id);
      getRequestforEachRoute();
    })
  )
  .catch((err) => console.log(err));

//update offers part
const updateOffers = async () => {
  await client.getEntries({ content_type: "offers2" }).then((response) => {
    const firstTwoItems = response.items.slice(0, 2);
    const offersItems = firstTwoItems.map((item) => {
      const { offerValue, backgroundImage } = item.fields;
      const { url } = backgroundImage.fields.file;
      const imageUrl = `https:${url}`;
      return { offerValue, imageUrl };
    });

    offers.push(offersItems);
  });
};
// updateOffers();

//fetching featured products & recent Products
const fetchProducts = async () => {
  await client
    .getEntries({ content_type: "products" })
    .then((response) => {
      const products = response.items;

      //filtering products tagged featured in contentful
      const filterFeatured = products.filter(
        (prod) => prod.fields.featured == true
      );
      featuredProducts.push(filterFeatured);

      //filtering products tagged not featured
      const filterRecent = products.filter(
        (prod) => prod.fields.featured == false
      );
      recentProducts.push(filterRecent);
    })
    .catch((err) => {
      console.log(err);
    });
};
// fetchProducts();

// fetchProducts();
//rendering variables to index.ejs
const sendRequestToHomepage = () => {
  fetchProducts();
  updateOffers();
  app.get("/", (req, res) => {
    res.render("index", { offers, featuredProducts, recentProducts });
  });
};
sendRequestToHomepage();

// app.get("/product", (req, res) => {
//   res.render("product");
// });
// creating a route for each product based on it's contentful entry id
function getRequestforEachRoute() {
  let routes = [...allEntryIdsArray];
  routes.forEach((route) => {
    // console.log(route);
    app.get(`/products/${route}`, (req, res) => {
      res.render("product");
    });
  });
}
getRequestforEachRoute();
