const fs = require("fs");

class Container {
  constructor({ fileName }) {
    this.fileName = fileName;
  }

  async save(product) {
    try {
      // utilizo metodo access de fs para validar la existencia del archivo de manera asincronica
      fs.access(`./ddbb/${this.fileName}.json`, fs.F_OK, (err) => {
        if (err) {
          // console.error(err.message);
          // no se puede usar las formas asincronicas de creacion de archivos dentro de access
          fs.writeFileSync(
            `./ddbb/${this.fileName}.json`,
            JSON.stringify([{ ...product, id: 1 }], null, 2)
          );
          console.log(
            `Archivo no encontrado, se procede a la creacion del archivo: " ${this.fileName}.json" con producto nuevo id:1\n`
          );
        }
        //file exist
      });
      //* en el caso de que el archivo exista se ejecuta lo siguiente

      let products = JSON.parse(
        await fs.promises.readFile(`./ddbb/${this.fileName}.json`, "utf-8")
      );
      // le adiciono la propiedad id y su valor  teniendo en cuenta la longitud del array de la variable contenedora de todos los productos
      product.id = products.length + 1;
      // utilizo spread operator para agregar productos a la constante products
      products = [...products, product];
      // console.log(products);
      // realizo la escritura del archivo del archivo con el producto nuevo
      await fs.promises.writeFile(
        `./ddbb/${this.fileName}.json`,
        JSON.stringify(products, null, 2)
      );
      return `Producto Guardado con Exito, id asignado: ${product.id}`;
    } catch (err) {
      console.log(err.message);
    }
  }

  async getById(id) {
    try {
      const read = JSON.parse(
        await fs.promises.readFile(`./ddbb/${this.fileName}.json`, "utf-8")
      );
      //genero un localizador de id para saber si el mismo buscado existe o no, en base a eso responder
      const locateId = read.some((element) => element.id == id);
      if (!locateId) {
        // return `El id ingresado no es valido, pruebe con algun numero superior a 0 y menor o igual a ${read.length}`;
        return { error: "producto no encontrado" };
      } else {
        const elemento = read.filter((element) => element.id == id);
        // console.log(elemento); prueba de funcionalidad
        return elemento;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(id) {
    try {
      const read = JSON.parse(
        await fs.promises.readFile(`./ddbb/${this.fileName}.JSON`, "utf-8")
      );
      const locateID = read.some((element) => element.id == id);
      if (!locateID) {
        return { error: "El elemento que desea borrar no existe" };
      } else {
        read.map((product, index) => {
          if (product.id == id) {
            read.splice(index, 1);
          }
        });
        //recorro todo el array actualizando los valores de los id
        read.map((element, index) => (element.id = index + 1));
        await fs.promises.writeFile(
          `./ddbb/${this.fileName}.JSON`,
          JSON.stringify(read, null, 2)
        );
        return { mensaje: "Se actualizo correctamente la lista de productos" };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(`${__dirname}/${this.fileName}.JSON`, "[]");
      console.log("El contenido ha sido borrado con Exito");
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAll() {
    try {
      const read = JSON.parse(
        await fs.promises.readFile(
          `${__dirname}/${this.fileName}.JSON`,
          "utf-8"
        )
      );
      // console.log(read);   // verificacion de funcionamiento
      return read;
    } catch (error) {
      throw new Error(error);
    }
  }

  async modifyById(id, productModify) {
    const read = JSON.parse(
      await fs.promises.readFile(`./ddbb/${this.fileName}.json`, "utf-8")
    );
    const productFind = read.some((producto) => producto.id == id);
    if (productFind) {
      read.map((prod) => {
        if (prod.id == id) {
          prod.title = productModify.title ? productModify.title : prod.title;
          prod.price = productModify.price ? productModify.price : prod.price;
          prod.thumbnail = productModify.thumbnail
            ? productModify.thumbnail
            : prod.thumbnail;
        }
      });
      await fs.promises.writeFile(
        `./ddbb/${this.fileName}.json`,
        JSON.stringify(read, null, 2)
      );
      return read[id - 1];
    } else {
      return { error: "Producto no encontrado" };
    }
  }
}

module.exports = Container;
