const seleccionBD = process.env.DBSELECTION

export const getManagerMessages = async() => {
  //importo mongodb o importar postgres depende la base de datos
  const modeloMensaje = seleccionBD == 1 
    ? await import('./MongoDB/models/Message.js').then(module => module.default)  
    : await import('./Postgresql/models/Message.js').then(module => module.default)     
  return modeloMensaje;
}

export const getManagerProducts = async() => {
  //importo mongodb o importar postgres depende la base de datos
  const modeloProducto = seleccionBD == 1 
    ? await import('./MongoDB/models/Product.js').then(module => module.default)  
    : await import('./Postgresql/models/Product.js').then(module => module.default) 
  return modeloProducto;
}

export const getManagerCarts = async() => {
  //importo mongodb o importar postgres depende la base de datos
  const modeloProducto = seleccionBD == 1 
    ? await import('./MongoDB/models/Carts.js').then(module => module.default)  
    : await import('./Postgresql/models/Carts.js').then(module => module.default) 
  return modeloProducto;
}