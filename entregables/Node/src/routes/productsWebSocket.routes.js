import { Router } from "express";
import  ProductsManager from "../controllers/ProductsManager.js";

const routerProductsWebSecket = Router()
const P_M = new ProductsManager('src/models/products.txt')


routerProductsWebSecket.get('/', async (req, res) => {
  let productos = await P_M.getProducts();
  res.render("realtimeproducts", { //Renderizar el siguiente contenido
    titulo: "Ecommerce Backend Web Socket",
    productos: productos.map(product => {
      product.thumbnail = `img/${product.thumbnail}`
      return product
    })
  })
});

export default routerProductsWebSecket