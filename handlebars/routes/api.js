const express = require("express");
const app = express();

// ddbb
const Container = require("../ddbb/clase-Container");
const contenedor = new Container({ fileName: "products" });

// API routes
const routerProducts = express.Router();

routerProducts.get("/", (req, res) => {
  async function obtener() {
    let products = await contenedor.getAll();
    res.render("products", { products });
  }
  obtener();
});

routerProducts.get("/:id", (req, res) => {
  const { id } = req.params;
  contenedor.getById(id).then((result) => res.send(result));
});

routerProducts.post("/", (req, res) => {
  const newProd = req.body;
  contenedor.save(newProd).then(() => res.redirect("/api/productos"));
});

routerProducts.put("/:id", (req, res) => {
  const { id } = req.params;
  const productModify = req.body;
  contenedor.modifyById(id, productModify).then((result) => res.send(result));
});

routerProducts.delete("/:id", (req, res) => {
  const { id } = req.params;
  contenedor.deleteById(id).then((result) => res.send(result));
});

module.exports = routerProducts;
