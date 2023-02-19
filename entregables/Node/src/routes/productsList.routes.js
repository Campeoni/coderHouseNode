import { Router } from "express";
import  ProductsManager from "../controllers/ProductsManager.js";

const routerProductsList = Router()
const P_M = new ProductsManager('src/models/products.txt')


routerProductsList.get('/', async (req, res) => {
  let productos = await P_M.getProducts();
  res.render("home", { //Renderizar el siguiente contenido
    titulo: "Ecommerce Backend",
    productos: productos.map(product => {
      product.thumbnail = `img/${product.thumbnail}`
      return product
    })
  })
});

export default routerProductsList