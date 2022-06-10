const express = require("express");
const Container = require("../ddbb/claseContainer");
const contenedor = new Container({ fileName: "products" });

const routerProducts = express.Router();

routerProducts.get("/", (req, res) => {
  res.render("pages/formulario");
});

routerProducts.get("/productos", (req, res) => {
  contenedor.getAll().then((products) => {
    res.render("pages/productList", { products });
  });
});

routerProducts.post("/productos", (req, res) => {
  const newProduct = req.body;
  contenedor.save(newProduct).then(() => {
    res.redirect("/api");
  });
});

module.exports = routerProducts;
