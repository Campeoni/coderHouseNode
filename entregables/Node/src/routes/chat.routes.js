import { Router } from "express";

const routerChat = Router()

routerChat.get('/', async (req, res) => {  
  res.render("chat", { //Renderizar el siguiente contenido
    titulo: "Chat ecommerce"    
  })
});

export default routerChat