const express = require("express");
const app = express();
const routerProducts = require("../routes/api");
PORT = 8080;

//codificacion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router conf
app.use("/api", routerProducts);

//configuracion de las plantillas ejs
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("pages/index");
});

//server conf
const connectedServer = app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto ${connectedServer.address().port}`
  );
});

connectedServer.on("error", (err) => {
  console.log(`Ha ocurrido un error en el servidor: ${err.message}`);
});
