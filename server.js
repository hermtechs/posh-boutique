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

client
  .getEntries()
  .then((response) =>
    response.items.forEach((item) => {
      allEntryIdsArray.push(item.sys.id);
      getRequestforEachRoute();
    })
  )
  .catch((err) => console.log(err));

// creating a route for each product based on it's contentful entry id
function getRequestforEachRoute() {
  let routes = [...allEntryIdsArray];
  routes.forEach((route) => {
    // console.log(route);
    app.get(`/${route}`, (req, res) => {
      res.send(`<h1>The entry id is ${route}`);
    });
  });
}

//update offers part
const updateOffers = async () => {
  await client.getEntries({ content_type: "offers2" }).then((response) => {
    const firstTwoItems = response.items.slice(0, 2);
    const offers = firstTwoItems.map((item) => {
      const { offerValue, backgroundImage } = item.fields;
      const { url } = backgroundImage.fields.file;
      const imageUrl = `https:${url}`;
      return { offerValue, imageUrl };
    });
    app.get("/", (req, res) => {
      res.render("index", { offers });
    });
  });
};
updateOffers();
