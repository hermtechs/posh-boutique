const express = require("express");
const ejs = require("ejs");
const { response } = require("express");
const app = express();
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

const port = process.env.PORT || 2000;
//rendering homepage
app.listen(port, () => {
  console.log("app listening on " + port);
});
app.get("/", (req, res) => {
  res.render("index.ejs");
});
